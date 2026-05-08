import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/profile.styles";
import COLORS from "../../constants/colors";
import { logout } from "../../store/slices/authSilce";
import { authService } from "../../services/auth.service";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth) || {};

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";
  const city = user?.address?.city || user?.city || "-";
  const street = user?.address?.street || user?.address?.address || "-";

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await authService.logout();
          dispatch(logout());
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{fullName.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.email}>{user?.email || "-"}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>

        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={18} color={COLORS.textSecondary} />
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email || "-"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={18} color={COLORS.textSecondary} />
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user?.phone || "-"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color={COLORS.textSecondary} />
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoLabel}>City</Text>
            <Text style={styles.infoValue}>{city}</Text>
          </View>
        </View>

        <View style={[styles.infoRow, styles.infoRowLast]}>
          <Ionicons name="home-outline" size={18} color={COLORS.textSecondary} />
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoLabel}>Street</Text>
            <Text style={styles.infoValue}>{street}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.9}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
