import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UserLayout from './UserLayout'
import AdminLayout from './AdminLayout'
import { useAuth } from './context/Auth/AuthContext'
import LogIn from './pages/user/LogIn'
import axios from 'axios'

const App = () => {
  const { userData, token, setUserData } = useAuth()

  // dark light theme setup
  const [theme, setTheme] = useState('')
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [theme])
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
          setUserData({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            city: res.data.city,
            gender: res.data.gender,
            phone: res.data.phone,
            role: res.data.role,
          })
        })
        .catch(error => console.error('Error fetching user data:', error))
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [token])
  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-black text-white dark' : 'bg-white text-black'
      } min-h-screen`}
    >
      <Routes>
        <Route
          path='/*'
          element={<UserLayout theme={theme} setTheme={setTheme} />}
        />

        <Route
          path='/admin/*'
          element={userData.role == 'admin' ? <AdminLayout /> : <LogIn />}
        />
      </Routes>
    </div>
  )
}
export default App
