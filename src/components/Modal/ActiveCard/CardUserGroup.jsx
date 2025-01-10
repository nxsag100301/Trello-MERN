import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'

function CardUserGroup() {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined

  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  // Fake data
  const boardUsers = [
    { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'David', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Eve', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Frank', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'Grace', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 8, name: 'Hank', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 9, name: 'Ivy', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 10, name: 'Jack', avatar: 'https://i.pravatar.cc/150?img=10' }
  ]

  const limit = 8
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

export default CardUserGroup
