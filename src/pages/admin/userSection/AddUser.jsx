/* eslint-disable no-useless-escape */

import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Spinner,
} from '@material-tailwind/react'
import { useAuth } from '../../../context/Auth/AuthContext'
import HelperText from '../../../components/user/HelperText'
const AddUser = () => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    gender: 'male',
    phone: '',
  })
  const { registerUser, errorMsg, setErrorMsg, loading } = useAuth()
  const [err, setErr] = useState({})
  const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  // update image info
  useEffect(() => {
    setNewUser(prevUserInfo => ({
      ...prevUserInfo,
      image:
        prevUserInfo.gender === 'male'
          ? 'https://img.freepik.com/free-vector/man-red-shirt-with-white-collar_90220-2873.jpg?t=st=1725674282~exp=1725677882~hmac=f7bfca7602c44905f50116f08558e9b0094faedd3715e037043065702980835b&w=740'
          : 'https://img.freepik.com/free-vector/woman-with-long-brown-hair-pink-shirt_90220-2940.jpg?t=st=1725675497~exp=1725679097~hmac=6525c0ab8754722d5d49af16b851ba4cfb611f06b073964f8975af7953025760&w=740',
    }))
  }, [newUser?.gender])
  const submitHandler = e => {
    e.preventDefault()
    setErrorMsg('')
    setErr({})
    if (newUser?.firstName?.length < 3) {
      setErr(prevErr => ({ ...prevErr, errName: true }))
    } else if (newUser?.lastName?.length < 3) {
      setErr(prevErr => ({ ...prevErr, errLastName: true }))
    } else if (!regexp.test(newUser.email)) {
      setErr(prevErr => ({ ...prevErr, errEmail: true }))
    } else if (newUser?.password?.length < 6) {
      setErr(prevErr => ({ ...prevErr, errPassword: true }))
    } else {
      registerUser(newUser, '/admin/users')
    }
  }
  return (
    <Card
      shadow={true}
      className='flex items-center text-white h-[90vh] bg-[#021526] mx-8 gap-8'
    >
      <Typography variant='h4' className='mt-4'>
        Add User
      </Typography>
      <h3 className='text-center text-red-900'>{errorMsg}</h3>
      <form
        className='w-full flex flex-col items-center justify-evenly gap-8 px-8'
        onSubmit={submitHandler}
      >
        <div className='gap-8 flex items-center justify-between w-full '>
          <div className='flex-1'>
            <Input
              label='First Name'
              value={newUser?.firstName || ''}
              onChange={e =>
                setNewUser(prev => ({ ...prev, firstName: e.target.value }))
              }
              color='green'
              className='text-gray-400 text-lg'
              error={err?.errName}
            />
            <HelperText text='* First name must be 3 characters at least' />
          </div>
          <div className='flex-1'>
            <Input
              label='Last Name'
              value={newUser?.lastName || ''}
              onChange={e =>
                setNewUser(prev => ({ ...prev, lastName: e.target.value }))
              }
              color='green'
              className='text-gray-400 text-lg'
              error={err?.errLastName}
            />
            <HelperText text='* Last name must be 3 characters at least' />
          </div>
        </div>
        <div className='w-full gap-8 flex items-center'>
          <div className='flex-1'>
            <Input
              label='Email Address'
              value={newUser?.email || ''}
              onChange={e =>
                setNewUser(prev => ({ ...prev, email: e.target.value }))
              }
              color='green'
              className='text-gray-400 text-lg'
              error={err?.errEmail}
            />
            <HelperText text='* email must contain @ ' />
          </div>
          <div className='flex-1'>
            <Input
              label='Password'
              value={newUser?.password}
              onChange={e =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              error={err?.errPassword}
              type='password'
            />

            <HelperText text='password must be more than 5 characters' />
          </div>
        </div>
        <div className='w-full gap-8 flex items-center'>
          <Select
            label='Select Gender'
            value={newUser?.gender || ''}
            onChange={val =>
              setNewUser({
                ...newUser,
                gender: val,
              })
            }
          >
            <Option selected value='male'>
              Male
            </Option>
            <Option value='female'>Female</Option>
          </Select>
          <Input
            label='City'
            value={newUser?.city}
            onChange={e => setNewUser({ ...newUser, city: e.target.value })}
          />
        </div>
        <div className='w-full gap-8 flex items-center'>
          <div className='flex-1'>
            <Input
              label='User Image'
              value={newUser?.image || ''}
              onChange={e =>
                setNewUser(prev => ({ ...prev, image: e.target.value }))
              }
              color='green'
              className='text-gray-400 text-lg'
            />
          </div>
          <div>
            <Input
              label='Phone Number'
              value={newUser?.phone || ''}
              onChange={e =>
                setNewUser(prev => ({ ...prev, phone: e.target.value }))
              }
              color='green'
              className='text-gray-400 text-lg'
            />
          </div>
        </div>

        <Button
          className='text-lg font-normal'
          type='submit'
          color={'green'}
          fullWidth
          disabled={loading}
        >
          {loading ? <Spinner color='amber' /> : 'Add User'}
        </Button>
      </form>
    </Card>
  )
}

export default AddUser
