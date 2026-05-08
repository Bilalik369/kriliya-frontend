import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 44) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.background,
    paddingTop: 56,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  greetingWrapper: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: -16,
  },
  greetingHello: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  logoImage: {
    width: 250,
    height: 80,
    resizeMode: "contain",
    marginTop: 2,
    marginLeft: -54,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconButtonPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },

  promoBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 0,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "visible",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  promoTextWrap: {
    flex: 1,
    paddingLeft: 2,
  },
  promoTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 22,
    marginBottom: 8,
  },
  promoSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    marginBottom: 12,
  },
  promoButton: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 22,
  },
  promoButtonText: {
    color: COLORS.textPrimary,
    fontWeight: "700",
    fontSize: 12,
  },
  promoIcon: {
    width: 176,
    height: 136,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  promoIconImage: {
    width: 208,
    height: 164,
    resizeMode: "contain",
    marginLeft: 0,
    marginTop: 2,
  },

  categoriesContainer: {
    paddingVertical: 14,
    paddingLeft: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: COLORS.cardBackground,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: COLORS.white,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  seeAllText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },

  itemsGrid: {
    paddingHorizontal: 12,
    paddingBottom: 110,
  },
  itemsRow: {
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  itemCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 2,
  },
  itemImageContainer: {
    width: "100%",
    height: CARD_WIDTH * 0.85,
    backgroundColor: COLORS.inputBackground,
    position: "relative",
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
    backgroundColor: COLORS.inputBackground,
  },
  availabilityBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  availableBadge: {
    backgroundColor: COLORS.success,
  },
  rentedBadge: {
    backgroundColor: COLORS.warning,
  },
  unavailableBadge: {
    backgroundColor: COLORS.error,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
  },
  priceTag: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  priceTagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },

  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  itemLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginLeft: 3,
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.primary,
  },
  priceUnit: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 2,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.warningLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 11,
    color: COLORS.textPrimary,
    marginLeft: 2,
    fontWeight: "600",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
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
    borderRadius: 12,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 12,
  },

  loginPrompt: {
    backgroundColor: COLORS.primarySoft,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  loginPromptText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textPrimary,
    marginLeft: 10,
    fontWeight: "500",
  },
  loginPromptButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  loginPromptButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 13,
  },
});

export default styles;
