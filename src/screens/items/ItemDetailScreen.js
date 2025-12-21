import { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/itemDetail.styles";
import COLORS from "../../constants/colors";
import { itemsService } from "../../services/items.service";
import {
    setCurrentItem,
    setLoading,
    setError,
    removeItem,
    updateItemAvailability,
} from "../../store/slices/itemsSlice";

export default function ItemDetailScreen({ route, navigation }) {
    const { itemId } = route.params;
    const dispatch = useDispatch();
    const { currentItem, loading, error } = useSelector((state) => state.items);
    const { user } = useSelector((state) => state.auth);

    const [updatingAvailability, setUpdatingAvailability] = useState(false);

    const isOwner = user && currentItem && user.id === currentItem.ownerId;

    useEffect(() => {
        fetchItem();
    }, [itemId]);

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

    const handleDelete = () => {
        Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this item?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await itemsService.deleteItem(itemId);
                            dispatch(removeItem(itemId));
                            navigation.goBack();
                        } catch (err) {
                            Alert.alert("Error", err.message);
                        }
                    },
                },
            ]
        );
    };

    const handleUpdateAvailability = async (newAvailability) => {
        if (currentItem.availability === newAvailability) return;

        setUpdatingAvailability(true);
        try {
            await itemsService.updateAvailability(itemId, newAvailability);
            dispatch(updateItemAvailability({ itemId, availability: newAvailability }));
        } catch (err) {
            Alert.alert("Error", err.message);
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

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image */}
                <View style={styles.imageContainer}>
                    {currentItem.images && currentItem.images.length > 0 ? (
                        <Image
                            source={{ uri: currentItem.images[0].url }}
                            style={styles.itemImage}
                        />
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
                        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                    </TouchableOpacity>

                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerButton}>
                            <Ionicons name="share-outline" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerButton}>
                            <Ionicons name="heart-outline" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
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
                                    onPress={handleDelete}
                                >
                                    <Ionicons name="trash-outline" size={20} color={COLORS.white} />
                                    <Text style={styles.actionButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Availability Control */}
                            <View style={styles.availabilitySection}>
                                <Text style={styles.sectionTitle}>Update Availability</Text>
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
                                            disabled={updatingAvailability}
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

            {/* Bottom Bar - Only for non-owners */}
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

