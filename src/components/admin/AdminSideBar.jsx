import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <div>
      <div className='fixed top-18 z-10 h-full text-center text-white font-bold text-2xl  bg-teal-700 py-8 w-1/6 '>
        <h1 className='text-black'>DashBoard</h1>
        <ul className='flex flex-col items-center justify-evenly h-2/3 '>
          <li className='hover:text-black transition-all'>
            <Link to={'/admin/products'}>Products</Link>
          </li>
          <li className='hover:text-black transition-all'>
            <Link to={'/admin/users'}>Users</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminSideBar
