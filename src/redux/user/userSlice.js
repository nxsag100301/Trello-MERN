import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '~/utils/authorizeAxios'

const initialState = {
  currentUser: null
}

export const userLoginAPI = createAsyncThunk(
  'user/userLoginAPI',
  async (data) => {
    const res = await axios.post(`/v1/users/login`, data)
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
  }
})

// Action creators are generated for each case reducer function
// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export default userSlice.reducer
