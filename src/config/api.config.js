export const API_CONFIG = {
      GATEWAY_URL: process.env.REACT_APP_GATEWAY_URL || "http://localhost:3000",
      AUTH_SERVICE: process.env.REACT_APP_AUTH_SERVICE || "http://localhost:3001",
      TIMEOUT: 15000,
}


export const ENDPOINTS = {
      AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/auth/profile/update",
  },
}

