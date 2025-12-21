import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.inputBackground,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  categoriesContainer: {
    paddingVertical: 16,
    paddingLeft: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  itemsGrid: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  itemsRow: {
    justifyContent: "space-between",
  },
  itemCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  itemImageContainer: {
    width: "100%",
    height: CARD_WIDTH * 0.8,
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
    backgroundColor: COLORS.inputBackground,
  },
  availabilityBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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
    fontSize: 10,
    fontWeight: "600",
  },
  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  itemLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
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
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
  priceUnit: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 2,
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
    borderRadius: 8,
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
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 12,
  },
  loginPrompt: {
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loginPromptText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 12,
  },
  loginPromptButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  loginPromptButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default styles;

