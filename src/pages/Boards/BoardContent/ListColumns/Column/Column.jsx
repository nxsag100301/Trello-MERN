import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import Menu from '@mui/material/Menu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useConfirm } from 'material-ui-confirm'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { createNewCardAPI, deleteColumnAPI } from '~/apis'
import { cloneDeep } from 'lodash'

const Column = (props) => {
  const { column } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [openForm, setForm] = useState(false)
  const [cardTitle, setCardTitle] = useState('')
  const toggleOpenForm = () => setForm(!openForm)
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const addNewCard = async () => {
    if (!cardTitle) {
      toast.error('Invalid title!')
      return
    }
    const newCardData = {
      title: cardTitle,
      columnId: column._id
    }
    const res = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(
      (item) => item._id === newCardData.columnId
    )

    if (columnToUpdate) {
      if (columnToUpdate.cards.some((item) => item.FE_PlaceholderCard)) {
        columnToUpdate.cards = [res]
        columnToUpdate.cardOrderIds = [res._id]
      } else {
        columnToUpdate.cards.push(res)
        columnToUpdate.cardOrderIds.push(res._id)
      }
    }
    dispatch(updateCurrentActiveBoard(newBoard))

    toggleOpenForm()
    setCardTitle('')
  }

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const confirmDeleteColumn = useConfirm()
  const hanldeDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete column?',
      description:
        'This action will permanently delete your column and cards! Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      confirmationButtonProps: { color: 'error', variant: 'outlined' },
      cancellationButtonProps: { color: 'inherit' }
    })
      .then(async () => {
        const newBoard = cloneDeep(board)
        newBoard.columns = newBoard.columns.filter(
          (item) => item._id !== column._id
        )
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
          (item) => item !== column._id
        )
        dispatch(updateCurrentActiveBoard(newBoard))

        await deleteColumnAPI(column._id).then((res) => {
          toast.success(res?.deleteResult)
        })
      })
      .catch(() => {})
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyle = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : 1
  }

  const orderedCard = column.cards

  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#636e72' : '#dfe6e9',
          m: '0 8px',
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '1rem !important'
            }}
          >
            {column.title}
          </Typography>
          <Box>
            <Tooltip title='More options'>
              <ExpandMoreIcon
                sx={{
                  color: 'text.primary',
                  cursor: 'pointer'
                }}
                id='basic-column-dropdown'
                aria-controls={open ? 'basic-menu-column' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id='basic-menu-column'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem
                onClick={toggleOpenForm}
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-new-card-icon': { color: 'success.light' }
                  }
                }}
              >
                <ListItemIcon>
                  <AddCardIcon fontSize='small' className='add-new-card-icon' />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopyIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize='small' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPasteIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Patse</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={hanldeDeleteColumn}
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forever-icon': { color: 'warning.dark' }
                  }
                }}
              >
                <ListItemIcon>
                  <DeleteForeverIcon
                    fontSize='small'
                    className='delete-forever-icon'
                  />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <ListCards cards={orderedCard} />

        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 1.5
          }}
        >
          {!openForm ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button
                onClick={toggleOpenForm}
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? 'white' : '#1976d2'
                }}
                startIcon={<AddCardIcon />}
              >
                Add new card
              </Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              data-no-dnd='true'
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <TextField
                label='Enter card title'
                type='text'
                size='small'
                variant='outlined'
                autoFocus
                value={cardTitle}
                onChange={(event) => setCardTitle(event.target.value)}
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#333643' : 'white'
                  },
                  '& label.Mui-focused': {
                    color: (theme) => theme.palette.primary.main
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  boxShadow: 'none'
                }}
              >
                <Button
                  onClick={addNewCard}
                  variant='contained'
                  color='success'
                  size='small'
                  className='interceptor-loading'
                  sx={{
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.success.main
                    }
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  onClick={toggleOpenForm}
                  sx={{
                    fontSize: '16px',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? 'white' : '#333643',
                    cursor: 'pointer'
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column
