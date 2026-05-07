import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import styles, { WAVE_HEIGHT, width } from "../../styles/login.style";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Svg, { Path } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../services/auth.service";
import { useState } from "react";
import { setError, setLoading, setToken, setUser } from "../../store/slices/authSilce";
import { USER_MESSAGES } from "../../constants/userMessages";

export default function RegisterScreen({ navigation }) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const insets = useSafeAreaInsets();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const wavePath = `M0,22 Q${width / 2},${WAVE_HEIGHT + 2} ${width},22 L${width},${WAVE_HEIGHT} L0,${WAVE_HEIGHT} Z`;

    const handleBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.getParent()?.goBack();
        }
    };

    const handleRegister = async () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !phone.trim()) {
            dispatch(setError(USER_MESSAGES.auth.registerAllFieldsRequired));
            return;
        }

        if (password.length < 6) {
            dispatch(setError(USER_MESSAGES.auth.registerPasswordMinLength));
            return;
        }

        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await authService.register({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim().toLowerCase(),
                password,
                phone: phone.trim(),
                address: {
                    street: street.trim(),
                    city: city.trim(),
                },
            });
            dispatch(setUser(response.user));
            dispatch(setToken(response.token));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <StatusBar style="light" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerBlock}>
                    <View style={[styles.headerBar, { paddingTop: insets.top + 8 }]}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={handleBack}
                            accessibilityRole="button"
                            accessibilityLabel="Go back"
                        >
                            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <Svg width={width} height={WAVE_HEIGHT}>
                        <Path d={wavePath} fill={COLORS.background} />
                    </Svg>
                </View>

                <View style={styles.content}>
                    <Text style={styles.heroTitle}>Create Account</Text>

                    <View style={styles.brandLottieWrap}>
                        <LottieView
                            source={require("../../assets/TemanASN Home Mobile.json")}
                            autoPlay
                            loop
                            style={styles.brandLottie}
                        />
                    </View>

                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.inputOutline}
                            placeholder="First Name"
                            placeholderTextColor={COLORS.placeholderText}
                            value={firstName}
                            onChangeText={setFirstName}
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.inputOutline}
                            placeholder="Last Name"
                            placeholderTextColor={COLORS.placeholderText}
                            value={lastName}
                            onChangeText={setLastName}
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.inputOutline}
                            placeholder="Email"
                            placeholderTextColor={COLORS.placeholderText}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputWrap}>
                        <View style={styles.passwordRow}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Create Password"
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeBtn}
                                onPress={() => setShowPassword(!showPassword)}
                                accessibilityRole="button"
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={22}
                                    color={COLORS.textMuted}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.inputOutline}
                            placeholder="Phone"
                            placeholderTextColor={COLORS.placeholderText}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.inputOutline}
                            placeholder="Street"
                            placeholderTextColor={COLORS.placeholderText}
                            value={street}
                            onChangeText={setStreet}
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.inputOutline}
                            placeholder="City"
                            placeholderTextColor={COLORS.placeholderText}
                            value={city}
                            onChangeText={setCity}
                            autoCapitalize="words"
                        />
                    </View>

                    {error && (
                        <View style={styles.errorBox}>
                            <Ionicons name="alert-circle" size={18} color={COLORS.error} />
                            <Text style={styles.errorBoxText}>{error}</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={COLORS.white} />
                        ) : (
                            <Text style={styles.primaryButtonText}>Register</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.termsText}>
                        {`By continuing you are agreeing our terms & conditions and our privacy policies.`}
                    </Text>

                    <View style={styles.dividerRow}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerLabel}>or continue with Google</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <TouchableOpacity
                        style={styles.googleButton}
                        onPress={() =>
                            Alert.alert("Google sign-in", "Google sign-up is not set up yet.")
                        }
                        accessibilityRole="button"
                    >
                        <Ionicons name="logo-google" size={22} color="#4285F4" />
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.footerLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
