import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'

function BoardUserGroup({ boardUsers = [], limit = 8 }) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined

  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  const totalUsers = boardUsers.length
  const displayedUsers = boardUsers.slice(0, limit)
  const hiddenUserCount = totalUsers - limit

  return (
    <>
      <Box sx={{ display: 'flex', gap: '2px' }}>
        {displayedUsers.map((user, index) => (
          <Tooltip title={user.name} key={user.id || index}>
            <Avatar
              sx={{ width: 30, height: 30, cursor: 'pointer' }}
              alt={user.name}
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
                width: 32,
                height: 32,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '50%',
                color: 'white',
                backgroundColor: '#a4b0be'
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
            <Tooltip title={user.name} key={user.id || index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt={user.name}
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
