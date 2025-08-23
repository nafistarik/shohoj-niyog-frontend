export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
} as const

export interface StoredUserData {
  username: string
  role: "candidate" | "interviewer"
  user_id: string
}

export const authStorage = {
  setTokens: (access: string, refresh: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, access)
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refresh)
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
    }
    return null
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)
    }
    return null
  },

  setUserData: (userData: StoredUserData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(userData))
    }
  },

  getUserData: (): StoredUserData | null => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(AUTH_STORAGE_KEYS.USER_DATA)
      return data ? JSON.parse(data) : null
    }
    return null
  },

  clearAll: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
      localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)
      localStorage.removeItem(AUTH_STORAGE_KEYS.USER_DATA)
    }
  },

  isAuthenticated: (): boolean => {
    return !!authStorage.getAccessToken()
  },

  getUserRole: (): "candidate" | "interviewer" | null => {
    const userData = authStorage.getUserData()
    return userData?.role || null
  },
}
