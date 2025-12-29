import React, { createContext, useState, useContext, useEffect } from 'react'

/**
 * Authentication Context
 * Manages user authentication state across the application
 * Provides login, logout, and user state management
 */
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  // User state - stores current user information
  const [user, setUser] = useState(null)
  // Loading state - indicates authentication check in progress
  const [loading, setLoading] = useState(true)

  // Check for saved user session on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('musicAppUser')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  /**
   * Login function
   * @param {Object} userData - User information to store
   */
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('musicAppUser', JSON.stringify(userData))
  }

  /**
   * Logout function
   * Clears user data from state and localStorage
   */
  const logout = () => {
    setUser(null)
    localStorage.removeItem('musicAppUser')
  }

  /**
   * Update user profile
   * @param {Object} updates - Updated user information
   */
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('musicAppUser', JSON.stringify(updatedUser))
  }

  // Context value containing all auth-related data and functions
  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}