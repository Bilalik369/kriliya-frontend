import { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    ToastAndroid,
    KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboardHeight } from "../../hooks/useKeyboardHeight";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/addItem.styles";
import COLORS from "../../constants/colors";
import { itemsService } from "../../services/items.service";
import { setError, setLoading, addItem } from "../../store/slices/itemsSlice";
import { USER_MESSAGES } from "../../constants/userMessages";

const MAX_ITEM_IMAGES = 5;

const CATEGORIES = [
    { id: "vehicles", label: "Vehicles" },
    { id: "tools", label: "Tools" },
    { id: "electronics", label: "Electronics" },
    { id: "sports", label: "Sports" },
    { id: "furniture", label: "Furniture" },
    { id: "clothing", label: "Clothing" },
    { id: "books", label: "Books" },
    { id: "other", label: "Other" },
];

const CONDITIONS = [
    { id: "new", label: "New" },
    { id: "like-new", label: "Like New" },
    { id: "good", label: "Good" },
    { id: "fair", label: "Fair" },
    { id: "poor", label: "Poor" },
];

export default function AddItemScreen({ navigation }) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.items);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("good");
    const [pricePerDay, setPricePerDay] = useState("");
    const [pricePerWeek, setPricePerWeek] = useState("");
    const [pricePerMonth, setPricePerMonth] = useState("");
    const [deposit, setDeposit] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [imageAssets, setImageAssets] = useState([]);

    const insets = useSafeAreaInsets();
    const keyboardHeight = useKeyboardHeight();
    const scrollRef = useRef(null);

    const scrollPaddingBottom =
        32 + insets.bottom + keyboardHeight + (Platform.OS === "android" ? 32 : 16);

    const scrollToLocation = () => {
        requestAnimationFrame(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
        });
    };

    const pickImagesFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                USER_MESSAGES.permissions.photoLibraryTitle,
                USER_MESSAGES.permissions.photoLibraryBody,
            );
            return;
        }
        const remaining = MAX_ITEM_IMAGES - imageAssets.length;
        if (remaining <= 0) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsMultipleSelection: true,
            selectionLimit: remaining,
            quality: 0.85,
        });

        if (result.canceled) return;

        const picked = result.assets.map((a) => ({
            uri: a.uri,
            mimeType: a.mimeType || "image/jpeg",
        }));
        setImageAssets((prev) => [...prev, ...picked].slice(0, MAX_ITEM_IMAGES));
    };

    const removeImageAt = (index) => {
        setImageAssets((prev) => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        if (!title.trim()) {
            dispatch(setError(USER_MESSAGES.item.titleRequired));
            return false;
        }
        if (!description.trim()) {
            dispatch(setError(USER_MESSAGES.item.descriptionRequired));
            return false;
        }
        if (!category) {
            dispatch(setError(USER_MESSAGES.item.categoryRequired));
            return false;
        }
        if (!pricePerDay.trim() || isNaN(Number(pricePerDay))) {
            dispatch(setError(USER_MESSAGES.item.pricePerDayRequired));
            return false;
        }
        if (!city.trim()) {
            dispatch(setError(USER_MESSAGES.item.cityRequired));
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const itemData = {
                title: title.trim(),
                description: description.trim(),
                category,
                condition,
                pricePerDay: Number(pricePerDay),
                pricePerWeek: pricePerWeek ? Number(pricePerWeek) : undefined,
                pricePerMonth: pricePerMonth ? Number(pricePerMonth) : undefined,
                deposit: deposit ? Number(deposit) : 0,
                location: {
                    city: city.trim(),
                    address: address.trim(),
                },
            };

            let response;
            try {
                response = await itemsService.createItem(itemData, imageAssets);
            } catch (firstError) {
                const message = String(firstError?.message || "").toLowerCase();
                const isImageUploadNetworkIssue =
                    imageAssets.length > 0 &&
                    (message.includes("network error") || message.includes("timeout"));

                if (!isImageUploadNetworkIssue) {
                    throw firstError;
                }

                
                response = await itemsService.createItem(itemData, []);
                Alert.alert(
                    "Item created",
                    "Your item was created without images due to upload connection issue. You can add images from Edit Item.",
                );
            }
            const created = response?.item;

            if (created?._id) {
                dispatch(addItem(created));
                if (Platform.OS === "android") {
                    ToastAndroid.show(USER_MESSAGES.item.createToastAndroid, ToastAndroid.LONG);
                }
                navigation.replace("ItemDetail", {
                    itemId: created._id,
                    justCreated: true,
                });
            } else {
                Alert.alert(
                    USER_MESSAGES.item.createFallbackTitle,
                    USER_MESSAGES.item.createFallbackBody,
                    [{ text: "OK", onPress: () => navigation.goBack() }],
                );
            }
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <View style={styles.container}>
            
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Item</Text>
            </View>

            <KeyboardAvoidingView
                style={styles.scrollFill}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    ref={scrollRef}
                    style={styles.scrollFill}
                    contentContainerStyle={[styles.scrollContent, { paddingBottom: scrollPaddingBottom }]}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive"
                    showsVerticalScrollIndicator
                >
                {/* Basic Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Title <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter item title"
                            placeholderTextColor={COLORS.placeholderText}
                            value={title}
                            onChangeText={setTitle}
                            maxLength={100}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Description <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe your item..."
                            placeholderTextColor={COLORS.placeholderText}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            maxLength={1000}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Category <Text style={styles.required}>*</Text>
                        </Text>
                        <View style={styles.categoryGrid}>
                            {CATEGORIES.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[
                                        styles.categoryButton,
                                        category === cat.id && styles.categoryButtonActive,
                                    ]}
                                    onPress={() => setCategory(cat.id)}
                                >
                                    <Text
                                        style={[
                                            styles.categoryText,
                                            category === cat.id && styles.categoryTextActive,
                                        ]}
                                    >
                                        {cat.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Condition</Text>
                        <View style={styles.conditionGrid}>
                            {CONDITIONS.map((cond) => (
                                <TouchableOpacity
                                    key={cond.id}
                                    style={[
                                        styles.conditionButton,
                                        condition === cond.id && styles.conditionButtonActive,
                                    ]}
                                    onPress={() => setCondition(cond.id)}
                                >
                                    <Text
                                        style={[
                                            styles.conditionText,
                                            condition === cond.id && styles.conditionTextActive,
                                        ]}
                                    >
                                        {cond.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Photos */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Photos</Text>
                    <Text style={styles.photosHint}>
                        Choose up to {MAX_ITEM_IMAGES} images from your gallery. They are uploaded to Cloudinary when you create the item.
                    </Text>
                    <View style={styles.imagesContainer}>
                        {imageAssets.map((asset, index) => (
                            <View key={`${asset.uri}-${index}`} style={styles.imagePreview}>
                                <Image source={{ uri: asset.uri }} style={styles.previewImage} />
                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={() => removeImageAt(index)}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                >
                                    <Ionicons name="close" size={16} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {imageAssets.length < MAX_ITEM_IMAGES && (
                            <TouchableOpacity style={styles.addImageButton} onPress={pickImagesFromGallery}>
                                <Ionicons name="images-outline" size={28} color={COLORS.primary} />
                                <Text style={styles.addImageText}>Add from gallery</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Pricing */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pricing (DH)</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Price per Day <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            placeholderTextColor={COLORS.placeholderText}
                            value={pricePerDay}
                            onChangeText={setPricePerDay}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <View style={[styles.inputGroup, styles.inputHalf]}>
                            <Text style={styles.label}>Price per Week</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0"
                                placeholderTextColor={COLORS.placeholderText}
                                value={pricePerWeek}
                                onChangeText={setPricePerWeek}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={[styles.inputGroup, styles.inputHalf]}>
                            <Text style={styles.label}>Price per Month</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0"
                                placeholderTextColor={COLORS.placeholderText}
                                value={pricePerMonth}
                                onChangeText={setPricePerMonth}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Deposit</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            placeholderTextColor={COLORS.placeholderText}
                            value={deposit}
                            onChangeText={setDeposit}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                {/* Location */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Location</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            City <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter city"
                            placeholderTextColor={COLORS.placeholderText}
                            value={city}
                            onChangeText={setCity}
                            onFocus={scrollToLocation}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter address (optional)"
                            placeholderTextColor={COLORS.placeholderText}
                            value={address}
                            onChangeText={setAddress}
                            onFocus={scrollToLocation}
                        />
                    </View>
                </View>

                {/* Error Message */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={COLORS.white} />
                    ) : (
                        <Text style={styles.submitButtonText}>Create Item</Text>
                    )}
                </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

