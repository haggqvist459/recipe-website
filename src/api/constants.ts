
export const ENDPOINTS = {
  AUTH: {
    SIGNIN: '/auth/sessions/signin',
    SIGNOUT: '/auth/sessions/signout',
  },
} as const;

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const LOCALSTORAGE_KEYS = { 
  ACCESS_TOKEN: 'access_token'
}