import { createContext, useContext } from 'react'

export const AuthContext = createContext({
  userData: {},
  token: '',
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  getUserInfo: () => {},
  UpdateUserInfo: () => {},
})
export const useAuth = () => useContext(AuthContext)
