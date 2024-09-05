import { Routes, Route } from 'react-router-dom'
import Header from './components/user/Header'
import Home from './pages/user/Home'
import Products from './pages/user/Products'
import Contact from './pages/user/Contact'
import LogIn from './pages/user/LogIn'
import SignUp from './pages/user/SignUp'
import NotFound from './pages/user/NotFound'
import BlindingBar from './components/user/BlindingBar'

const UserLayout = ({ theme, setTheme }) => {
  return (
    <div>
      <BlindingBar />
      <Header setTheme={setTheme} theme={theme} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<LogIn theme={theme} />} />
        <Route path='/signup' element={<SignUp theme={theme} />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default UserLayout
