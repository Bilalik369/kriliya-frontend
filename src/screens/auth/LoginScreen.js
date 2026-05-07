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

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const insets = useSafeAreaInsets();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const wavePath = `M0,22 Q${width / 2},${WAVE_HEIGHT + 2} ${width},22 L${width},${WAVE_HEIGHT} L0,${WAVE_HEIGHT} Z`;

    const handleBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.getParent()?.goBack();
        }
    };

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            dispatch(setError(USER_MESSAGES.auth.loginEmailPasswordRequired));
            return;
        }

        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await authService.login(email.trim().toLowerCase(), password);
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
                    <Text style={styles.heroTitle}>Welcome Back!</Text>

                    <View style={styles.brandLottieWrap}>
                        <LottieView
                            source={require("../../assets/E-commerce splash screen.json")}
                            autoPlay
                            loop
                            style={styles.brandLottie}
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
                                placeholder="Password"
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

                    <TouchableOpacity
                        style={styles.forgotWrap}
                        onPress={() =>
                            Alert.alert(
                                "Forgot password",
                                "Password recovery will be available in a future update."
                            )
                        }
                    >
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {error && (
                        <View style={styles.errorBox}>
                            <Ionicons name="alert-circle" size={18} color={COLORS.error} />
                            <Text style={styles.errorBoxText}>{error}</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={COLORS.white} />
                        ) : (
                            <Text style={styles.primaryButtonText}>Login</Text>
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
                            Alert.alert("Google sign-in", "Google sign-in is not set up yet.")
                        }
                        accessibilityRole="button"
                    >
                        <Ionicons name="logo-google" size={22} color="#4285F4" />
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don&apos;t Have Account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.footerLink}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
