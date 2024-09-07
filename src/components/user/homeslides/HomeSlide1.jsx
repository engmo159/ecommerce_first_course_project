import { Typography, Button } from '@material-tailwind/react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const HomeSlide1 = () => {
  return (
    <div className='bg-hero-1 h-screen '>
      <div className='max-w-screen-md h-full flex flex-col justify-center pl-12 gap-4 items-start w-1/3'>
        <Typography
          variant='h5'
          className='mb-2 text-md text-red-400 uppercase '
        >
          summer collection
        </Typography>
        <Typography variant='h2' className='mb-2 text-blue-gray-800 '>
          Fall - Winter Collection 2024
        </Typography>
        <Typography variant='h5' className='mb-2 text-gray-600 '>
          A Specialist Label creating luxury essentials.Ethically crafted with
          an unwavering commitment to exceptional quality.
        </Typography>
        <Link to={'/products'}>
          <Button color='red' className='flex gap-4 text-xl items-center'>
            Shop Now <FaLongArrowAltRight />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HomeSlide1
