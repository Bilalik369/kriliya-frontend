import AsyncStorage from "@react-native-async-storage/async-storage"

export const StorageKeys = {
  AUTH_TOKEN: "auth_token",
  USER: "user_data",
  RECENT_SEARCHES: "recent_searches",
  FAVORITES: "favorites",
}

export const storage = {
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
      return true
    } catch (error) {
      console.error(" Storage setItem error:", error)
      return false
    }
  },

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error(" Storage getItem error:", error)
      return null
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(" Storage removeItem error:", error)
      return false
    }
  },

  async clear() {
    try {
      await AsyncStorage.clear()
      return true
    } catch (error) {
      console.error(" Storage clear error:", error)
      return false
    }
  },
}
