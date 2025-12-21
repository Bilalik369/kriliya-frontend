import { apiClient } from "../utils/axios"
import { ENDPOINTS } from "../config/api.config"

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

  
  async createItem(itemData) {
    try {
      const response = await apiClient.items.post(ENDPOINTS.ITEMS.CREATE, itemData)
      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

 
  async updateItem(itemId, itemData) {
    try {
      const response = await apiClient.items.put(`${ENDPOINTS.ITEMS.UPDATE}/${itemId}`, itemData)
      return response
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
        { availability }
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
