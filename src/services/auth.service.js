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
      console.log(" Login successful:", response.user)

      return response
    } catch (error) {
      throw this._handleError(error)
    }
  },

  async register(userData) {
    try {
      
      const response = await apiClient.auth.post(ENDPOINTS.AUTH.REGISTER, userData)
      console.log(" Registration response:", response)

      if (response.token) {
        await storage.setItem(StorageKeys.AUTH_TOKEN, response.token)
        await storage.setItem(StorageKeys.USER, response.user)
      }

      return response
    } catch (error) {
      console.error(" Registration error:", error.response?.data || error.message)
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
      const responseData = error.response.data
      if (typeof responseData === "string") {
        try {
          const parsed = JSON.parse(responseData)
          return new Error(parsed?.msg || parsed?.message || responseData)
        } catch (_e) {
          return new Error(responseData)
        }
      }
      return new Error(
        responseData?.msg ||
          responseData?.message ||
          "An error occurred",
      )
    }
    const msg = String(error.message || "")
    if (error.code === "ECONNABORTED" || msg.toLowerCase().includes("timeout")) {
      return new Error(
        "The server took too long to respond. Wait a moment and try again (Azure may be waking up).",
      )
    }
    if (msg === "Network Error" || error.code === "ERR_NETWORK") {
      return new Error(
        "Network error: check your internet connection and that the gateway URL is reachable from this device.",
      )
    }
    return new Error(msg || "Network error")
  },
}
