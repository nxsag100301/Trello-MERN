import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  deleteColumnAPI,
  fetchBoardDetailsAPI,
  moveCardDiffColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sort'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '677a3205bdf6fa77993473b2'
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach((item) => {
        if (isEmpty(item.cards)) {
          item.cards = [generatePlaceholderCard(item)]
          item.cardOrderIds = [generatePlaceholderCard(item)._id]
        } else {
          item.cards = mapOrder(item.cards, item.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  const boardBarData = {
    title: board?.title,
    type: board?.type,
    description: board?.description
  }

  const createNewColumn = async (columnTitle) => {
    const res = await createNewColumnAPI({
      title: columnTitle,
      boardId: board._id
    })

    res.cards = [generatePlaceholderCard(res)]
    res.cardOrderIds = [generatePlaceholderCard(res._id)]

    const newBoard = { ...board }
    newBoard.columns.push(res)
    newBoard.columnOrderIds.push(res._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const res = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
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
    setBoard(newBoard)
  }

  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((item) => item._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
  }

  const moveCardSameColumn = (orderCards, orderCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (item) => item._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = orderCards
      columnToUpdate.cardOrderIds = orderCardIds
    }
    setBoard(newBoard)
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
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

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

  const deleteColumn = async (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter((item) => item._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (item) => item !== columnId
    )
    setBoard(newBoard)

    await deleteColumnAPI(columnId).then((res) => {
      toast.success(res?.deleteResult)
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
            createNewColumn={createNewColumn}
            createNewCard={createNewCard}
            moveColumn={moveColumn}
            moveCardSameColumn={moveCardSameColumn}
            moveCardDiffColumn={moveCardDiffColumn}
            deleteColumn={deleteColumn}
          />
        </Box>
      )}
    </Container>
  )
}

export default Board
