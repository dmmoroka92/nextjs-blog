const API_PREFIX = "/api/v1";

function buildRoute(path: string) {
  return `${API_PREFIX}${path}`;
}

export const API_ROUTES = {
  auth: {
    login: buildRoute("/auth/login"),
    logout: buildRoute("/auth/logout"),
    signup: buildRoute("/auth/sign_up"),
    refresh: buildRoute("/auth/refresh"),
    me: buildRoute("/auth/me"),
  },

  posts: {
    create: buildRoute("/posts"),
    index: buildRoute("/posts"),
    show: (slug: string) => buildRoute(`/posts/${slug}`)
  },
  dashboard: {
    show: buildRoute("/dashboard")
  }
} as const;

export const APP_ROUTES = {
  auth: {
    login: "/login",
    signUp: "/sign-up"
  },
  posts: {
    new: "/posts/new",
    index: "/posts",
    show: (slug: string) => `/posts/${slug}`
  }
} as const;