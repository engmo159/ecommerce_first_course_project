import { Typography, Button } from '@material-tailwind/react'
import { FaCreditCard } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from 'react-icons/ci'
import { useAuth } from '../../context/Auth/AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../../context/cart/CartContext'

const Cart = () => {
  const { token } = useAuth()
  const { cartItems, totalAmount } = useCart()
  console.log(cartItems)
  // useEffect(() => {
  //   axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart`).then(res => {})
  // }, [token])

  return (
    <div className='text-center flex justify-evenly h-screen'>
      <div className='w-1/3 flex flex-col justify-center items-center'>
        <img src='/img/empty-shopping.jpg' className='w-3/4' />
        <Link to={'/products'}>
          <Button color='green' className='flex gap-4 text-xl items-center'>
            Shop Now <CiShoppingCart className='text-3xl font-bold' />
          </Button>
        </Link>
      </div>
      <div className='w-1/4 '>
        <div className='bg-gray-300 mt-8 flex flex-col gap-4 p-4 rounded'>
          <Typography variant='h5' color='gray' className='text-lg uppercase '>
            Cart Total
          </Typography>
          <div className='flex justify-between items-center text-gray-700'>
            <Typography variant='h5' className='text-4xl uppercase '>
              0$
            </Typography>
            <FaCreditCard className='text-2xl' />
          </div>
          <Link to={'/products'}>
            <Button
              color='green'
              className='text-lg text-center items-center w-full'
              disabled={true}
            >
              CheckOut
            </Button>
          </Link>
          <div>
            {cartItems.map((i, index) => (
              <h1 key={index}>{i.title}</h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
