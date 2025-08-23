"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { authStorage, type StoredUserData } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: StoredUserData | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoredUserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated on mount
    const userData = authStorage.getUserData()
    const isAuth = authStorage.isAuthenticated()

    if (isAuth && userData) {
      setUser(userData)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Mock login API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()

        // Store tokens and user data
        authStorage.setTokens(data.access, data.refresh)
        const userData: StoredUserData = {
          username: data.username,
          role: data.role,
          user_id: data.user_id,
        }
        authStorage.setUserData(userData)
        setUser(userData)

        // Redirect based on role
        const redirectPath = data.role === "candidate" ? "/candidate/dashboard" : "/interviewer/dashboard"
        router.push(redirectPath)

        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    authStorage.clearAll()
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
