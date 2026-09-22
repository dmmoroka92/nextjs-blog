const API_PREFIX = "/api/v1"

export const API_ROUTES = {
  auth: {
    signup: `${API_PREFIX}/auth/sign_up`,
    login: `${API_PREFIX}/auth/login`,
    logout: `${API_PREFIX}/auth/logout`,
    me: `${API_PREFIX}/auth/me`,
  },
} as const;