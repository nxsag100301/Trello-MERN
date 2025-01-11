import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/utils/validators'
import { inviteUserToBoardAPI } from '~/apis'
import { socketIoInstance } from '~/socket'

const InviteBoardUser = ({ boardId }) => {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'invite-board-user-popover' : undefined

  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const submitInviteUserToBoard = (data) => {
    const { inviteeEmail } = data
    inviteUserToBoardAPI({ inviteeEmail, boardId }).then((invitation) => {
      setValue('inviteeEmail', '')
      setAnchorPopoverElement(null)
      socketIoInstance.emit('FE_USER_INVITED_TO_BOARD', invitation)
    })
  }

  return (
    <Box>
      <Tooltip title='Invite user to this board!'>
        <Button
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>
      </Tooltip>
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <form onSubmit={handleSubmit(submitInviteUserToBoard)}>
            <Typography variant='subtitle1'>
              Invite user to this board
            </Typography>
            <TextField
              fullWidth
              label='Enter email to invite'
              variant='outlined'
              {...register('inviteeEmail', {
                required: 'Email is required!',
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              })}
              error={!!errors.inviteeEmail}
              helperText={errors.inviteeEmail?.message}
              sx={{ mb: 2, mt: 1 }}
            />
            <Button
              type='submit'
              variant='contained'
              sx={{
                bgcolor: 'primary.dark',
                color: 'white'
              }}
            >
              Invite
            </Button>
          </form>
        </Box>
      </Popover>
    </Box>
  )
}

export default InviteBoardUser
