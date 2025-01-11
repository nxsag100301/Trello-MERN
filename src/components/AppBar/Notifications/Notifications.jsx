import { useEffect, useState } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNotification,
  fetchInvitationsAPI,
  selectCurrentNotifications,
  updateBoardInvitationAPI
} from '~/redux/notifications/notificationsSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { socketIoInstance } from '~/socket'

const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

const Notifications = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const [anchorEl, setAnchorEl] = useState(null)
  const [newNotification, setNewNotification] = useState(false)
  const notifications = useSelector(selectCurrentNotifications)

  useEffect(() => {
    dispatch(fetchInvitationsAPI())
    // Tạo 1 function xử lý khi nhận được sự kiện real-time
    const onReceiveNewInvitation = (invitation) => {
      if (invitation.inviteeId === currentUser._id) {
        dispatch(addNotification(invitation))
        // Hiển thị trạng thái thông báo đến
        setNewNotification(true)
      }
    }
    // Nghe sự kiện real-time có tên: BE_USER_INVITED_TO_BOARD từ BE gửi lên
    socketIoInstance.on('BE_USER_INVITED_TO_BOARD', onReceiveNewInvitation)
    return () => {
      socketIoInstance.off()
    }
  }, [dispatch, currentUser._id])

  const open = Boolean(anchorEl)

  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
    setNewNotification(false)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const updateBoardInvitation = (invitationId, status) => {
    dispatch(updateBoardInvitationAPI({ invitationId, status })).then((res) => {
      if (
        res?.payload?.boardInvitation?.status ===
        BOARD_INVITATION_STATUS.ACCEPTED
      ) {
        navigate(`/boards/${res?.payload?.boardInvitation?.boardId}`)
      }
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      <Tooltip title='Notifications'>
        <Badge
          color='warning'
          variant={newNotification ? 'dot' : 'none'}
          sx={{ cursor: 'pointer' }}
          id='basic-button-open-notification'
          aria-controls={open ? 'basic-menu-open-notification' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon
            sx={{
              color: newNotification ? 'yellow' : 'white'
            }}
          />
        </Badge>
      </Tooltip>
      <Menu
        sx={{ mt: 2 }}
        id='basic-notification-drop-down'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {!notifications || notifications.length === 0 ? (
          <MenuItem sx={{ minWidth: 200 }}>
            You do not have any new notifications.
          </MenuItem>
        ) : (
          notifications?.map((notification, index) => (
            <Box key={notification._id}>
              <MenuItem
                sx={{
                  minWidth: { xs: '180px', sm: '200px' },
                  maxWidth: { xs: '300px', sm: '360px' },
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 1,
                    wordBreak: 'break-word'
                  }}
                >
                  <GroupAddIcon fontSize='small' />
                  <Typography
                    sx={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      whiteSpace: 'normal'
                    }}
                  >
                    <b>{notification?.inviter?.displayName}</b> invited you to
                    join the board
                    <b> {notification?.board?.title}</b>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: { xs: '100%', sm: '308px' },
                    my: 0.5
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{ fontSize: { xs: '12px', sm: '13px' }, color: 'gray' }}
                  >
                    {moment(notification.createdAt).format('llll')}
                  </Typography>
                  {notification?.boardInvitation?.status ===
                  BOARD_INVITATION_STATUS.PENDING ? (
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        gap: 1,
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Button
                        variant='contained'
                        color='success'
                        size='small'
                        onClick={() =>
                          updateBoardInvitation(
                            notification._id,
                            BOARD_INVITATION_STATUS.ACCEPTED
                          )
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        variant='outlined'
                        color='error'
                        size='small'
                        onClick={() =>
                          updateBoardInvitation(
                            notification._id,
                            BOARD_INVITATION_STATUS.REJECTED
                          )
                        }
                      >
                        Reject
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        gap: 1,
                        justifyContent: 'flex-end'
                      }}
                    >
                      {notification?.boardInvitation?.status ===
                      BOARD_INVITATION_STATUS.ACCEPTED ? (
                        <Chip
                          icon={<DoneIcon />}
                          label='Accepted'
                          color='success'
                          size='small'
                        />
                      ) : (
                        <Chip
                          icon={<NotInterestedIcon />}
                          label='Rejected'
                          size='small'
                        />
                      )}
                    </Box>
                  )}
                </Box>
              </MenuItem>

              {index !== notifications.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </Menu>
    </Box>
  )
}

export default Notifications
