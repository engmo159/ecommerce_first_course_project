import { useState } from 'react'
import { AuthContext } from './AuthContext'
const AuthProvider = ({ children }) => {
  const initialUserState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    gender: '',
    phone: '',
    role: '',
  }
  const [userData, setUserData] = useState(initialUserState)
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  )

  const login = token => {
    setToken(token)
    localStorage.setItem('token', token)
  }
  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUserData(initialUserState)
  }
  const isAuthenticated = !!token
  return (
    <AuthContext.Provider
      value={{ token, login, isAuthenticated, logout, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
