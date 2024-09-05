/* eslint-disable no-useless-escape */
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from '@material-tailwind/react'
import HelperText from '../../components/user/HelperText'
import { useAuth } from '../../context/Auth/AuthContext'

const SignUp = ({ theme }) => {
  // states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorName, setErrorName] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [checkBoxColor, setCheckBoxColor] = useState('gray')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  //   other variables && hooks
  const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const userInfo = { name, email, password }
  const navigate = useNavigate()
  const colorTheme = `${theme == 'dark' ? 'white' : 'blue-gray'}`
  const { login } = useAuth()
  // submit function
  const submitHandler = e => {
    e.preventDefault()

    setErrorName(false)
    setErrorEmail(false)
    setErrorPassword(false)
    setCheckBoxColor('gray')
    setErrorMsg('')
    if (name.length < 3) {
      setErrorName(true)
    } else if (!regexp.test(email)) {
      setErrorEmail(true)
    } else if (password.length < 6) {
      setErrorPassword(true)
    } else if (!isChecked) {
      setCheckBoxColor('red')
    } else {
      setLoading(true)
      axios
        .post('https://form-project-backend.vercel.app/user/register', userInfo)
        .then(res => {
          toast.success('You Successfully Registered')
          setTimeout(() => {
            navigate('/')
          }, 5000)

          console.log(res)
          const token = res.data
          if (!res) {
            setErrorMsg('incorrect token')
            return
          }
          login(email, token)
        })
        .catch(err => {
          setErrorMsg(err.code)
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <Card
      color='transparent'
      shadow={false}
      className='flex items-center mt-4 text-black dark:text-white'
    >
      <ToastContainer />
      <Typography variant='h4'>Sign Up</Typography>
      <Typography color={'gray'} className='mt-1 font-normal'>
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
        onSubmit={submitHandler}
      >
        <div>
          <h3 className='text-center text-red-900'>{errorMsg}</h3>
        </div>
        <div className='mb-1 flex flex-col gap-6'>
          <div>
            <Input
              label='Username'
              value={name}
              onChange={e => setName(e.target.value)}
              error={errorName}
              color={colorTheme}
            />
            <HelperText text='user name must be 3 characters at least' />
          </div>
          <div>
            <Input
              label='Email'
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                setErrorMsg('')
              }}
              error={errorEmail}
              color={colorTheme}
            />
            <HelperText text='email must contain @ ' />
          </div>
          <div>
            <Input
              label='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={errorPassword}
              type='password'
              color={colorTheme}
            />
            <HelperText text='password must be more than 5 characters' />
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
          className='mt-4 text-lg font-normal'
          fullWidth
          type='submit'
          disabled={loading}
          color={'teal'}
        >
          {loading ? <Spinner color='amber' /> : 'Sign Up'}
        </Button>
        <Typography className='mt-4 text-center font-normal' color={colorTheme}>
          Already have an account?
          <Link
            to={'/login'}
            className='font-medium text-gray-900 dark:text-gray-300 hover:text-teal-700 text-lg ml-2 transition-all'
          >
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  )
}

export default SignUp
