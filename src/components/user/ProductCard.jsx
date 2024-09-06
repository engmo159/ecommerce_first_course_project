import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from '@material-tailwind/react'
import { Rating, ThinStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { CiShoppingCart } from 'react-icons/ci'
import { useCart } from '../../context/cart/CartContext'
const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9',
}
const ProductCard = ({ _id, title, description, price, rating, image }) => {
  const [starRating, setStarRating] = useState(Math.round(rating.rate))
  const { addItemsToCart } = useCart()

  return (
    <Card className='flex  justify-between  border-none shadow-none cursor-pointer hover:scale-105 transition-all group'>
      <CardHeader
        color='transparent'
        className='relative border-none shadow-none'
      >
        <img src={image} className='max-w-36 max-h-36 mx-auto' />
      </CardHeader>
      <CardBody className='p-2 flex flex-col '>
        <div className='hidden group-hover:flex items-center justify-between '>
          <Button
            className=' rounded-none bg-transparent text-green-800 font-bold text-md border-none shadow-none hover:shadow-none'
            onClick={() => addItemsToCart(_id)}
          >
            + Add to cart
          </Button>
          <CiShoppingCart color='blue' className='text-2xl font-bold ' />
        </div>
        <Typography
          variant='h5'
          color='gray'
          className='text-lg   group-hover:hidden '
        >
          {title}
        </Typography>
        <Typography
          variant='paragraph'
          color='gray'
          className='text-xs text-center '
        >
          {description?.slice(0, 70)}
        </Typography>

        <Rating
          itemStyles={myStyles}
          style={{ maxWidth: 120 }}
          value={starRating}
          onChange={setStarRating}
          transition='zoom'
        />
        <Typography variant='h6' color='gray' className='font-bold  text-lg'>
          {price}$
        </Typography>
      </CardBody>
    </Card>
  )
}

export default ProductCard
