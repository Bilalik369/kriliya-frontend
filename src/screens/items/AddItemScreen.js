import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/addItem.styles";
import COLORS from "../../constants/colors";
import { itemsService } from "../../services/items.service";
import { addItem, setError, setLoading } from "../../store/slices/itemsSlice";

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

    const validateForm = () => {
        if (!title.trim()) {
            dispatch(setError("Title is required"));
            return false;
        }
        if (!description.trim()) {
            dispatch(setError("Description is required"));
            return false;
        }
        if (!category) {
            dispatch(setError("Category is required"));
            return false;
        }
        if (!pricePerDay.trim() || isNaN(Number(pricePerDay))) {
            dispatch(setError("Valid price per day is required"));
            return false;
        }
        if (!city.trim()) {
            dispatch(setError("City is required"));
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

            const response = await itemsService.createItem(itemData);
            
            Alert.alert(
                "Success",
                "Item created successfully!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Item</Text>
            </View>

            <ScrollView style={styles.scrollContent}>
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
        </View>
    );
}

