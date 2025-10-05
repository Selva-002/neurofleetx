import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios' // Axios instance with baseURL and interceptors

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On app load, check for existing token
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      verifyToken()
    } else {
      setLoading(false)
    }
  }, [])

  // Verify token and get user info
  const verifyToken = async () => {
    try {
      const response = await api.get('/api/auth/verify')
      setUser(response.data)
    } catch (error) {
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  // Login function
  const login = async (username, password) => {
    try {
      const response = await api.post('/api/auth/signin', { username, password })
      const { accessToken, id, username: userUsername, email, roles } = response.data

      localStorage.setItem('token', accessToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

      setUser({ id, username: userUsername, email, roles })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      }
    }
  }

  // Register function
  const register = async (username, email, password, role = 'ROLE_CUSTOMER') => {
    try {
      await api.post('/api/auth/signup', { username, email, password, role: [role] })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  // Check if user has at least one of the required roles
  const hasRole = (requiredRoles) => {
    if (!user || !user.roles) return false
    return requiredRoles.some(role => user.roles.includes(role))
  }

  const value = {
    user,
    login,
    register,
    logout,
    hasRole,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}








