const DEFAULT_GATEWAY =
  "https://kriliya-gateway-cgb4ddhgcsfqe4bk.francecentral-01.azurewebsites.net"

const raw =
  (process.env.EXPO_PUBLIC_GATEWAY_URL || process.env.REACT_APP_GATEWAY_URL || "")
    .trim() || DEFAULT_GATEWAY


const gateway = raw.replace(/\/+$/, "")

export const API_CONFIG = {
  GATEWAY_URL: gateway,

  TIMEOUT: 60000,
  UPLOAD_TIMEOUT: 120000,
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
