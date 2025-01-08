import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

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
