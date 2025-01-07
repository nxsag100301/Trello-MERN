import { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import Button from '@mui/material/Button'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

const ListColumns = (props) => {
  const { columns, createNewColumn, createNewCard, deleteColumn } = props
  const [openForm, setForm] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')
  const toggleOpenForm = () => setForm(!openForm)

  const addNewColumn = () => {
    if (!columnTitle) {
      toast.error('Invalid title!')
      return
    }
    createNewColumn(columnTitle)
    toggleOpenForm()
    setColumnTitle('')
  }

  const items = columns?.map((item) => {
    return item._id
  })

  return (
    <SortableContext items={items} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { m: 1 }
        }}
      >
        {columns?.length > 0 &&
          columns.map((item) => (
            <Column
              column={item}
              key={item._id}
              createNewCard={createNewCard}
              deleteColumn={deleteColumn}
            />
          ))}

        {/* Add new column */}
        {!openForm ? (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}
          >
            <Button
              sx={{
                color: 'white',
                width: '100%',
                py: 1,
                justifyContent: 'flex-start',
                pl: 2.5
              }}
              startIcon={<PlaylistAddIcon />}
              onClick={toggleOpenForm}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 1,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label='Enter column title'
              type='text'
              size='small'
              variant='outlined'
              autoFocus
              value={columnTitle}
              onChange={(event) => setColumnTitle(event.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <CloseIcon
                      onClick={() => setColumnTitle('')}
                      sx={{
                        fontSize: '15px',
                        color: columnTitle ? 'white' : 'transparent',
                        cursor: columnTitle ? 'pointer' : ''
                      }}
                    />
                  </InputAdornment>
                )
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
                onClick={addNewColumn}
                variant='contained'
                color='success'
                size='small'
                sx={{
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                onClick={toggleOpenForm}
                sx={{
                  fontSize: '16px',
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { fontSize: '18px' }
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
