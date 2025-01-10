import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import randomColor from 'randomcolor'
import AppBar from '~/components/AppBar/AppBar'
import Home from '@mui/icons-material/Home'
import Dashboard from '@mui/icons-material/Dashboard'
import LibraryBooks from '@mui/icons-material/LibraryBooks'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { useEffect, useState } from 'react'
import { createNewBoardAPI, fetchBoardsAPI } from '~/apis'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
import CreateNewBoardModal from './createBoardModal'

const Boards = () => {
  const location = useLocation()
  const [totalBoards, setTotalBoards] = useState(0)
  const [boards, setBoards] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  const navigate = useNavigate()

  const updateStateData = (res) => {
    setBoards(res.boards || [])
    setTotalBoards(res.totalBoards || 0)
  }

  useEffect(() => {
    fetchBoardsAPI(location.search).then(updateStateData)
  }, [location.search])

  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  const activePath = location.pathname
  const activeBoards = activePath === '/boards'

  const handleCreateBoard = (data) => {
    createNewBoardAPI(data).then(() => {
      fetchBoardsAPI(location.search).then(updateStateData)
    })
  }

  return (
    <Box>
      <AppBar />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box
          sx={{
            minWidth: { xs: '100%', sm: '250px' }, // Toàn chiều rộng trên màn hình nhỏ, 250px khi lớn hơn
            bgcolor: 'background.paper',
            p: 2,
            display: { xs: 'none', sm: 'block' } // Ẩn sidebar trên màn hình rất nhỏ
          }}
        >
          <Button
            sx={{
              color: activeBoards ? 'primary.dark' : 'inherit',
              bgcolor: activeBoards ? 'primary.contrastText' : 'inherit',
              width: '100%',
              py: 1,
              justifyContent: 'flex-start',
              pl: 2.5,
              fontWeight: '400',
              '&:hover': { bgcolor: '#c1dfef' }
            }}
            startIcon={<Dashboard />}
          >
            Boards
          </Button>
          <Button
            sx={{
              color: 'inherit',
              width: '100%',
              py: 1,
              justifyContent: 'flex-start',
              pl: 2.5,
              fontWeight: '400'
            }}
            startIcon={<LibraryBooks />}
          >
            Templates
          </Button>
          <Button
            sx={{
              color: 'inherit',
              width: '100%',
              py: 1,
              justifyContent: 'flex-start',
              pl: 2.5,
              fontWeight: '400'
            }}
            startIcon={<Home />}
          >
            Home
          </Button>
          <Divider />
          <Button
            onClick={handleOpenModal}
            sx={{
              color: 'inherit',
              width: '100%',
              py: 1,
              justifyContent: 'flex-start',
              pl: 2.5,
              fontWeight: '400'
            }}
            startIcon={<AddToPhotosIcon />}
          >
            Create a new board
          </Button>
          <CreateNewBoardModal
            open={isModalOpen}
            handleClose={handleCloseModal}
            onSubmit={handleCreateBoard}
          />
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 2 }}>
          {/* Kiểm tra nếu boards rỗng */}
          {boards.length === 0 ? (
            <Typography variant='h6' sx={{ textAlign: 'center', mt: 4 }}>
              No board
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {boards.map((board) => (
                <Grid item xs={5} sm={4} md={3} key={board._id}>
                  <Card
                    sx={{
                      maxWidth: '100%',
                      borderRadius: 2,
                      boxShadow: 2,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 5
                      }
                    }}
                  >
                    <CardActionArea>
                      {/* Background Color */}
                      <Box
                        sx={{
                          height: '50px', // Giảm chiều cao
                          backgroundColor: randomColor(),
                          borderRadius: '8px 8px 0 0'
                        }}
                      />
                      <CardContent sx={{ p: 2, maxHeight: '85px' }}>
                        {/* Title */}
                        <Typography
                          gutterBottom
                          variant='subtitle1' // Giảm kích thước chữ
                          component='div'
                          sx={{
                            fontWeight: 'bold',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {board.title}
                        </Typography>
                        {/* Description */}
                        <Typography
                          variant='body2'
                          sx={{
                            color: 'text.secondary',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {board.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions
                      sx={{
                        justifyContent: 'flex-end',
                        height: '20px',
                        m: '13px 0'
                      }}
                    >
                      <Button
                        onClick={() => navigate(`/boards/${board._id}`)}
                        size='small'
                        variant='outlined'
                        endIcon={<KeyboardDoubleArrowRightIcon />}
                      >
                        Go to board
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Pagination */}
      {boards.length > 0 && (
        <Pagination
          showFirstButton
          showLastButton
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            pr: 1
          }}
          page={page}
          count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/boards${
                item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`
              }`}
              {...item}
            />
          )}
        />
      )}
    </Box>
  )
}

export default Boards
