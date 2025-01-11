import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'

function BoardUserGroup({ boardUsers = [], limit = 4 }) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined

  const handleTogglePopover = (event) => {
    setAnchorPopoverElement((prev) => (prev ? null : event.currentTarget))
  }

  const totalUsers = boardUsers.length
  const displayedUsers = boardUsers.slice(0, limit)
  const hiddenUserCount = totalUsers - limit

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px', // Khoảng cách khi không đè
          position: 'relative'
        }}
      >
        {displayedUsers.map((user, index) => (
          <Tooltip title={user.displayName} key={user.id || index}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
                cursor: 'pointer',
                position: 'relative',
                marginLeft: index > 0 ? '-15px' : 0,
                zIndex: displayedUsers.length - index
              }}
              alt={user.displayName}
              src={user.avatar}
            />
          </Tooltip>
        ))}

        {hiddenUserCount > 0 && (
          <Tooltip title='Show more'>
            <Box
              aria-describedby={popoverId}
              onClick={handleTogglePopover}
              sx={{
                width: 30,
                height: 30,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '50%',
                color: 'white',
                backgroundColor: '#a4b0be',
                marginLeft: '-15px',
                zIndex: 0
              }}
            >
              +{hiddenUserCount}
            </Box>
          </Tooltip>
        )}
      </Box>

      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box
          sx={{
            p: 2,
            maxWidth: '235px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          {boardUsers.map((user, index) => (
            <Tooltip title={user.displayName} key={user.id || index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt={user.displayName}
                src={user.avatar}
              />
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </>
  )
}

export default BoardUserGroup
