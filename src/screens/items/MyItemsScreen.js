import { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/myItems.styles";
import COLORS from "../../constants/colors";
import { itemsService } from "../../services/items.service";
import { setMyItems, setLoading, setError } from "../../store/slices/itemsSlice";

const FILTERS = [
    { id: "all", label: "All" },
    { id: "available", label: "Available" },
    { id: "rented", label: "Rented" },
    { id: "unavailable", label: "Unavailable" },
];

export default function MyItemsScreen({ navigation }) {
    const dispatch = useDispatch();
    const { myItems, loading, error } = useSelector((state) => state.items);
    const { user } = useSelector((state) => state.auth);

    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (user?.id) {
            fetchMyItems();
        }
    }, [user?.id]);

    const fetchMyItems = async (isRefresh = false) => {
        if (!user?.id) return;

        if (isRefresh) {
            setRefreshing(true);
        } else {
            dispatch(setLoading(true));
        }
        dispatch(setError(null));

        try {
            const response = await itemsService.getItemsByOwner(user.id);
            dispatch(setMyItems({
                items: response.items || [],
                totalPages: response.totalPages,
                currentPage: response.currentPage,
                totalItems: response.totalItems,
            }));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        fetchMyItems(true);
    };

    const filteredItems = myItems.filter((item) => {
        if (filter === "all") return true;
        return item.availability === filter;
    });

    const getStats = () => {
        const total = myItems.length;
        const available = myItems.filter((i) => i.availability === "available").length;
        const rented = myItems.filter((i) => i.availability === "rented").length;
        return { total, available, rented };
    };

    const stats = getStats();

    const getAvailabilityStyle = (availability) => {
        switch (availability) {
            case "available":
                return { badge: styles.availableBadge, text: styles.availableText };
            case "rented":
                return { badge: styles.rentedBadge, text: styles.rentedText };
            default:
                return { badge: styles.unavailableBadge, text: styles.unavailableText };
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

    const renderItem = ({ item }) => {
        const availStyle = getAvailabilityStyle(item.availability);

        return (
            <TouchableOpacity
                style={styles.itemCard}
                onPress={() => navigation.navigate("ItemDetail", { itemId: item._id })}
                activeOpacity={0.8}
            >
                {item.images && item.images.length > 0 ? (
                    <Image source={{ uri: item.images[0].url }} style={styles.itemImage} />
                ) : (
                    <View style={styles.noImageContainer}>
                        <Ionicons name="image-outline" size={32} color={COLORS.textSecondary} />
                    </View>
                )}

                <View style={styles.itemInfo}>
                    <View>
                        <Text style={styles.itemTitle} numberOfLines={1}>
                            {item.title}
                        </Text>
                        <Text style={styles.itemCategory}>{item.category}</Text>
                    </View>

                    <View>
                        <View style={styles.itemBottom}>
                            <View>
                                <Text style={styles.itemPrice}>
                                    {item.pricePerDay} DH
                                    <Text style={styles.priceUnit}>/day</Text>
                                </Text>
                            </View>
                            <View style={[styles.availabilityBadge, availStyle.badge]}>
                                <Text style={[styles.badgeText, availStyle.text]}>
                                    {getAvailabilityText(item.availability)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Ionicons name="eye-outline" size={14} color={COLORS.textSecondary} />
                                <Text style={styles.statText}>{item.views || 0}</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="star" size={14} color="#FFD700" />
                                <Text style={styles.statText}>
                                    {item.rating?.average?.toFixed(1) || "0.0"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderEmpty = () => {
        if (loading) return null;

        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="cube-outline" size={60} color={COLORS.textSecondary} />
                <Text style={styles.emptyText}>
                    {filter === "all"
                        ? "You haven't added any items yet"
                        : `No ${filter} items`}
                </Text>
                {filter === "all" && (
                    <TouchableOpacity
                        style={styles.emptyButton}
                        onPress={() => navigation.navigate("AddItem")}
                    >
                        <Text style={styles.emptyButtonText}>Add Your First Item</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    if (loading && myItems.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <Text style={styles.headerTitle}>My Items</Text>
                    </View>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            </View>
        );
    }

    if (error && myItems.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <Text style={styles.headerTitle}>My Items</Text>
                    </View>
                </View>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={60} color={COLORS.textSecondary} />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={() => fetchMyItems()}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>My Items</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate("AddItem")}
                    >
                        <Ionicons name="add" size={28} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{stats.total}</Text>
                        <Text style={styles.statLabel}>Total Items</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{stats.available}</Text>
                        <Text style={styles.statLabel}>Available</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{stats.rented}</Text>
                        <Text style={styles.statLabel}>Rented</Text>
                    </View>
                </View>
            </View>

            {/* Filters */}
            <View style={styles.filterContainer}>
                {FILTERS.map((f) => (
                    <TouchableOpacity
                        key={f.id}
                        style={[
                            styles.filterButton,
                            filter === f.id && styles.filterButtonActive,
                        ]}
                        onPress={() => setFilter(f.id)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === f.id && styles.filterTextActive,
                            ]}
                        >
                            {f.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Items List */}
            <FlatList
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={renderEmpty}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

