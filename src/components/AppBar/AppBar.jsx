import SelectDarkLight from '~/components/SelectDarkLight/SelectDarkLight'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '~/assets/svg/trello.svg'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Tooltip from '@mui/material/Tooltip'
import Profile from './Menus/Profile'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { useNavigate } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

function AppBar() {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#1c2223' : '#054dc2'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Tooltip title='List boards'>
          <AppsIcon
            onClick={() => navigate('/boards')}
            sx={{ color: 'white', cursor: 'pointer' }}
          />
        </Tooltip>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer'
            }}
          >
            <img src={TrelloIcon} style={{ width: '21px', height: '21px' }} />
            <Typography
              sx={{
                fontSize: '1.2rem',
                fontWeight: '500',
                color: 'white'
              }}
            >
              Trello
            </Typography>
          </Box>
          <Box
            sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, marginLeft: 2 }}
          >
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button
              sx={{
                color: 'white'
              }}
              startIcon={<AddToPhotosIcon />}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Searchboard */}
        <AutoCompleteSearchBoard />

        <SelectDarkLight />

        <Notifications />

        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
