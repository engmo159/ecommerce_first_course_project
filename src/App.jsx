import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UserLayout from './UserLayout'
import AdminLayout from './AdminLayout'
import { useAuth } from './context/Auth/AuthContext'
import LogIn from './pages/user/LogIn'

const App = () => {
  const { userData } = useAuth()

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
