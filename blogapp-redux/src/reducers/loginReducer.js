import { createSlice } from '@reduxjs/toolkit'

import { setNotification } from './notificationReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    switchUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { switchUser, removeUser } = loginSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    console.log(credentials)
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(switchUser(user))
      if (user) {
        dispatch(setNotification(`welcome ${user.username}`, 3))
      }
    } catch (exception) {
      console.log(exception)
      if (exception.status === 401) {
        dispatch(setNotification('Wrong username or password', 3))
      }
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(removeUser())
    dispatch(setNotification('Successfully logged out', 3))
  }
}

export const loginFromLocalStorage = (credentials) => {
  return async (dispatch) => {
    console.log(credentials)
    blogService.setToken(credentials.token)
    dispatch(switchUser(credentials))
  }
}

export default loginSlice.reducer
