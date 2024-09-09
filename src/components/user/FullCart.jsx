import { Button, Typography } from '@material-tailwind/react'
import { useCart } from '../../context/cart/CartContext'
import { MdDelete } from 'react-icons/md'
import { useEffect } from 'react'

const FullCart = ({ productId, title, image, price, quantity, stock }) => {
  const { updateItemsInCart, deleteItemInCart, fetchCartData } = useCart()
  const handleQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateItemsInCart({ productId, quantity: newQuantity })
  }
  const removeItemHandler = productId => {
    deleteItemInCart(productId)
  }
  useEffect(() => {
    fetchCartData()
  }, [quantity])

  return (
    <div className='flex flex-col gap-8 m-4'>
      <div className='flex justify-evenly items-center'>
        <img src={image} className='w-28' alt={title} />
        <Typography variant='h5' color='gray' className='text-md uppercase '>
          {title}
        </Typography>
        <Typography variant='h5' color='gray' className='text-2xl uppercase '>
          {price} $
        </Typography>
      </div>

      <div className='flex justify-evenly items-center'>
        <Button
          color='red'
          disabled={quantity == 1}
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
          disabled={quantity >= stock}
        >
          Increase
        </Button>
        <Typography variant='h5' color='gray' className='text-2xl uppercase '>
          {(price * quantity).toFixed(2)} $
        </Typography>
        <Typography variant='h5' color='gray' className='text-red-400'>
          <span className='text-sm text-gray-500'>items left :</span>
          {stock - quantity}
        </Typography>
        <Button
          className='bg-transparent text-black shadow-none border-none hover:shadow-none'
          onClick={() => removeItemHandler(productId)}
        >
          <MdDelete className='text-3xl' />
        </Button>
      </div>
      <div className='h-1 bg-gray-300 rounded'></div>
    </div>
  )
}

export default FullCart
