import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useForm, Controller } from 'react-hook-form'

const CreateNewBoardModal = ({ open, handleClose, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm()

  const handleFormSubmit = (data) => {
    onSubmit(data)
    reset()
    handleClose()
  }

  const handleCloseModal = () => {
    reset()
    handleClose()
  }

  return (
    <Modal
      open={open}
      aria-labelledby='create-new-board-title'
      aria-describedby='create-new-board-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 300, sm: 500, md: 700 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3
        }}
      >
        <Typography
          id='create-new-board-title'
          variant='h6'
          component='h2'
          mb={2}
        >
          Create new board
        </Typography>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Board Title */}
          <Controller
            name='title'
            control={control}
            defaultValue=''
            rules={{
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Board title'
                fullWidth
                margin='normal'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          {/* Board Description */}
          <Controller
            name='description'
            control={control}
            defaultValue=''
            rules={{
              required: 'Description is required',
              minLength: {
                value: 3,
                message: 'Description must be at least 3 characters'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Board description'
                fullWidth
                margin='normal'
                multiline
                rows={3}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          {/* Board Type (Public / Private) */}
          <Controller
            name='type'
            control={control}
            defaultValue='public'
            render={({ field }) => (
              <FormControl component='fieldset' margin='normal'>
                <FormLabel component='legend'>Board Type</FormLabel>
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value='public'
                    control={<Radio />}
                    label='Public'
                  />
                  <FormControlLabel
                    value='private'
                    control={<Radio />}
                    label='Private'
                  />
                </RadioGroup>
              </FormControl>
            )}
          />

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              mt: 3
            }}
          >
            <Button type='submit' variant='contained' color='primary'>
              Create
            </Button>
            <Button onClick={handleCloseModal} variant='outlined' color='error'>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default CreateNewBoardModal
