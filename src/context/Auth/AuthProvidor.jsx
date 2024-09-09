import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import axios from 'axios'
const AuthProvider = ({ children }) => {
  const initialUserState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    gender: '',
    phone: '',
    image: '',
    role: '',
  }

  const [userData, setUserData] = useState(initialUserState)
  const [lastUser, setLastUser] = useState(initialUserState)
  const [allUsersInfo, setAllUsersInfo] = useState([])
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  )
  // get all user info
  const getAllUsers = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res)
        setAllUsersInfo(res.data)
      })
      .catch(error => console.error('Error fetching users:', error))
  }

  // user information fetching
  const getUserInfo = () => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          console.log(res)
          setUserData(res.data)
        })
        .catch(error => console.error('Error fetching user data:', error))
    }
  }
  //update user info
  const UpdateUserInfo = updatedUserData => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/user/edit/`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res)
        getUserInfo()
      })
      .catch(error => {
        if (error.response) {
          throw new Error(
            `Error: ${error.response.data.message || 'An error occurred'}`
          )
        } else if (error.request) {
          throw new Error('No response received from server')
        } else {
          throw new Error(`Error: ${error.message}`)
        }
      })
  }
  // get last registered user
  const getLastUser = token => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/last-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('Last registered user:', res.data)
        setLastUser(res.data)
      })
      .catch(error => {
        console.error('Error fetching last registered user:', error)
      })
  }
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
  useEffect(() => {
    getUserInfo()
  }, [token])
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        isAuthenticated,
        logout,
        userData,
        getUserInfo,
        UpdateUserInfo,
        getAllUsers,
        allUsersInfo,
        getLastUser,lastUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
