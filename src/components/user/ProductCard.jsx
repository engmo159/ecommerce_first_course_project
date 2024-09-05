import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react'
import { Rating, ThinStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9',
}
const ProductCard = ({
  name,
  description,
  price,
  discountPercentage,
  rating,
  thumbnail,
}) => {
  const [starRating, setStarRating] = useState(Math.round(rating))

  return (
    <Card className='flex items-center justify-between bg-gray-300 cursor-pointer hover:scale-105 transition-all'>
      <CardHeader color='blue-gray' className='relative mt-1 '>
        <img src={thumbnail} className='w-full' />
      </CardHeader>
      <CardBody className='p-2 flex flex-col gap-2 items-center'>
        <Typography variant='h5' color='black' className='text-md'>
          {name}
        </Typography>
        <Typography
          variant='paragraph'
          color='gray'
          className='text-xs text-center '
        >
          {description?.slice(0, 70)}
        </Typography>
        <div className='flex justify-evenly items-center w-full'>
          <Typography
            variant='h6'
            color='gray'
            className='font-bold line-through text-lg'
          >
            {price}$
          </Typography>
          <Typography variant='h6' color='green' className='font-bold text-lg'>
            {((price * (100 - discountPercentage)) / 100).toFixed(2)}$
          </Typography>
        </div>
        <Rating
          itemStyles={myStyles}
          style={{ maxWidth: 180 }}
          value={starRating}
          onChange={setStarRating}
          transition='zoom'
        />
      </CardBody>

      <CardFooter className='p-0 w-full '>
        <Button className='w-full rounded-none  bg-teal-700 text-md'>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
