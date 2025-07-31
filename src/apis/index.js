import { toast } from 'react-toastify'
import axios from '~/utils/authorizeAxios'

// Board
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return res.data
// }

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const res = await axios.put(`/boards/${boardId}`, updateData)
  return res.data
}

export const moveCardDiffColumnAPI = async (updateData) => {
  const res = await axios.put(
    '/boards/support/move_card_diff_column',
    updateData
  )
  return res.data
}

export const fetchBoardsAPI = async (searchPath) => {
  const response = await axios.get(`/boards${searchPath}`)
  return response.data
}

export const createNewBoardAPI = async (data) => {
  const response = await axios.post('/boards', data)
  toast.success('Board created successfully')
  return response.data
}

export const inviteUserToBoardAPI = async (data) => {
  const response = await axios.post('/invitations/board', data)
  toast.success('User invited to board successfully!')
  return response.data
}

// Column
export const createNewColumnAPI = async (data) => {
  const res = await axios.post('/columns', data)
  return res.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const res = await axios.put(`/columns/${columnId}`, updateData)
  return res.data
}

export const deleteColumnAPI = async (columnId) => {
  const res = await axios.delete(`/columns/${columnId}`)
  return res.data
}

//Card
export const createNewCardAPI = async (data) => {
  const res = await axios.post('/cards', data)
  return res.data
}

export const updateCardDetailsAPI = async (cardId, updateData) => {
  const response = await axios.put(`/cards/${cardId}`, updateData)
  return response.data
}

// Users
export const registerUserAPI = async (data) => {
  const response = await axios.post('/users/register', data)
  toast.success(
    'Account created successfully! Please check and verify your account before logging in!'
  )
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await axios.put('/users/verify', data)
  toast.success(
    'Account verified successfully! Now you can login to enjoy our services! Have a good day!'
  )
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await axios.get('/users/refresh_token')
  return response.data
}
