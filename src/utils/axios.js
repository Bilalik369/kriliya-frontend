import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_CONFIG } from "../config/api.config"
import { StorageKeys } from "./storage"

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: API_CONFIG.TIMEOUT,
  })

  instance.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem(StorageKeys.AUTH_TOKEN)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
  )

  return instance
}

export const apiClient = {
  gateway: createAxiosInstance(API_CONFIG.GATEWAY_URL),
  auth: createAxiosInstance(API_CONFIG.AUTH_SERVICE),

}
