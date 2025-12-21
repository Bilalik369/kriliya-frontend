import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.white,
    textAlign: "center",
    marginRight: 40,
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
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  required: {
    color: "#F44336",
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textDark,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  pickerContainer: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: COLORS.textDark,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.inputBackground,
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
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  conditionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  conditionButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  conditionButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  conditionText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  conditionTextActive: {
    color: COLORS.white,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  addImageText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  removeImageButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F44336",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
  errorText: {
    color: "#F44336",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
});

export default styles;

