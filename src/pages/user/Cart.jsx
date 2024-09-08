import { Typography, Button } from '@material-tailwind/react'
import { FaCreditCard } from 'react-icons/fa'
import { useCart } from '../../context/cart/CartContext'
import EmptyCart from '../../components/user/EmptyCart'
import FullCart from '../../components/user/FullCart'
import { MdDelete } from 'react-icons/md'

const Cart = () => {
  const { cartItems, totalAmount, clearCartHandler } = useCart()
  return (
    <div className='text-center flex justify-evenly min-h-screen gap-16 mx-8'>
      {cartItems.length == 0 ? (
        <EmptyCart />
      ) : (
        <div className='w-full flex flex-col justify-evenly gap-2 my-8'>
          {/* clear cart items  */}
          <Button
            className=' text-blue-800 w-fit mx-auto'
            onClick={() => {
              clearCartHandler()
            }}
          >
            <div className='flex justify-center gap-2'>
              <Typography
                variant='h5'
                color='gray'
                className='text-lg uppercase '
              >
                ClearCart
              </Typography>
              <MdDelete className='text-3xl' />
            </div>
          </Button>
          {cartItems.map(
            ({ productId, title, quantity, image, price, stock }, index) => (
              <div key={index}>
                <FullCart
                  productId={productId}
                  price={price}
                  title={title}
                  quantity={quantity}
                  image={image}
                  stock={stock}
                />
              </div>
            )
          )}
          <Typography variant='h5' color='gray' className='text-2xl uppercase '>
            total amount :{totalAmount.toFixed(2)} $
          </Typography>
        </div>
      )}
      {/* checkout */}
      <div className='w-1/4 '>
        <div className='bg-gray-300 mt-8 flex flex-col gap-4 p-4 rounded'>
          <Typography variant='h5' color='gray' className='text-lg uppercase '>
            Cart Total
          </Typography>
          <div className='flex justify-between items-center text-gray-700'>
            <Typography variant='h5' className='text-2xl uppercase '>
              {totalAmount.toFixed(2)} $
            </Typography>
            <FaCreditCard className='text-2xl' />
          </div>

          <Button
            color='green'
            className='text-lg text-center items-center w-full'
            disabled={cartItems.length == 0 ? true : false}
          >
            CheckOut
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart
