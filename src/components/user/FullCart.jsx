import { Button, Typography } from '@material-tailwind/react'
import { useCart } from '../../context/cart/CartContext'
import { MdDelete } from 'react-icons/md'
import { useEffect } from 'react'

const FullCart = ({ productId, title, image, price, quantity }) => {
  const { updateItemsInCart, deleteItemInCart } = useCart()
  const total = (price * quantity).toFixed(2)

  const handleQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateItemsInCart({ productId, quantity: newQuantity })
  }
  const removeItemHandler = productId => {
    deleteItemInCart(productId)
  }
  useEffect(() => {
    console.log(quantity)
  }, [quantity])

  return (
    <div>
      <div className='flex justify-evenly items-center'>
        <img src={image} className='w-32' alt={title} />
        <Typography variant='h5' color='gray' className='text-lg uppercase '>
          {title}
        </Typography>
        <Typography variant='h5' color='gray' className='text-2xl uppercase '>
          {price} $
        </Typography>
      </div>

      <div className='flex justify-evenly items-center'>
        <Button
          color='red'
          onClick={() => handleQuantity(productId, quantity - 1)}
        >
          Decrease
        </Button>
        <Typography variant='h5' color='gray' className='text-2xl uppercase '>
          {quantity}
        </Typography>
        <Button
          color='green'
          onClick={() => handleQuantity(productId, quantity + 1)}
        >
          Increase
        </Button>
        <Typography variant='h5' color='gray' className='text-2xl uppercase '>
          {total} $
        </Typography>
        <Button
          className='bg-transparent text-black shadow-none border-none hover:shadow-none'
          onClick={() => removeItemHandler(productId)}
        >
          <MdDelete className='text-3xl' />
        </Button>
      </div>
    </div>
  )
}

export default FullCart
