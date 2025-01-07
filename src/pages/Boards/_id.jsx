import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import {
  moveCardDiffColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { cloneDeep } from 'lodash'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

function Board() {
  const board = useSelector(selectCurrentActiveBoard)
  const dispatch = useDispatch()

  useEffect(() => {
    const boardId = '677a3205bdf6fa77993473b2'
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch])

  const boardBarData = {
    title: board?.title,
    type: board?.type,
    description: board?.description
  }

  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((item) => item._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
  }

  const moveCardSameColumn = (orderCards, orderCardIds, columnId) => {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(
      (item) => item._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = orderCards
      columnToUpdate.cardOrderIds = orderCardIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: orderCardIds
    })
  }

  const moveCardDiffColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((item) => item._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    const orderedColumnsClone = cloneDeep(dndOrderedColumns)
    let prevCardOrderIds = orderedColumnsClone.find(
      (item) => item._id === prevColumnId
    )?.cardOrderIds
    if (prevCardOrderIds[0].includes('-placeholder-card')) prevCardOrderIds = []

    moveCardDiffColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(
        (item) => item._id === nextColumnId
      )?.cardOrderIds
    })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      {!board ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            width: '100%',
            height: (theme) =>
              `calc(${theme.trello.boardBarHeight} + ${theme.trello.boardContentHeight})`,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#2d3436' : '#015fdd'
          }}
        >
          <CircularProgress color='inherit' />
          <Typography>Loading board...</Typography>
        </Box>
      ) : (
        <Box>
          <BoardBar boadBarData={boardBarData} />
          <BoardContent
            board={board}
            moveColumn={moveColumn}
            moveCardSameColumn={moveCardSameColumn}
            moveCardDiffColumn={moveCardDiffColumn}
          />
        </Box>
      )}
    </Container>
  )
}

export default Board
