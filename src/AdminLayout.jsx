import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/user/NotFound'
import AdminHeader from './components/admin/AdminHeader'
import AdminSideBar from './components/admin/AdminSideBar'
import ShowProduct from './pages/admin/ShowProduct'
import EditProduct from './pages/admin/EditProduct'
import AddProduct from './pages/admin/AddProduct'
import ProductDashboard from './pages/admin/ProductDashboard'

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <div className='flex '>
        <AdminSideBar />
        <div className='ml-[16.7%] w-full'>
          <Routes>
            {/* <Route path='/users' element={<DashBoard />} /> */}
            <Route path='/products' element={<ProductDashboard />} />
            <Route path={`/products/:productId`} element={<ShowProduct />} />
            <Route
              path={`/products/edit/:productId`}
              element={<EditProduct />}
            />
            <Route path={`/products/add`} element={<AddProduct />} />

            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
