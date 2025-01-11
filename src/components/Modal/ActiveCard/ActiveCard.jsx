import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import CardUserGroup from './CardUserGroup'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CardActivitySection from './CardActivitySection'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCurrentActiveCard,
  selectCurrentActiveCard,
  selectIsShowModalActiveCard,
  updateCurrentActiveCard
} from '~/redux/activeCard/activeCardSlice'
import { updateCardDetailsAPI } from '~/apis'
import { updateCardInBoard } from '~/redux/activeBoard/activeBoardSlice'
import { toast } from 'react-toastify'
import { singleFileValidator } from '~/utils/validators'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { CARD_MEMBER_ACTIONS } from '~/utils/constants'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  color: theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
  backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
  padding: '10px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    '&.active': {
      color: theme.palette.mode === 'dark' ? '#00000de' : '#0c66e4',
      backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
    }
  }
}))

function ActiveCard() {
  const dispatch = useDispatch()
  const activeCard = useSelector(selectCurrentActiveCard)
  const currentUser = useSelector(selectCurrentUser)
  const isShowActiveCard = useSelector(selectIsShowModalActiveCard)
  const handleCloseModal = () => {
    dispatch(clearCurrentActiveCard())
  }

  const callApiUpdateCard = async (updateData) => {
    const updatedCard = await updateCardDetailsAPI(activeCard._id, updateData)
    dispatch(updateCurrentActiveCard(updatedCard))
    dispatch(updateCardInBoard(updatedCard))
    return updatedCard
  }

  const onUpdateCardTitle = (newTitle) => {
    callApiUpdateCard({ title: newTitle.trim() })
  }

  const onUploadCardCover = (event) => {
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cardCover', event.target?.files[0])

    toast.promise(
      callApiUpdateCard(reqData).finally(() => (event.target.value = '')),
      { pending: 'Uploading...' }
    )
  }

  const onUpdateCardDescription = (newDescription) => {
    callApiUpdateCard({ description: newDescription })
  }

  const onAddCardComment = async (commentToAdd) => {
    await callApiUpdateCard({ commentToAdd })
  }

  const onUpdateCardMembers = (incomingMemberInfo) => {
    callApiUpdateCard({ incomingMemberInfo })
  }

  return (
    <Modal
      onClose={handleCloseModal}
      sx={{ overflowY: 'auto' }}
      disableScrollLock
      open={isShowActiveCard}
    >
      <Box
        sx={{
          position: 'relative',
          width: 800,
          maxWidth: 800,
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: '8px',
          padding: '40px 20px 20px',
          margin: '50px auto',
          outline: 'none',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
        }}
      >
        {/* Close Icon */}
        <Box
          sx={{
            position: 'absolute',
            top: '12px',
            right: '10px',
            cursor: 'pointer'
          }}
        >
          <CancelIcon
            color='error'
            sx={{ '&:hover': { color: 'error.light' } }}
            onClick={handleCloseModal}
          />
        </Box>

        {/* Card Cover */}
        {activeCard?.cover && (
          <Box sx={{ mb: 4 }}>
            <img
              style={{
                width: '100%',
                height: '300px',
                borderRadius: '6px',
                objectFit: 'cover'
              }}
              src={activeCard.cover}
              alt='card-cover'
            />
          </Box>
        )}

        {/* Card Title */}
        <Box
          sx={{
            mb: 1,
            mt: -3,
            pr: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <CreditCardIcon />
          <ToggleFocusInput
            inputFontSize='22px'
            value={activeCard?.title}
            onChangedValue={onUpdateCardTitle}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Left Side */}
          <Grid item xs={12} sm={9} sx={{ pr: 1 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
              >
                Members
              </Typography>
              <CardUserGroup
                cardMemberIds={activeCard?.memberIds}
                onUpdateCardMembers={onUpdateCardMembers}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SubjectRoundedIcon />
                <Typography
                  variant='span'
                  sx={{ fontWeight: '600', fontSize: '20px' }}
                >
                  Description
                </Typography>
              </Box>
              <CardDescriptionMdEditor
                cardDescriptionProp={activeCard?.description}
                handleUpdateCardDescription={onUpdateCardDescription}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DvrOutlinedIcon />
                <Typography
                  variant='span'
                  sx={{ fontWeight: '600', fontSize: '20px' }}
                >
                  Activity
                </Typography>
              </Box>
              <CardActivitySection
                cardComments={activeCard?.comments}
                onAddCardComment={onAddCardComment}
              />
            </Box>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} sm={3}>
            <Typography
              sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
            >
              Add To Card
            </Typography>
            <Stack direction='column' spacing={1}>
              {!activeCard?.memberIds?.includes(currentUser._id) ? (
                <SidebarItem
                  onClick={() =>
                    onUpdateCardMembers({
                      userId: currentUser._id,
                      action: CARD_MEMBER_ACTIONS.ADD
                    })
                  }
                  className='active'
                >
                  <PersonAddAltOutlinedIcon fontSize='small' />
                  Join
                </SidebarItem>
              ) : (
                <SidebarItem
                  onClick={() =>
                    onUpdateCardMembers({
                      userId: currentUser._id,
                      action: CARD_MEMBER_ACTIONS.REMOVE
                    })
                  }
                  className='active'
                >
                  <PersonRemoveOutlinedIcon fontSize='small' />
                  Leave
                </SidebarItem>
              )}

              <SidebarItem className='active' component='label'>
                <ImageOutlinedIcon fontSize='small' />
                Cover
                <input
                  type='file'
                  style={{ display: 'none' }}
                  onChange={onUploadCardCover}
                />
              </SidebarItem>
              <SidebarItem>
                <AttachFileOutlinedIcon fontSize='small' />
                Attachment
              </SidebarItem>
              <SidebarItem>
                <LocalOfferOutlinedIcon fontSize='small' />
                Labels
              </SidebarItem>
              <SidebarItem>
                <TaskAltOutlinedIcon fontSize='small' />
                Checklist
              </SidebarItem>
              <SidebarItem>
                <WatchLaterOutlinedIcon fontSize='small' />
                Dates
              </SidebarItem>
              <SidebarItem>
                <AutoFixHighOutlinedIcon fontSize='small' />
                Custom Fields
              </SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
            >
              Power-Ups
            </Typography>
            <Stack direction='column' spacing={1}>
              <SidebarItem>
                <AspectRatioOutlinedIcon fontSize='small' />
                Card Size
              </SidebarItem>
              <SidebarItem>
                <AddToDriveIcon fontSize='small' />
                Google Drive
              </SidebarItem>
              <SidebarItem>
                <AddOutlinedIcon fontSize='small' />
                Add Power-Ups
              </SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
            >
              Actions
            </Typography>
            <Stack direction='column' spacing={1}>
              <SidebarItem>
                <ArrowForwardOutlinedIcon fontSize='small' />
                Move
              </SidebarItem>
              <SidebarItem>
                <ContentCopyOutlinedIcon fontSize='small' />
                Copy
              </SidebarItem>
              <SidebarItem>
                <AutoAwesomeOutlinedIcon fontSize='small' />
                Make Template
              </SidebarItem>
              <SidebarItem>
                <ArchiveOutlinedIcon fontSize='small' />
                Archive
              </SidebarItem>
              <SidebarItem>
                <ShareOutlinedIcon fontSize='small' />
                Share
              </SidebarItem>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ActiveCard
