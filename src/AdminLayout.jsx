import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/user/NotFound'
import AdminHeader from './components/admin/AdminHeader'
import AdminSideBar from './components/admin/AdminSideBar'
import ShowProduct from './pages/admin/productSection/ShowProduct'
import EditProduct from './pages/admin/productSection/EditProduct'
import AddProduct from './pages/admin/productSection/AddProduct'
import ProductDashboard from './pages/admin/productSection/ProductDashboard'
import Dashboard from './pages/admin/Dashboard'
import UserDashboard from './pages/admin/userSection/UserDashboard'

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />

      <AdminSideBar />
      <div className='ml-[16.7%]'>
        <Routes>
          {/* user routes */}
          <Route path='/users' element={<UserDashboard />} />

          {/* products routes */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/products' element={<ProductDashboard />} />
          <Route path={`/products/:productId`} element={<ShowProduct />} />
          <Route path={`/products/edit/:productId`} element={<EditProduct />} />
          <Route path={`/products/add`} element={<AddProduct />} />
          {/* not found route */}
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminLayout
