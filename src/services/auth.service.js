import { apiClient } from "../utils/axios"
import { ENDPOINTS } from "../config/api.config"
import { storage, StorageKeys } from "../utils/storage"

export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.auth.post(ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      })

      if (response.token) {
        await storage.setItem(StorageKeys.AUTH_TOKEN, response.token)
        await storage.setItem(StorageKeys.USER, response.user)
      }

      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async register(userData) {
    try {
      const response = await apiClient.auth.post(ENDPOINTS.AUTH.REGISTER, userData)

      if (response.token) {
        await storage.setItem(StorageKeys.AUTH_TOKEN, response.token)
        await storage.setItem(StorageKeys.USER, response.user)
      }

      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async getProfile() {
    try {
      const response = await apiClient.auth.get(ENDPOINTS.AUTH.PROFILE)
      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async updateProfile(userData) {
    try {
      const response = await apiClient.auth.put(ENDPOINTS.AUTH.UPDATE_PROFILE, userData)
      await storage.setItem(StorageKeys.USER, response.user)
      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async logout() {
    try {
      await storage.removeItem(StorageKeys.AUTH_TOKEN)
      await storage.removeItem(StorageKeys.USER)
      return true
    } catch (error) {
      console.error(" Logout error:", error)
      return false
    }
  },

  _handleError(error) {
    if (error.response) {
      return new Error(error.response.data?.message || "An error occurred")
    }
    return new Error(error.message || "Network error")
  },
}
