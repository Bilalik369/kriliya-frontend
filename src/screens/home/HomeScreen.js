import { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import styles from "../../styles/home.styles";
import COLORS from "../../constants/colors";
import { itemsService } from "../../services/items.service";

const CATEGORIES = [
    { id: "all", label: "All" },
    { id: "vehicles", label: "Vehicles" },
    { id: "tools", label: "Tools" },
    { id: "electronics", label: "Electronics" },
    { id: "sports", label: "Sports" },
    { id: "furniture", label: "Furniture" },
    { id: "clothing", label: "Clothing" },
    { id: "books", label: "Books" },
    { id: "other", label: "Other" },
];

export default function HomeScreen({ navigation }) {
    const { isAuthenticated } = useSelector((state) => state.auth) || {};

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchItems = useCallback(async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
                setPage(1);
            } else {
                setLoading(true);
            }
            setError(null);

            const params = {
                page: isRefresh ? 1 : page,
                limit: 10,
            };

            if (selectedCategory !== "all") {
                params.category = selectedCategory;
            }

            if (searchQuery.trim()) {
                params.search = searchQuery.trim();
            }

            const response = await itemsService.getAllItems(params);
            
            if (isRefresh || page === 1) {
                setItems(response.items || []);
            } else {
                setItems(prev => [...prev, ...(response.items || [])]);
            }

            setHasMore(response.currentPage < response.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [page, selectedCategory, searchQuery]);

    useEffect(() => {
        fetchItems();
    }, [selectedCategory]);

    const handleRefresh = () => {
        fetchItems(true);
    };

    const handleSearch = () => {
        setPage(1);
        fetchItems(true);
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setPage(1);
    };

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
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

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemCard}
            onPress={() => {
                if (isAuthenticated) {
                    navigation.navigate("ItemDetail", { itemId: item._id });
                } else {
                    navigation.navigate("Login");
                }
            }}
            activeOpacity={0.8}
        >
            <View style={styles.itemImageContainer}>
                {item.images && item.images.length > 0 ? (
                    <Image
                        source={{ uri: item.images[0].url }}
                        style={styles.itemImage}
                    />
                ) : (
                    <View style={styles.noImageContainer}>
                        <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                    </View>
                )}
                <View style={[styles.availabilityBadge, getAvailabilityStyle(item.availability)]}>
                    <Text style={styles.badgeText}>{getAvailabilityText(item.availability)}</Text>
                </View>
            </View>

            <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.title}
                </Text>
                
                <View style={styles.itemLocation}>
                    <Ionicons name="location-outline" size={12} color={COLORS.textSecondary} />
                    <Text style={styles.locationText} numberOfLines={1}>
                        {item.location?.city || "Unknown"}
                    </Text>
                </View>

                <View style={styles.itemBottom}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.itemPrice}>{item.pricePerDay} DH</Text>
                        <Text style={styles.priceUnit}>/day</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>
                            {item.rating?.average?.toFixed(1) || "0.0"}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderHeader = () => (
        <>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.logo}>KriliYa</Text>
                    <View style={styles.headerIcons}>
                        {isAuthenticated && (
                            <TouchableOpacity 
                                style={styles.iconButton}
                                onPress={() => navigation.navigate("AddItem")}
                            >
                                <Ionicons name="add" size={24} color={COLORS.white} />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search items..."
                        placeholderTextColor={COLORS.placeholderText}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                    <TouchableOpacity style={styles.filterButton} onPress={handleSearch}>
                        <Ionicons name="options-outline" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Login Prompt for non-authenticated users */}
            {!isAuthenticated && (
                <View style={styles.loginPrompt}>
                    <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.loginPromptText}>
                        Login to rent items or add your own listings
                    </Text>
                    <TouchableOpacity
                        style={styles.loginPromptButton}
                        onPress={() => navigation.navigate("Auth")}
                    >
                        <Text style={styles.loginPromptButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
            >
                {CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category.id && styles.categoryButtonActive,
                        ]}
                        onPress={() => handleCategorySelect(category.id)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === category.id && styles.categoryTextActive,
                            ]}
                        >
                            {category.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Section Header */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    {selectedCategory === "all" ? "All Items" : CATEGORIES.find(c => c.id === selectedCategory)?.label}
                </Text>
                <Text style={styles.seeAllText}>{items.length} items</Text>
            </View>
        </>
    );

    const renderEmpty = () => {
        if (loading) return null;
        
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="cube-outline" size={60} color={COLORS.textSecondary} />
                <Text style={styles.emptyText}>No items found</Text>
            </View>
        );
    };

    const renderFooter = () => {
        if (!loading || items.length === 0) return null;
        
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
        );
    };

    if (loading && items.length === 0) {
        return (
            <View style={styles.container}>
                {renderHeader()}
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={styles.loadingText}>Loading items...</Text>
                </View>
            </View>
        );
    }

    if (error && items.length === 0) {
        return (
            <View style={styles.container}>
                {renderHeader()}
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={60} color={COLORS.textSecondary} />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={() => fetchItems(true)}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={styles.itemsRow}
                contentContainerStyle={styles.itemsGrid}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmpty}
                ListFooterComponent={renderFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                    />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

