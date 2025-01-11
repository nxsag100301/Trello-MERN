import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch } from 'react-redux'
import {
  showModalActiveCard,
  updateCurrentActiveCard
} from '~/redux/activeCard/activeCardSlice'

const Card = (props) => {
  const dispatch = useDispatch()
  const { card } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitCardStyle = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    // border: isDragging ? '1px solid #054dc2' : 'none',
    boxShadow: isDragging ? '0 1px 1px rgba(0, 0, 0, 0.3)' : 'none'
  }

  const showCardAction = () => {
    return (
      !!card.memberIds?.length ||
      !!card.comments?.length ||
      !!card.attachments?.length
    )
  }

  const handleActiveCard = () => {
    dispatch(updateCurrentActiveCard(card))
    dispatch(showModalActiveCard(card))
  }

  return (
    <Box
      ref={setNodeRef}
      style={dndKitCardStyle}
      {...attributes}
      {...listeners}
    >
      <MuiCard
        onClick={handleActiveCard}
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: 'unset',
          display: card?.FE_PlaceholderCard ? 'none' : 'block',
          border: '1px solid transparent',
          '&:hover': { borderColor: (theme) => theme.palette.primary.main }
        }}
      >
        {card?.cover && (
          <CardMedia
            sx={{
              height: 140,
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px'
            }}
            image={card.cover}
          />
        )}

        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>{card.title}</Typography>
        </CardContent>

        {showCardAction() && (
          <CardActions sx={{ p: '0 4px 8px 4px' }}>
            {!!card.memberIds?.length && (
              <Button size='small' startIcon={<GroupIcon />}>
                {card.memberIds?.length}
              </Button>
            )}

            {!!card.comments?.length && (
              <Button size='small' startIcon={<CommentIcon />}>
                {card.comments?.length}
              </Button>
            )}
            {!!card.attachments?.length && (
              <Button size='small' startIcon={<AttachmentIcon />}>
                {card.attachments?.length}
              </Button>
            )}
          </CardActions>
        )}
      </MuiCard>
    </Box>
  )
}

export default Card
