import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import styles from "../../styles/login.style";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../services/auth.service";
import { useState } from "react";
import { setError, setLoading, setToken, setUser } from "../../store/slices/authSilce";

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            dispatch(setError("Email and password are required"));
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
        <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>KriliYa</Text>
                    <Text style={styles.subtitle}>Welcome back! Login to continue</Text>
                </View>

                <View style={styles.formContainer}>
                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor={COLORS.placeholderText}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                    {/* Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Error Message */}
                {error && (
                    <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
                        {error}
                    </Text>
                )}

                {/* Login Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={COLORS.white} />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.link}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
