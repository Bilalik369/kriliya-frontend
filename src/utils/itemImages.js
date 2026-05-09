
export function getPrimaryImageUri(item) {
  const uris = getItemImageUris(item)
  return uris[0] || null
}


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
