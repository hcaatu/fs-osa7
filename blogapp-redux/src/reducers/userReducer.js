import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    appendNew(state, action) {
      state.push(action.payload)
    },
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { appendNew, setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer
