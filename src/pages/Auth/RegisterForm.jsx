import React from 'react'
import { useForm } from 'react-hook-form'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { Link, useNavigate } from 'react-router-dom'
import { registerUserAPI } from '~/apis'
import { toast } from 'react-toastify'

const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show)

  const submitRegister = (data) => {
    const { email, password } = data
    toast
      .promise(registerUserAPI({ email, password }), {
        pending: 'Registration is in progress...'
      })
      .then((user) => {
        navigate(`/login?registeredEmail=${user.email}`)
      })
  }

  return (
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
        Register
      </Typography>
      <Box
        component='span'
        sx={{ display: 'block', fontSize: '50px', marginBottom: '20px' }}
      >
        <AppRegistrationIcon fontSize='10px' />
      </Box>
      <form onSubmit={handleSubmit(submitRegister)}>
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
        <TextField
          label='Confirm Password'
          variant='standard'
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          margin='normal'
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match'
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle confirm password visibility'
                  onClick={handleClickShowConfirmPassword}
                  edge='end'
                  size='small'
                >
                  {showConfirmPassword ? (
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
          type='submit'
          variant='contained'
          fullWidth
          style={{
            marginTop: '20px',
            background: 'linear-gradient(to right, #00c6ff, #0072ff)'
          }}
        >
          REGISTER
        </Button>
      </form>
      <Typography variant='body2' style={{ marginTop: '20px' }}>
        Already have an account?{' '}
        <Link
          to='/login'
          style={{
            textDecoration: 'none',
            color: '#0072ff',
            fontWeight: 'bold',
            padding: '5px 10px',
            borderRadius: '5px',
            transition: '0.3s'
          }}
        >
          Login
        </Link>
      </Typography>
    </Container>
  )
}

export default RegisterForm
