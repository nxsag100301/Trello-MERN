import { Navigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    return <Navigate to='/' replace={true} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f2f2f2',
        position: 'relative'
      }}
    >
      <Fade in={isLogin} timeout={300}>
        <div
          style={{ display: isLogin ? 'block' : 'none', position: 'absolute' }}
        >
          <LoginForm />
        </div>
      </Fade>
      <Fade in={isRegister} timeout={300}>
        <div
          style={{
            display: isRegister ? 'block' : 'none',
            position: 'absolute'
          }}
        >
          <RegisterForm />
        </div>
      </Fade>
    </Box>
  )
}

export default Auth
