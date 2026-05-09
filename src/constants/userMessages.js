/**
 * User-facing copy (English) — auth & listings.
 */
export const USER_MESSAGES = {
  auth: {
    loginEmailPasswordRequired: "Please enter your email and password.",
    registerAllFieldsRequired: "Please fill in all required fields.",
    registerPasswordMinLength: "Password must be at least 6 characters.",
  },
  permissions: {
    photoLibraryTitle: "Photos access required",
    photoLibraryBody:
      "Allow access to your photo library so you can add images to your listing.",
  },
  item: {
    titleRequired: "Title is required.",
    descriptionRequired: "Description is required.",
    categoryRequired: "Please select a category.",
    pricePerDayRequired: "Please enter a valid price per day.",
    cityRequired: "City is required.",
    deleteConfirmTitle: "Delete this listing?",
    deleteConfirmBody:
      "Are you sure? This listing will be removed permanently. This action cannot be undone.",
    deleteConfirmNo: "No",
    deleteConfirmYes: "Yes",
    deleteFailedTitle: "Could not delete",
    deleteSuccessTitle: "Deleted",
    deleteSuccessBody: "Your listing was removed successfully.",
    updateAvailabilityFailedTitle: "Could not update availability",
    genericErrorTitle: "Something went wrong",
    errorMessageFallback: "Please try again.",
    editSuccessTitle: "Saved",
    editSuccessBody: "Your listing was updated successfully.",
    createFallbackTitle: "Success",
    createFallbackBody: "Your listing was created successfully.",
    createToastAndroid: "Listing created successfully",
    createBanner:
      "Listing saved. It will stay private until an admin approves it — you will get an email when it is accepted or rejected.",
  },
}
