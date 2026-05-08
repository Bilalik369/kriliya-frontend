import { Platform } from "react-native"

const DEFAULT_GATEWAY =
  "https://kriliya-gateway-cgb4ddhgcsfqe4bk.francecentral-01.azurewebsites.net"

const raw =
  (process.env.EXPO_PUBLIC_GATEWAY_URL || process.env.REACT_APP_GATEWAY_URL || "")
    .trim() || DEFAULT_GATEWAY


const normalizedGateway = raw.replace(/\/+$/, "")

const isLocalhostGateway =
  normalizedGateway.includes("localhost") ||
  normalizedGateway.includes("127.0.0.1") ||
  normalizedGateway.includes("10.0.2.2")
const isInsecureGateway = normalizedGateway.startsWith("http://")
const isIpGateway = /^https?:\/\/\d{1,3}(\.\d{1,3}){3}(:\d+)?/i.test(normalizedGateway)


const gateway =
  Platform.OS !== "web" && (isLocalhostGateway || isInsecureGateway || isIpGateway)
    ? DEFAULT_GATEWAY
    : normalizedGateway

export const API_CONFIG = {
  GATEWAY_URL: gateway,

  TIMEOUT: 60000,

  UPLOAD_TIMEOUT: 240000,
}

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/auth/profile/update",
  },
  ITEMS: {
    GET_ALL: "/api/items",
    GET_BY_ID: "/api/items",
    GET_BY_OWNER: "/api/items/owner",
    CREATE: "/api/items",
    UPDATE: "/api/items",
    DELETE: "/api/items",
    UPDATE_AVAILABILITY: "/api/items",
  },
}
