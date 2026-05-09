import { StyleSheet } from "react-native"
import COLORS from "../constants/colors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 54,
  },
  list: {
    padding: 14,
    paddingBottom: 100,
  },
  header: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    overflow: "hidden",
  },
  cover: {
    width: "100%",
    height: 160,
  },
  coverFallback: {
    width: "100%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
  },
  content: {
    padding: 12,
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  meta: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  btn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  approveBtn: {
    backgroundColor: COLORS.success,
  },
  rejectBtn: {
    backgroundColor: COLORS.error,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 13,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 20,
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.textSecondary,
    marginTop: 24,
    fontSize: 14,
  },
  errorText: {
    color: COLORS.textSecondary,
    textAlign: "center",
    fontSize: 14,
  },
  retryBtn: {
    marginTop: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: "700",
  },
})

export default styles
