import { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Modal,
    Pressable,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/itemDetail.styles";
import COLORS from "../../constants/colors";
import { itemsService } from "../../services/items.service";
import { getItemImageUris } from "../../utils/itemImages";
import {
    setCurrentItem,
    setLoading,
    setError,
    removeItem,
    updateItemAvailability,
} from "../../store/slices/itemsSlice";
import { USER_MESSAGES } from "../../constants/userMessages";

export default function ItemDetailScreen({ route, navigation }) {
    const { itemId, justCreated } = route.params || {};
    const { width: screenWidth } = Dimensions.get("window");
    const dispatch = useDispatch();
    const { currentItem, loading, error } = useSelector((state) => state.items);
    const { user } = useSelector((state) => state.auth);

    const [updatingAvailability, setUpdatingAvailability] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [showCreatedBanner, setShowCreatedBanner] = useState(!!justCreated);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const [toast, setToast] = useState({ visible: false, type: "success", message: "" });
    const imageScrollRef = useRef(null);
    const fullscreenScrollRef = useRef(null);
    const toastTimerRef = useRef(null);
    const goBackAfterDeleteRef = useRef(null);

    useEffect(() => {
        return () => {
            if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
            if (goBackAfterDeleteRef.current) clearTimeout(goBackAfterDeleteRef.current);
        };
    }, []);

    const showToast = (type, message) => {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToast({ visible: true, type, message });
        toastTimerRef.current = setTimeout(() => {
            setToast((t) => ({ ...t, visible: false }));
            toastTimerRef.current = null;
        }, 3200);
    };

    const isOwner =
        user &&
        currentItem &&
        String(user.id) === String(currentItem.ownerId);

    useEffect(() => {
        fetchItem();
    }, [itemId]);

    useEffect(() => {
        setActiveImageIndex(0);
        imageScrollRef.current?.scrollTo({ x: 0, animated: false });
    }, [itemId, currentItem?._id]);

    useEffect(() => {
        setShowCreatedBanner(!!justCreated);
        if (!justCreated) return undefined;
        const t = setTimeout(() => setShowCreatedBanner(false), 4500);
        return () => clearTimeout(t);
    }, [itemId, justCreated]);

    const fetchItem = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await itemsService.getItemById(itemId);
            dispatch(setCurrentItem(response.data));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const openDeleteModal = () => {
        const effectiveId = itemId || currentItem?._id;
        if (!effectiveId) {
            showToast(
                "error",
                "This listing could not be identified. Please go back and try again.",
            );
            return;
        }
        setDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        if (deleteLoading) return;
        setDeleteModalVisible(false);
    };

    const confirmDeleteFromModal = async () => {
        const effectiveId = itemId || currentItem?._id;
        if (!effectiveId) {
            setDeleteModalVisible(false);
            showToast(
                "error",
                "This listing could not be identified. Please go back and try again.",
            );
            return;
        }

        setDeleteLoading(true);
        try {
            await itemsService.deleteItem(String(effectiveId));
            dispatch(removeItem(String(effectiveId)));
            setDeleteModalVisible(false);
            showToast(
                "success",
                `${USER_MESSAGES.item.deleteSuccessTitle}: ${USER_MESSAGES.item.deleteSuccessBody}`,
            );
            if (goBackAfterDeleteRef.current) clearTimeout(goBackAfterDeleteRef.current);
            goBackAfterDeleteRef.current = setTimeout(() => {
                navigation.goBack();
                goBackAfterDeleteRef.current = null;
            }, 1800);
        } catch (err) {
            const msg = err?.message || USER_MESSAGES.item.errorMessageFallback;
            setDeleteModalVisible(false);
            showToast("error", `${USER_MESSAGES.item.deleteFailedTitle}: ${msg}`);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleUpdateAvailability = async (newAvailability) => {
        if (currentItem.availability === newAvailability) return;

        setUpdatingAvailability(true);
        try {
            await itemsService.updateAvailability(itemId, newAvailability);
            dispatch(updateItemAvailability({ itemId, availability: newAvailability }));
        } catch (err) {
            showToast(
                "error",
                `${USER_MESSAGES.item.updateAvailabilityFailedTitle}: ${err.message || USER_MESSAGES.item.errorMessageFallback}`,
            );
        } finally {
            setUpdatingAvailability(false);
        }
    };

    const getAvailabilityStyle = (availability) => {
        switch (availability) {
            case "available":
                return styles.availableBadge;
            case "rented":
                return styles.rentedBadge;
            default:
                return styles.unavailableBadge;
        }
    };

    const getAvailabilityText = (availability) => {
        switch (availability) {
            case "available":
                return "Available";
            case "rented":
                return "Rented";
            default:
                return "Unavailable";
        }
    };

    if (loading && !currentItem) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error && !currentItem) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={60} color={COLORS.textSecondary} />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchItem}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!currentItem) return null;

    const imageUris = getItemImageUris(currentItem);

    const onImageScroll = (e) => {
        const x = e.nativeEvent.contentOffset.x;
        const index = Math.round(x / screenWidth);
        if (index >= 0 && index < imageUris.length) setActiveImageIndex(index);
    };

    const openImageViewer = (index = 0) => {
        setActiveImageIndex(index);
        setImageViewerVisible(true);
        setTimeout(() => {
            fullscreenScrollRef.current?.scrollTo({ x: screenWidth * index, animated: false });
        }, 0);
    };

    return (
        <View style={styles.container}>
            {showCreatedBanner && (
                <View style={styles.creationSuccessBanner}>
                    <Ionicons name="checkmark-circle" size={22} color={COLORS.success} />
                    <Text style={styles.creationSuccessText} numberOfLines={3}>
                        {USER_MESSAGES.item.createBanner}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setShowCreatedBanner(false)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Ionicons name="close" size={22} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                </View>
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image carousel */}
                <View style={styles.imageContainer}>
                    {imageUris.length > 0 ? (
                        <>
                            <ScrollView
                                ref={imageScrollRef}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled
                                decelerationRate="fast"
                                onMomentumScrollEnd={onImageScroll}
                                onScrollEndDrag={onImageScroll}
                                scrollEventThrottle={16}
                                style={styles.imagePager}
                                contentContainerStyle={{ width: screenWidth * imageUris.length }}
                            >
                                {imageUris.map((uri, index) => (
                                    <View key={`${uri}-${index}`} style={[styles.imagePage, { width: screenWidth }]}>
                                        <TouchableOpacity
                                            activeOpacity={0.95}
                                            style={styles.imageTouchArea}
                                            onPress={() => openImageViewer(index)}
                                        >
                                            <Image
                                                source={{ uri }}
                                                style={styles.itemImage}
                                                resizeMode="cover"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                            {imageUris.length > 1 && (
                                <View style={styles.pagerDots} pointerEvents="none">
                                    {imageUris.map((_, i) => (
                                        <View
                                            key={i}
                                            style={[
                                                styles.pagerDot,
                                                i === activeImageIndex && styles.pagerDotActive,
                                            ]}
                                        />
                                    ))}
                                </View>
                            )}
                        </>
                    ) : (
                        <View style={styles.noImageContainer}>
                            <Ionicons name="image-outline" size={80} color={COLORS.textSecondary} />
                        </View>
                    )}
                </View>

                {/* Header Buttons */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerButton}>
                            <Ionicons name="share-outline" size={20} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerButton}>
                            <Ionicons name="heart-outline" size={20} color={COLORS.error} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {isOwner && (() => {
                        const ap = currentItem.approvalStatus || "approved";
                        if (ap === "pending") {
                            return (
                                <View style={[styles.ownerApprovalBanner, styles.ownerApprovalPending]}>
                                    <Ionicons name="time-outline" size={22} color={COLORS.warning} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.ownerApprovalTitle}>Pending admin review</Text>
                                        <Text style={styles.ownerApprovalBody}>
                                            Your listing is saved but not visible to others yet. You will receive an email when it is accepted or rejected.
                                        </Text>
                                    </View>
                                </View>
                            );
                        }
                        if (ap === "rejected") {
                            return (
                                <View style={[styles.ownerApprovalBanner, styles.ownerApprovalRejected]}>
                                    <Ionicons name="close-circle-outline" size={22} color={COLORS.error} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.ownerApprovalTitle}>Not approved</Text>
                                        <Text style={styles.ownerApprovalBody}>
                                            {currentItem.rejectionReason
                                                ? `Reason: ${currentItem.rejectionReason}`
                                                : "An administrator did not approve this listing. Check your email for details."}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }
                        return (
                            <View style={[styles.ownerApprovalBanner, styles.ownerApprovalApproved]}>
                                <Ionicons name="checkmark-circle-outline" size={22} color={COLORS.success} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.ownerApprovalTitle}>Published</Text>
                                    <Text style={styles.ownerApprovalBody}>
                                        This listing is approved and visible to other users.
                                    </Text>
                                </View>
                            </View>
                        );
                    })()}
                    {/* Title & Availability */}
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{currentItem.title}</Text>
                        <View style={[styles.availabilityBadge, getAvailabilityStyle(currentItem.availability)]}>
                            <Text style={styles.badgeText}>
                                {getAvailabilityText(currentItem.availability)}
                            </Text>
                        </View>
                    </View>

                    {/* Location */}
                    <View style={styles.locationRow}>
                        <Ionicons name="location-outline" size={16} color={COLORS.textSecondary} />
                        <Text style={styles.locationText}>
                            {currentItem.location?.city || "Unknown location"}
                        </Text>
                    </View>

                    {/* Stats */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name="eye-outline" size={16} color={COLORS.textSecondary} />
                            <Text style={styles.statText}>{currentItem.views || 0} views</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text style={styles.statText}>
                                {currentItem.rating?.average?.toFixed(1) || "0.0"} ({currentItem.rating?.count || 0})
                            </Text>
                        </View>
                    </View>

                    {/* Owner Actions */}
                    {isOwner && (
                        <>
                            <View style={styles.ownerActions}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.editButton]}
                                    onPress={() => navigation.navigate("EditItem", { item: currentItem })}
                                >
                                    <Ionicons name="create-outline" size={20} color={COLORS.white} />
                                    <Text style={styles.actionButtonText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.deleteButton]}
                                    onPress={openDeleteModal}
                                    disabled={deleteLoading}
                                >
                                    <Ionicons name="trash-outline" size={20} color={COLORS.white} />
                                    <Text style={styles.actionButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Availability Control */}
                            <View
                                style={[
                                    styles.availabilitySection,
                                    (currentItem.approvalStatus || "approved") !== "approved" && { opacity: 0.45 },
                                ]}
                            >
                                <Text style={styles.sectionTitle}>Update Availability</Text>
                                {(currentItem.approvalStatus || "approved") !== "approved" ? (
                                    <Text style={styles.ownerApprovalBody}>
                                        Availability can be changed after an admin approves your listing.
                                    </Text>
                                ) : null}
                                <View style={styles.availabilityButtons}>
                                    {["available", "rented", "unavailable"].map((status) => (
                                        <TouchableOpacity
                                            key={status}
                                            style={[
                                                styles.availabilityButton,
                                                currentItem.availability === status && styles.availabilityButtonActive,
                                                currentItem.availability === status && getAvailabilityStyle(status),
                                            ]}
                                            onPress={() => handleUpdateAvailability(status)}
                                            disabled={
                                                updatingAvailability ||
                                                (currentItem.approvalStatus || "approved") !== "approved"
                                            }
                                        >
                                            <Text
                                                style={[
                                                    styles.availabilityButtonText,
                                                    {
                                                        color: currentItem.availability === status
                                                            ? COLORS.white
                                                            : COLORS.textSecondary,
                                                    },
                                                ]}
                                            >
                                                {getAvailabilityText(status)}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </>
                    )}

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{currentItem.description}</Text>
                    </View>

                    {/* Pricing */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pricing</Text>
                        <View style={styles.priceGrid}>
                            <View style={styles.priceItem}>
                                <Text style={styles.priceLabel}>Per Day</Text>
                                <Text style={styles.priceValue}>{currentItem.pricePerDay} DH</Text>
                            </View>
                            {currentItem.pricePerWeek && (
                                <View style={styles.priceItem}>
                                    <Text style={styles.priceLabel}>Per Week</Text>
                                    <Text style={styles.priceValue}>{currentItem.pricePerWeek} DH</Text>
                                </View>
                            )}
                            {currentItem.pricePerMonth && (
                                <View style={styles.priceItem}>
                                    <Text style={styles.priceLabel}>Per Month</Text>
                                    <Text style={styles.priceValue}>{currentItem.pricePerMonth} DH</Text>
                                </View>
                            )}
                            {currentItem.deposit > 0 && (
                                <View style={styles.priceItem}>
                                    <Text style={styles.priceLabel}>Deposit</Text>
                                    <Text style={styles.priceValue}>{currentItem.deposit} DH</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Details */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Details</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Category</Text>
                            <Text style={styles.infoValue}>{currentItem.category}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Condition</Text>
                            <Text style={styles.infoValue}>{currentItem.condition}</Text>
                        </View>
                        {currentItem.location?.address && (
                            <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                                <Text style={styles.infoLabel}>Address</Text>
                                <Text style={styles.infoValue}>{currentItem.location.address}</Text>
                            </View>
                        )}
                    </View>

                    {/* Spacer for bottom bar */}
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            <Modal
                visible={deleteModalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeDeleteModal}
            >
                <View style={styles.deleteModalOverlay}>
                    <Pressable style={styles.deleteModalBackdrop} onPress={closeDeleteModal} />
                    <View style={styles.deleteModalCard}>
                        <Text style={styles.deleteModalTitle}>{USER_MESSAGES.item.deleteConfirmTitle}</Text>
                        <Text style={styles.deleteModalBody}>{USER_MESSAGES.item.deleteConfirmBody}</Text>
                        <View style={styles.deleteModalRow}>
                            <TouchableOpacity
                                style={[styles.deleteModalBtn, styles.deleteModalBtnNo]}
                                onPress={closeDeleteModal}
                                disabled={deleteLoading}
                            >
                                <Text style={styles.deleteModalBtnNoText}>{USER_MESSAGES.item.deleteConfirmNo}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.deleteModalBtn, styles.deleteModalBtnYes]}
                                onPress={confirmDeleteFromModal}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? (
                                    <ActivityIndicator color={COLORS.white} size="small" />
                                ) : (
                                    <Text style={styles.deleteModalBtnYesText}>
                                        {USER_MESSAGES.item.deleteConfirmYes}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={imageViewerVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setImageViewerVisible(false)}
            >
                <View style={styles.imageViewerOverlay}>
                    <TouchableOpacity
                        style={styles.imageViewerClose}
                        onPress={() => setImageViewerVisible(false)}
                        accessibilityRole="button"
                    >
                        <Ionicons name="close" size={26} color={COLORS.white} />
                    </TouchableOpacity>

                    <ScrollView
                        ref={fullscreenScrollRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={onImageScroll}
                        onScrollEndDrag={onImageScroll}
                        scrollEventThrottle={16}
                        style={styles.imageViewerPager}
                        contentContainerStyle={{ width: screenWidth * imageUris.length }}
                    >
                        {imageUris.map((uri, index) => (
                            <View
                                key={`fullscreen-${uri}-${index}`}
                                style={[styles.imageViewerPage, { width: screenWidth }]}
                            >
                                <Image source={{ uri }} style={styles.imageViewerImage} resizeMode="contain" />
                            </View>
                        ))}
                    </ScrollView>

                    {imageUris.length > 1 && (
                        <View style={styles.imageViewerDots} pointerEvents="none">
                            {imageUris.map((_, i) => (
                                <View
                                    key={`viewer-dot-${i}`}
                                    style={[
                                        styles.pagerDot,
                                        styles.imageViewerDot,
                                        i === activeImageIndex && styles.pagerDotActive,
                                    ]}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </Modal>

            {toast.visible && (
                <View
                    pointerEvents="none"
                    style={[
                        styles.screenToast,
                        toast.type === "error" ? styles.screenToastError : styles.screenToastSuccess,
                        !isOwner && styles.screenToastAboveBottomBar,
                    ]}
                >
                    <Ionicons
                        name={toast.type === "error" ? "close-circle" : "checkmark-circle"}
                        size={22}
                        color={toast.type === "error" ? COLORS.error : COLORS.success}
                    />
                    <Text style={styles.screenToastText} numberOfLines={4}>
                        {toast.message}
                    </Text>
                </View>
            )}

            {/* Bottom bar — non-owners only */}
            {!isOwner && (
                <View style={styles.bottomBar}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.bottomPriceLabel}>Price per day</Text>
                        <Text style={styles.bottomPrice}>{currentItem.pricePerDay} DH</Text>
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.rentButton,
                            currentItem.availability !== "available" && styles.rentButtonDisabled,
                        ]}
                        disabled={currentItem.availability !== "available"}
                        onPress={() => navigation.navigate("Booking", { item: currentItem })}
                    >
                        <Text style={styles.rentButtonText}>
                            {currentItem.availability === "available" ? "Rent Now" : "Not Available"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

