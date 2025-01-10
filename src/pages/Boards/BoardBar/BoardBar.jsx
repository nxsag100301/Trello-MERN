import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatter'
import BoardUserGroup from './BoadUserGroup'

const CHIP_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '6px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar(props) {
  const { boadBarData } = props
  const fakeBoardUsers = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${index + 1}` // Fake avatar
  }))
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#2d3436' : '#015fdd'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={boadBarData?.description}>
          <Chip
            sx={CHIP_STYLES}
            icon={<DashboardIcon />}
            label={boadBarData?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={CHIP_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(boadBarData?.type)}
          clickable
        />
        <Chip
          sx={CHIP_STYLES}
          icon={<AddToDriveIcon />}
          label='Add To Google Drive'
          clickable
        />
        <Chip
          sx={CHIP_STYLES}
          icon={<BoltIcon />}
          label='Automation'
          clickable
        />
        <Chip
          sx={CHIP_STYLES}
          icon={<FilterListIcon />}
          label='Filters'
          clickable
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <Box>
          <BoardUserGroup boardUsers={fakeBoardUsers} limit={4} />
        </Box>
      </Box>
    </Box>
  )
}

export default BoardBar
