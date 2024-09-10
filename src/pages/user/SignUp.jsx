/* eslint-disable no-useless-escape */
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
  Select,
  Option,
} from '@material-tailwind/react'
import HelperText from '../../components/user/HelperText'
import { useAuth } from '../../context/Auth/AuthContext'

const SignUp = ({ theme }) => {
  // states

  const [userInfo, setUserInfo] = useState(null)
  const [err, setErr] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [checkBoxColor, setCheckBoxColor] = useState('gray')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  //   other variables && hooks
  const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const navigate = useNavigate()
  const colorTheme = `${theme == 'dark' ? 'white' : 'blue-gray'}`
  const { login } = useAuth()
  // update image info
  useEffect(() => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      image:
        prevUserInfo.gender === 'male'
          ? 'https://img.freepik.com/free-vector/man-red-shirt-with-white-collar_90220-2873.jpg?t=st=1725674282~exp=1725677882~hmac=f7bfca7602c44905f50116f08558e9b0094faedd3715e037043065702980835b&w=740'
          : 'https://img.freepik.com/free-vector/woman-with-long-brown-hair-pink-shirt_90220-2940.jpg?t=st=1725675497~exp=1725679097~hmac=6525c0ab8754722d5d49af16b851ba4cfb611f06b073964f8975af7953025760&w=740',
    }))
  }, [userInfo?.gender])
  // submit function
  const submitHandler = e => {
    e.preventDefault()
    setErr({})
    setCheckBoxColor('gray')
    setErrorMsg('')
    if (userInfo?.firstName?.length < 3) {
      setErr({ ...err, errName: true })
    } else if (!regexp.test(userInfo.email)) {
      setErr({ ...err, errEmail: true })
    } else if (userInfo.password.length < 6) {
      setErr({ ...err, errPassword: true })
    } else if (!isChecked) {
      setCheckBoxColor('red')
    } else {
      setLoading(true)
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, userInfo)
        .then(res => {
          navigate('/')
          if (!res) {
            setErrorMsg('incorrect token')
          }
          login(res.data)
        })
        .catch(err => {
          console.log(err)
          setErrorMsg(err.response.data)
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <Card
      color='transparent'
      shadow={false}
      className='flex  items-center mt-4 text-black dark:text-white w-full'
    >
      <Typography variant='h4'>Sign Up</Typography>
      <Typography color={'gray'} className='mt-1 font-normal'>
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className='mt-8 mb-2 md:w-1/2 max-w-screen-lg flex flex-col gap-4'
        onSubmit={submitHandler}
      >
        <div>
          <h3 className='text-center text-red-900'>{errorMsg}</h3>
        </div>
        <div className='flex  justify-evenly gap-2'>
          <div className='w-full'>
            <Input
              label='FirstName'
              value={userInfo?.firstName}
              onChange={e =>
                setUserInfo({ ...userInfo, firstName: e.target.value })
              }
              error={err?.errName}
              color={colorTheme}
            />
            <HelperText text='* user name must be 3 characters at least' />
          </div>
          <div className='w-full'>
            <Input
              label='LastName'
              value={userInfo?.lastName}
              onChange={e =>
                setUserInfo({ ...userInfo, lastName: e.target.value })
              }
              color={colorTheme}
            />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div>
            <Input
              label='Email'
              value={userInfo?.email}
              onChange={e =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              error={err?.errEmail}
              color={colorTheme}
            />
            <HelperText text='* email must contain @ ' />
          </div>
          <div>
            <Input
              label='Password'
              value={userInfo?.password}
              onChange={e =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              error={err?.errPassword}
              type='password'
              color={colorTheme}
            />
            <HelperText text='password must be more than 5 characters' />
          </div>
        </div>
        <div className='flex  justify-evenly gap-2'>
          <div className='w-full'>
            <Input
              label='City'
              value={userInfo?.city}
              onChange={e => setUserInfo({ ...userInfo, city: e.target.value })}
              color={colorTheme}
            />
          </div>
          <div className='w-full'>
            <Select
              label='Select Gender'
              value={userInfo?.gender}
              onChange={val =>
                setUserInfo({
                  ...userInfo,
                  gender: val,
                })
              }
            >
              <Option selected value='male'>
                Male
              </Option>
              <Option value='female'>Female</Option>
            </Select>
          </div>
          <div className='w-full'>
            <Input
              label='PhoneNumber'
              value={userInfo?.phone}
              onChange={e =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
              color={colorTheme}
            />
          </div>
        </div>
        <Checkbox
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
          color={checkBoxColor}
          label={
            <Typography variant='small' color={checkBoxColor}>
              I agree the Terms and Conditions
            </Typography>
          }
          containerProps={{ className: '-ml-2.5' }}
        />
        <Button
          className='mt-4 text-lg font-normal bg-blue-800 hover:bg-blue-900 transition-all'
          fullWidth
          type='submit'
          disabled={loading}
        >
          {loading ? <Spinner color='amber' /> : 'Sign Up'}
        </Button>
        <Typography className='mt-4 text-center font-normal' color={colorTheme}>
          Already have an account?
          <Link
            to={'/login'}
            className='font-medium text-gray-900 dark:text-gray-300 hover:text-blue-700 text-lg ml-2 transition-all'
          >
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  )
}

export default SignUp
