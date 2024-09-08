import { Button, Input, Typography } from '@material-tailwind/react'
import { useCart } from '../../context/cart/CartContext'
import { useAuth } from '../../context/Auth/AuthContext'

const CheckOut = () => {
  const { totalAmount } = useCart()
  const { userData } = useAuth()
  return (
    <div>
      <Typography
        variant='h2'
        className='text-4xl text-center text-teal-800 mt-4'
      >
        Check Out
      </Typography>
      <div className='flex justify-evenly items-center'>
        {/* checkout form */}
        <form className='flex flex-col w-1/3 gap-8 my-8'>
          <div className='flex flex-col gap-2'>
            <Typography variant='h5' className='text-xl text-teal-400'>
              E Mail
            </Typography>
            <Input label={userData.email} disabled />
          </div>
          <div className='flex flex-col gap-2'>
            <Typography variant='h5' className='text-xl text-teal-400'>
              Card Number
            </Typography>
            <Input color='teal' defaultValue={'**** **** **** **** '} />
          </div>
          <div className='flex flex-col gap-2'>
            <Typography variant='h5' className='text-xl text-teal-400'>
              Expiration Date
            </Typography>
            <Input color='teal' defaultValue={'****  '} />
          </div>
          <Button variant='gradient' disabled className='w-fit'>
            proceed to pay
          </Button>
        </form>
        {/* checkout box */}
        <div className='bg-teal-700 flex flex-col gap-12 p-4 rounded-3xl  '>
          <div className='flex justify-between '>
            <Typography variant='h5' color='white' className='text-md'>
              Total Price
            </Typography>
            <Typography variant='h5' color='white' className='text-2xl'>
              {totalAmount.toFixed(2)} $
            </Typography>
          </div>
          <div className='flex justify-between'>
            <Typography variant='h5' color='white' className='text-md'>
              Taxes
            </Typography>
            <Typography variant='h5' color='white' className='text-2xl'>
              {(totalAmount * 0.1).toFixed(2)} $
            </Typography>
          </div>
          <div className='flex justify-between gap-24'>
            <Typography variant='h5' color='white' className='text-md'>
              Promo Code
            </Typography>
            <Input disabled />
          </div>
          <div className='flex justify-between '>
            <Typography variant='h5' color='white' className='text-md'>
              Total Amount
            </Typography>
            <Typography variant='h5' color='white' className='text-2xl'>
              {(totalAmount * 1.1).toFixed(2)} $
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
