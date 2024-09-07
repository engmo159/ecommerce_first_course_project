import { Typography, Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
const HomeSlide2 = () => {
  return (
    <div className='h-[1000px] relative'>
      <div className=' absolute top-12 right-40'>
        <img src='/img/banner/banner-1.jpg' />
      </div>
      <div className=' absolute bottom-36 left-40'>
        <img src='/img/banner/banner-2.jpg' />
      </div>
      <div className=' absolute bottom-12 right-40'>
        <img src='/img/banner/banner-3.jpg' />
      </div>
      <div className='absolute top-40 left-1/2 transform -translate-x-1/2 '>
        <Typography variant='h2' className='text-5xl text-blue-gray-800'>
          Clothing
        </Typography>
        <Typography variant='h2' className='text-5xl text-blue-gray-800 '>
          Collections 2024
        </Typography>
        <Link to={'/products'}>
          <Button className='bg-transparent border-none shadow-none hover:shadow-none'>
            <Typography
              variant='h5'
              className='underline text-blue-gray-500 hover:text-teal-700 transition-all'
            >
              Shop Now
            </Typography>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HomeSlide2
