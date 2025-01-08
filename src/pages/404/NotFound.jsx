import { Container, Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoBackHome = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' // Dark space background
      }}
    >
      {/* Solar System Animation */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Sun */}
        <Box
          sx={{
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, #ffdd00, #ff9500)',
            borderRadius: '50%',
            position: 'relative',
            zIndex: 0,
            boxShadow: '0 0 30px 10px rgba(255, 149, 0, 0.7)'
          }}
        />
        {/* Orbit and Planets */}
        {Array.from({ length: 5 }, (_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              border: `1px dashed rgba(255, 255, 255, 0.2)`,
              borderRadius: '50%',
              animation: `orbit-${i} ${10 + i * 5}s linear infinite`
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: `${20 + i * 5}px`,
                height: `${20 + i * 5}px`,
                background: i % 2 === 0 ? '#4caf50' : '#f44336',
                borderRadius: '50%',
                top: '50%',
                left: '0%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Keyframes for Orbit Animation */}
      <style>
        {Array.from(
          { length: 5 },
          (_, i) => `
          @keyframes orbit-${i} {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `
        ).join('\n')}
      </style>

      {/* Main Content */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          color: '#fff',
          zIndex: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 2, zIndex: 2 }}>
          404 - Page Not Found
        </Typography>
        <Typography variant='body1' sx={{ mb: 4, zIndex: 2 }}>
          It seems you've ventured into deep space. Let us take you back home!
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={handleGoBackHome}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            padding: '10px 20px',
            borderRadius: '20px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          Go Back Home
        </Button>
      </Container>
    </Box>
  )
}

export default NotFound
