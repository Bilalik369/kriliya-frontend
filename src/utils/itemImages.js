/**
 * Normalise item image shape from API (url / secure_url / string).
 */
export function getPrimaryImageUri(item) {
  const uris = getItemImageUris(item)
  return uris[0] || null
}

/** All displayable image URLs for an item (for gallery / carousel). */
export function getItemImageUris(item) {
  if (!item?.images?.length) return []
  return item.images
    .map((img) => {
      if (!img) return null
      if (typeof img === "string") return img
      return img.url || img.secure_url || null
    })
    .filter(Boolean)
}
