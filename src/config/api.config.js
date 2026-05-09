const BASE_URL = "http://localhost:3500"

const raw =
  (process.env.EXPO_PUBLIC_BASE_URL || process.env.REACT_APP_BASE_URL || "")
    .trim() || BASE_URL

export const API_CONFIG = {
  BASE_URL: raw.replace(/\/+$/, ""),
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
  BOOKING: { BASE: "/api/booking" },
  REVIEWS: { BASE: "/api/reviews" },
  NOTIFICATIONS: { BASE: "/api/notifications" },
}