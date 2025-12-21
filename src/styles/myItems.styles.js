import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const { width } = Dimensions.get("window");

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
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemImage: {
    width: 120,
    height: 120,
  },
  noImageContainer: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.inputBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  itemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  priceUnit: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  availabilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  availableBadge: {
    backgroundColor: "#E8F5E9",
  },
  rentedBadge: {
    backgroundColor: "#FFF3E0",
  },
  unavailableBadge: {
    backgroundColor: "#FFEBEE",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  availableText: {
    color: "#4CAF50",
  },
  rentedText: {
    color: "#FF9800",
  },
  unavailableText: {
    color: "#F44336",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 20,
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
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

