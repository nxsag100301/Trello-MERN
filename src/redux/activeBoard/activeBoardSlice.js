import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '~/utils/authorizeAxios'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sort'

const initialState = {
  currentActiveBoard: null
}

export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const res = await axios.get(`/boards/${boardId}`)
    return res.data
  }
)

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      state.currentActiveBoard = action.payload
    },
    updateCardInBoard: (state, action) => {
      const cardPayload = action.payload
      const column = state.currentActiveBoard.columns.find(
        (item) => item._id === cardPayload?.columnId
      )
      if (column) {
        column.cards = column.cards.map((item) =>
          item._id === cardPayload._id ? cardPayload : item
        )
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload
      board.FE_allUsers = board.owners.concat(board.members)
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach((item) => {
        if (isEmpty(item.cards)) {
          item.cards = [generatePlaceholderCard(item)]
          item.cardOrderIds = [generatePlaceholderCard(item)._id]
        } else {
          item.cards = mapOrder(item.cards, item.cardOrderIds, '_id')
        }
      })
      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard, updateCardInBoard } =
  activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

export default activeBoardSlice.reducer
