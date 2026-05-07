import { Platform } from "react-native"
import { apiClient } from "../utils/axios"
import { API_CONFIG, ENDPOINTS } from "../config/api.config"

const MAX_IMAGES_PER_REQUEST = 5

function appendItemFieldsToFormData(formData, itemData) {
  formData.append("title", String(itemData.title ?? ""))
  formData.append("description", String(itemData.description ?? ""))
  formData.append("category", String(itemData.category ?? ""))
  formData.append("condition", String(itemData.condition || "good"))
  formData.append("pricePerDay", String(itemData.pricePerDay))

  if (itemData.pricePerWeek != null && itemData.pricePerWeek !== "") {
    formData.append("pricePerWeek", String(itemData.pricePerWeek))
  }
  if (itemData.pricePerMonth != null && itemData.pricePerMonth !== "") {
    formData.append("pricePerMonth", String(itemData.pricePerMonth))
  }
  formData.append("deposit", String(itemData.deposit ?? 0))
  formData.append("location", JSON.stringify(itemData.location || {}))
}

async function appendImageAssetsToFormData(formData, assets) {
  const slice = assets.slice(0, MAX_IMAGES_PER_REQUEST)
  for (let index = 0; index < slice.length; index++) {
    const asset = slice[index]
    const uri = typeof asset === "string" ? asset : asset?.uri
    if (!uri) continue

    const mime =
      (typeof asset === "object" && asset.mimeType) ||
      (uri.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg")
    const ext = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg"
    const filename = `item_${Date.now()}_${index}.${ext}`

    if (Platform.OS === "web") {
      const res = await fetch(uri)
      const blob = await res.blob()
      formData.append("images", blob, filename)
    } else {
      formData.append("images", {
        uri,
        type: mime,
        name: filename,
      })
    }
  }
}

export const itemsService = {
  async getAllItems(params = {}) {
    try {
      const { page = 1, limit = 10, category, city, minPrice, maxPrice, search, availability } = params

      let queryString = `?page=${page}&limit=${limit}`
      if (category) queryString += `&category=${category}`
      if (city) queryString += `&city=${city}`
      if (minPrice) queryString += `&minPrice=${minPrice}`
      if (maxPrice) queryString += `&maxPrice=${maxPrice}`
      if (search) queryString += `&search=${search}`
      if (availability) queryString += `&availability=${availability}`

      const response = await apiClient.items.get(`${ENDPOINTS.ITEMS.GET_ALL}${queryString}`)
      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async getItemById(itemId) {
    try {
      const response = await apiClient.items.get(`${ENDPOINTS.ITEMS.GET_BY_ID}/${itemId}`)
      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async getItemsByOwner(ownerId, params = {}) {
    try {
      const { page = 1, limit = 10 } = params
      const queryString = `?page=${page}&limit=${limit}`
      const response = await apiClient.items.get(`${ENDPOINTS.ITEMS.GET_BY_OWNER}/${ownerId}${queryString}`)
      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async createItem(itemData, imageAssets = []) {
    try {
      if (!imageAssets?.length) {
        return await apiClient.items.post(ENDPOINTS.ITEMS.CREATE, itemData)
      }
      const formData = new FormData()
      appendItemFieldsToFormData(formData, itemData)
      await appendImageAssetsToFormData(formData, imageAssets)
      return await apiClient.items.post(ENDPOINTS.ITEMS.CREATE, formData, {
        timeout: API_CONFIG.UPLOAD_TIMEOUT,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      })
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async updateItem(itemId, itemData, newImageAssets = []) {
    try {
      if (!newImageAssets?.length) {
        return await apiClient.items.put(`${ENDPOINTS.ITEMS.UPDATE}/${itemId}`, itemData)
      }
      const formData = new FormData()
      appendItemFieldsToFormData(formData, itemData)
      await appendImageAssetsToFormData(formData, newImageAssets)
      return await apiClient.items.put(`${ENDPOINTS.ITEMS.UPDATE}/${itemId}`, formData, {
        timeout: API_CONFIG.UPLOAD_TIMEOUT,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      })
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async deleteItem(itemId) {
    try {
      const response = await apiClient.items.delete(`${ENDPOINTS.ITEMS.DELETE}/${itemId}`)
      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async updateAvailability(itemId, availability) {
    try {
      const response = await apiClient.items.patch(
        `${ENDPOINTS.ITEMS.UPDATE_AVAILABILITY}/${itemId}/availability`,
        { availability },
      )
      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

  _handleError(error) {
    if (error.response) {
      return new Error(error.response.data?.msg || error.response.data?.message || "An error occurred")
    }
    return new Error(error.message || "Network error")
  },
}
