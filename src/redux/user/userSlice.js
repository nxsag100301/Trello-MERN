import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from '~/utils/authorizeAxios'

const initialState = {
  currentUser: null
}

export const userLoginAPI = createAsyncThunk(
  'user/userLoginAPI',
  async (data) => {
    const res = await axios.post('/users/login', data)
    return res.data
  }
)

export const userUpdateAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await axios.put('/users/update', data)
    return response.data
  }
)

export const userLogOutAPI = createAsyncThunk(
  'user/userLogOutAPI',
  async (showSuccessMessage = true) => {
    const res = await axios.delete('/users/logout')
    if (showSuccessMessage) {
      toast.success('Logged out!')
    }
    return res.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLoginAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(userLogOutAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    builder.addCase(userUpdateAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export default userSlice.reducer
