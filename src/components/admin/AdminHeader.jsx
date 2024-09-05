import { Navbar, Typography } from '@material-tailwind/react'
const AdminHeader = () => {
  return (
    <Navbar className='sticky top-0 z-20 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-blue-gray-700 border-none'>
      <div className='flex items-center justify-between'>
        <Typography
          as='a'
          href='/'
          className='mr-4 cursor-pointer py-1.5 font-bold text-2xl text-black'
        >
          E Commerce WebSite
        </Typography>
      </div>
    </Navbar>
  )
}

export default AdminHeader
