import { Platform } from "react-native"

/** Local development — gateway (see authGetway PORT, usually 3510) */
const DEFAULT_GATEWAY = "http://localhost:3510"

/** Production Azure (uncomment DEFAULT_GATEWAY above and comment localhost when deploying) */
// const DEFAULT_GATEWAY =
//   "https://kriliya-gateway-cgb4ddhgcsfqe4bk.francecentral-01.azurewebsites.net"

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

const azureProductionDefault =
  "https://kriliya-gateway-cgb4ddhgcsfqe4bk.francecentral-01.azurewebsites.net"
const isAzureDefault = DEFAULT_GATEWAY.includes("azurewebsites.net")

const gateway =
  isAzureDefault &&
  Platform.OS !== "web" &&
  (isLocalhostGateway || isInsecureGateway || isIpGateway)
    ? azureProductionDefault
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
    GET_PENDING_ADMIN: "/api/items/admin/pending",
    APPROVE_ADMIN: "/api/items/admin",
    REJECT_ADMIN: "/api/items/admin",
  },
}
