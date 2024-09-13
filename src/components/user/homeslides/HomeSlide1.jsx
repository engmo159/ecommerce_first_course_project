import { Typography, Button } from '@material-tailwind/react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const HomeSlide1 = () => {
  return (
    <div className='bg-hero-1 h-screen xl:bg-cover bg-custom-size'>
      <div className='max-w-screen-md h-full flex flex-col justify-center pl-12 gap-4 items-start lg:w-1/3'>
        <Typography
          variant='h5'
          className='mb-2 text-md md:text-2xl text-red-400 uppercase'
        >
          summer collection
        </Typography>
        <Typography
          variant='h2'
          className='mb-2 text-blue-gray-800 text-xl md:text-4xl'
        >
          Fall - Winter Collection 2024
        </Typography>
        <Typography
          variant='h5'
          className='mb-2 text-gray-600 text-md md:text-lg'
        >
          A Specialist Label creating luxury essentials.Ethically crafted with
          an unwavering commitment to exceptional quality.
        </Typography>
        <Link to={'/products'}>
          <Button
            color='red'
            className='flex text-sm  xl:gap-4 xl:text-xl items-center w-max '
          >
            Shop Now <FaLongArrowAltRight />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HomeSlide1
