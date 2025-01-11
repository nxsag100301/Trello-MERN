import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import Badge from '@mui/material/Badge'
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from '@mui/icons-material/Add'
import { useSelector } from 'react-redux'
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { CARD_MEMBER_ACTIONS } from '~/utils/constants'

function CardUserGroup({ cardMemberIds = [], onUpdateCardMembers }) {
  const board = useSelector(selectCurrentActiveBoard)
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined

  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  const FE_CardMembers = cardMemberIds.map((id) => {
    return board.FE_allUsers.find((u) => u._id === id)
  })

  const handleUpdateCardMembers = (user) => {
    const incomingMemberInfo = {
      userId: user._id,
      action: cardMemberIds.includes(user._id)
        ? CARD_MEMBER_ACTIONS.REMOVE
        : CARD_MEMBER_ACTIONS.ADD
    }
    onUpdateCardMembers(incomingMemberInfo)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '2px'
        }}
      >
        {FE_CardMembers?.map((user) => (
          <Tooltip title={user?.displayName} key={user?._id}>
            <Avatar
              sx={{ width: 32, height: 32, cursor: 'pointer' }}
              alt={user?.displayName}
              src={user?.avatar}
            />
          </Tooltip>
        ))}

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
            <AddIcon />
          </Box>
        </Tooltip>
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
          {board?.FE_allUsers?.map((user) => (
            <Tooltip title={user.displayName} key={user._id}>
              <Badge
                sx={{ cursor: 'pointer' }}
                color='success'
                overlap='rectangular'
                badgeContent={
                  cardMemberIds.includes(user._id) ? (
                    <CheckIcon sx={{ fontSize: 'small' }} />
                  ) : null
                }
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                onClick={() => handleUpdateCardMembers(user)}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt={user.displayName}
                  src={user.avatar}
                />
              </Badge>
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </>
  )
}

export default CardUserGroup
