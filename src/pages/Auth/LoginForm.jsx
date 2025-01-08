import React from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoginIcon from '@mui/icons-material/Login'
import Alert from '@mui/material/Alert'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { useDispatch } from 'react-redux'
import { userLoginAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [searchParams] = useSearchParams()
  const verifiedEmail = searchParams.get('verifiedEmail')
  const registeredEmail = searchParams.get('registeredEmail')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const submitLogIn = (data) => {
    const { email, password } = data
    toast
      .promise(dispatch(userLoginAPI({ email, password })), {
        pending: 'Logging in...'
      })
      .then((res) => {
        console.log(res)
        if (!res.error) navigate('/')
      })
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
      <Container
        maxWidth='xs'
        style={{
          textAlign: 'center',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '7px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography variant='h5' gutterBottom sx={{ fontWeight: '500' }}>
          Login
        </Typography>
        <Box component='span' sx={{ display: 'block', fontSize: '50px' }}>
          <LoginIcon fontSize='2px' />
        </Box>
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          {verifiedEmail && (
            <Alert
              severity='success'
              sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
            >
              <Typography variant='span'>
                Your email <b>{verifiedEmail}</b> has been verified.
              </Typography>
              <br />
              Now you can login to enjoy our services! Have a good day!
            </Alert>
          )}
          {registeredEmail && (
            <Alert
              severity='info'
              sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
            >
              <Typography variant='span'>
                An email has been sent to <b>{registeredEmail}</b>
              </Typography>
              <br />
              Please check and verify your account before logging in!
            </Alert>
          )}
        </Box>
        <TextField
          label='Email'
          variant='standard'
          fullWidth
          margin='normal'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: EMAIL_RULE,
              message: EMAIL_RULE_MESSAGE
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label='Password'
          variant='standard'
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin='normal'
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: PASSWORD_RULE,
              message: PASSWORD_RULE_MESSAGE
            }
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  edge='end'
                  size='small'
                >
                  {showPassword ? (
                    <VisibilityOff fontSize='small' />
                  ) : (
                    <Visibility fontSize='small' />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          className='interceptor-loading'
          variant='contained'
          fullWidth
          type='submit'
          style={{
            marginTop: '20px',
            background: 'linear-gradient(to right, #00c6ff, #0072ff)'
          }}
        >
          LOGIN
        </Button>
        <Typography variant='body2' style={{ marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link
            to='/register'
            style={{
              textDecoration: 'none',
              color: '#0072ff',
              fontWeight: 'bold',
              padding: '5px 10px',
              borderRadius: '5px',
              transition: '0.3s'
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Container>
    </form>
  )
}

export default LoginForm
