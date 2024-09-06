import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from '@material-tailwind/react'
import { useAuth } from '../../context/Auth/AuthContext'

const LogIn = ({ theme }) => {
  // states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  //   other variables  && hooks
  // eslint-disable-next-line no-useless-escape
  const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const userInfo = { email, password }
  const navigate = useNavigate()
  const colorTheme = `${theme == 'dark' ? 'white' : 'blue-gray'}`
  const { login } = useAuth()
  // submit function
  const submitHandler = e => {
    e.preventDefault()
    setErrorEmail(false)
    setErrorPassword(false)
    setErrorMsg('')
    if (!regexp.test(email)) {
      setErrorEmail(true)
    } else if (password.length < 6) {
      setErrorPassword(true)
    } else {
      setLoading(true)
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, userInfo)
        .then(res => {
          navigate('/')

          console.log(res)
          const dataToken = res.data
          if (!res) {
            setErrorMsg('incorrect token')
            return
          }
          login(dataToken)
        })
        .catch(err => {
          setErrorMsg(err.response.data)
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
      <Typography variant='h4'>Sign In</Typography>
      <Typography color={'gray'} className='mt-1 font-normal'>
        Nice to meet you! Enter your details to log in.
      </Typography>
      <form
        className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
        onSubmit={submitHandler}
      >
        <div>
          <h3 className='text-center text-red-900'>{errorMsg}</h3>
        </div>
        <div className='mb-1 flex flex-col gap-6'>
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
          <Input
            label='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={errorPassword}
            type='password'
            color={colorTheme}
          />
        </div>

        <Button
          className='mt-4 text-lg font-normal'
          fullWidth
          type='submit'
          disabled={loading}
          color={'indigo'}
        >
          {loading ? <Spinner color='amber' /> : 'Sign In'}
        </Button>
        <Typography className='mt-4 text-center font-normal' color={colorTheme}>
          Don&apos;t have an account?
          <Link
            to={'/signup'}
            className='font-medium text-gray-900 dark:text-gray-300 hover:text-blue-700 text-lg ml-2 transition-all'
          >
            Sign Up
          </Link>
        </Typography>
      </form>
    </Card>
  )
}

export default LogIn
