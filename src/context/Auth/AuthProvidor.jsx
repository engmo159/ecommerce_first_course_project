import { useState } from 'react'
import { AuthContext } from './AuthContext'
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ name: '', email: '', role: '' })
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  )

  const login = token => {
    setToken(token)
    localStorage.setItem('token', token)
  }
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    setToken('')
    setUserData({ name: '', email: '', role: '' })
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


