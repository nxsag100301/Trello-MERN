import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import PasswordIcon from '@mui/icons-material/Password'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentUser,
  userLogOutAPI,
  userUpdateAPI
} from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'

const SecurityTab = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const confirmChangePassword = useConfirm()

  const onSubmit = (data) => {
    confirmChangePassword({
      title: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LogoutIcon sx={{ color: 'warning.dark' }} />
          Change Password
        </Box>
      ),
      description:
        'You have to login again after successfully changing your password. Continue?',
      confirmationText: 'Log out',
      cancellationText: 'Cancel',
      confirmationButtonProps: { color: 'error', variant: 'outlined' },
      cancellationButtonProps: { color: 'inherit' }
    }).then(() => {
      const { currentPassword, newPassword } = data
      toast
        .promise(dispatch(userUpdateAPI({ currentPassword, newPassword })), {
          pending: 'Changing...'
        })
        .then((res) => {
          if (!res.error) {
            toast.success('Change password successfully! Please login!')
            dispatch(userLogOutAPI(false))
          }
        })
    })

    // Handle form submission logic here
  }

  return (
    <Container maxWidth='xs'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' flexDirection='column' alignItems='center' mt={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Avatar
              src={currentUser?.avatar}
              sx={{ width: 80, height: 80, mb: 2 }}
            />
            <Box>
              <Typography variant='h5' gutterBottom>
                {currentUser?.displayName}
              </Typography>
              <Typography
                variant='subtitle1'
                color='textSecondary'
                gutterBottom
              >
                @{currentUser?.username}
              </Typography>
            </Box>
          </Box>
          <TextField
            label='Current password'
            type={showPassword.current ? 'text' : 'password'}
            fullWidth
            margin='normal'
            {...register('currentPassword', {
              required: 'Current password is required',
              pattern: {
                value: PASSWORD_RULE,
                message: PASSWORD_RULE_MESSAGE
              }
            })}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PasswordIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPassword.current ? (
                      <Visibility fontSize='small' />
                    ) : (
                      <VisibilityOff fontSize='small' />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label='New password'
            type={showPassword.new ? 'text' : 'password'}
            fullWidth
            margin='normal'
            {...register('newPassword', {
              required: 'New password is required',
              pattern: {
                value: PASSWORD_RULE,
                message: PASSWORD_RULE_MESSAGE
              }
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => togglePasswordVisibility('new')}>
                    {showPassword.new ? (
                      <Visibility fontSize='small' />
                    ) : (
                      <VisibilityOff fontSize='small' />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label='Confirm new password'
            type={showPassword.confirm ? 'text' : 'password'}
            fullWidth
            margin='normal'
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === watch('newPassword') || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PublishedWithChangesIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPassword.confirm ? (
                      <Visibility fontSize='small' />
                    ) : (
                      <VisibilityOff fontSize='small' />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            Change
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default SecurityTab
