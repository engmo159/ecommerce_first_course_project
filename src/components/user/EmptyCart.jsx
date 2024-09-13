import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from 'react-icons/ci'

const EmptyCart = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-1/3 flex flex-col justify-center items-center gap-2'>
        <img src='/img/empty-shopping.jpg' className='w-3/4' />
        <Link to={'/products'}>
          <Button
            color='green'
            className='flex gap-4 text-xl items-center justify-center'
          >
            Shop Now <CiShoppingCart className='text-3xl font-bold' />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default EmptyCart
