import { createContext, useContext } from 'react'

export const AuthContext = createContext({
  userData: {},
  lastUser: {},
  allUsersInfo: [],
  token: '',
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  getUserInfo: () => {},
  UpdateUserInfo: () => {},
  getAllUsers: () => {},
  getLastUser: () => {},
  changeUserRole: () => {},
})
export const useAuth = () => useContext(AuthContext)
