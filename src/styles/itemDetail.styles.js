import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  imageContainer: {
    width: width,
    height: width * 0.8,
    backgroundColor: COLORS.inputBackground,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  noImageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: COLORS.background,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginRight: 12,
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: "#4CAF50",
  },
  rentedBadge: {
    backgroundColor: "#FF9800",
  },
  unavailableBadge: {
    backgroundColor: "#F44336",
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  section: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  priceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  priceItem: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  priceUnit: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
  ownerSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  ownerInitials: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.white,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  ownerLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.cardBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 12,
  },
  priceContainer: {
    flex: 1,
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  bottomPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },
  rentButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  rentButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  rentButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
  // Owner Actions
  ownerActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  editButton: {
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
  availabilitySection: {
    marginBottom: 16,
  },
  availabilityButtons: {
    flexDirection: "row",
    gap: 8,
  },
  availabilityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  availabilityButtonActive: {
    borderWidth: 0,
  },
  availabilityButtonText: {
    fontSize: 13,
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 12,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});

export default styles;

