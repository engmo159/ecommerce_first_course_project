import { Button, Input, Typography } from '@material-tailwind/react'
import { useAuth } from '../../context/Auth/AuthContext'
import Checkout from '../../components/user/Checkout'

const CheckOut = () => {
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
        <Checkout btnDisabled />
      </div>
    </div>
  )
}

export default CheckOut
