import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
    paddingTop: 56,
    paddingBottom: 28,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 14,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primarySoft,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "800",
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  email: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  section: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoTextWrap: {
    marginLeft: 10,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  infoValue: {
    marginTop: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },
});

export default styles;
