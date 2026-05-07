import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const { width } = Dimensions.get("window");

const WAVE_HEIGHT = 48;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerBlock: {
    backgroundColor: COLORS.primary,
  },
  headerBar: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 4,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 4,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: -0.4,
  },
  brandLottieWrap: {
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 4,
  },
  brandLottie: {
    width: width * 0.42,
    height: width * 0.42,
  },
  inputWrap: {
    marginBottom: 14,
  },
  inputOutline: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    height: "100%",
  },
  eyeBtn: {
    padding: 8,
    marginRight: -4,
  },
  forgotWrap: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 16,
    marginTop: -4,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.errorLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  errorBoxText: {
    flex: 1,
    color: COLORS.error,
    fontSize: 13,
    marginLeft: 8,
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  termsText: {
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    paddingHorizontal: 12,
    fontWeight: "500",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBackground,
    marginBottom: 24,
    gap: 10,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  footerLink: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 14,
  },
});

export default styles;
export { WAVE_HEIGHT, width };
