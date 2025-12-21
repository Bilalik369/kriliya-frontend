export const API_CONFIG = {
      GATEWAY_URL: process.env.REACT_APP_GATEWAY_URL || "http://localhost:3510",

      TIMEOUT: 15000,
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

