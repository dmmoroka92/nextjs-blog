const API_PREFIX = "/api/v1"

export const API_ROUTES = {
  auth: {
    login: `${API_PREFIX}/auth/login`,
    logout: `${API_PREFIX}/auth/logout`,
    signup: `${API_PREFIX}/auth/sign_up`,
    refresh: `${API_PREFIX}/auth/refresh`
  },
  me: `${API_PREFIX}/auth/me`,
} as const;

export const APP_ROUTES = {
  auth: {
    login: "/login"
  }
} as const