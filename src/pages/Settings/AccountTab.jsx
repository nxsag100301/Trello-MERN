import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CloudUpload from '@mui/icons-material/CloudUpload'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import EmailIcon from '@mui/icons-material/Email'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import FaceIcon from '@mui/icons-material/Face'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, userUpdateAPI } from '~/redux/user/userSlice'
import { styled } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { singleFileValidator } from '~/utils/validators'

const VisuallyHiddenInput = styled('input')({
  display: 'none'
  // clip: 'rect(0 0 0 0)',
  // clipPath: 'inset(50%)',
  // height: 1,
  // overflow: 'hidden',
  // position: 'absolute',
  // bottom: 0,
  // left: 0,
  // whiteSpace: 'nowrap',
  // width: 1
})

const AccountTab = () => {
  const currentUser = useSelector(selectCurrentUser)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const dispatch = useDispatch()

  const handleImageUpload = (event) => {
    // Lấy file thông qua e.target?.files[0] và validate nó trước khi xử lý
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
    let reqData = new FormData()
    reqData.append('avatar', event.target?.files[0])
    // Cách để log được dữ liệu thông qua FormData
    // console.log('reqData: ', reqData)
    // for (const value of reqData.values()) {
    //   console.log('reqData Value: ', value)
    // }

    // Gọi API...
    toast
      .promise(dispatch(userUpdateAPI(reqData)), {
        pending: 'Uploading...'
      })
      .then((res) => {
        if (!res.error) {
          toast.success('Update avatar successfully!')
        }
        event.target.value = ''
      })
  }

  const onSubmit = (data) => {
    // const updatedData = {
    //   displayName: data.displayName,
    //   avatar: userAvatar
    // }
    if (currentUser?.displayName === data.displayName) return
    toast
      .promise(dispatch(userUpdateAPI({ displayName: data.displayName })), {
        pending: 'Updating...'
      })
      .then((res) => {
        if (!res.error) {
          toast.success('Update successfully!')
        }
      })
  }

  return (
    <Container maxWidth='xs'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' flexDirection='column' alignItems='center' mt={1}>
          <Avatar
            src={currentUser?.avatar}
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography variant='h5' gutterBottom>
            {currentUser.displayName}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary' gutterBottom>
            @{currentUser.username}
          </Typography>
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            Upload avatar
            <VisuallyHiddenInput
              type='file'
              onChange={handleImageUpload}
              multiple
            />
          </Button>
          {errors.profileImage && (
            <Typography variant='body2' color='error'>
              {errors.profileImage.message}
            </Typography>
          )}
          <TextField
            label='Your Email'
            defaultValue={currentUser.email}
            fullWidth
            margin='normal'
            disabled
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position='start'>
                  <EmailIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
            label='Your Username'
            defaultValue={currentUser.username}
            fullWidth
            margin='normal'
            disabled
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountBoxIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
            label='Your Display Name'
            defaultValue={currentUser.displayName}
            fullWidth
            margin='normal'
            {...register('displayName', {
              required: 'Display name is required',
              minLength: {
                value: 3,
                message: 'Display name must be at least 3 characters'
              }
            })}
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <FaceIcon />
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
            Update
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default AccountTab
