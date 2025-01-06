import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Board
export const fetchBoardDetailsAPI = async (boardId) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return res.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const res = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return res.data
}

export const moveCardDiffColumnAPI = async (updateData) => {
  const res = await axios.put(
    `${API_ROOT}/v1/boards/support/move_card_diff_column`,
    updateData
  )
  return res.data
}

// Column
export const createNewColumnAPI = async (data) => {
  const res = await axios.post(`${API_ROOT}/v1/columns`, data)
  return res.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const res = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return res.data
}

//Card
export const createNewCardAPI = async (data) => {
  const res = await axios.post(`${API_ROOT}/v1/cards`, data)
  return res.data
}
