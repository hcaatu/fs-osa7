import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendNew(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlogArray(state, action) {
      const updatedBlog = action.payload
      const id = updatedBlog.id
      return state.map((blog) => (blog.id != id ? blog : updatedBlog))
    },
    removeBlog(state, action) {
      const deletedBlog = action.payload
      const ids = state.map((blog) => blog.id)
      const deletedBlogIndex = ids.findIndex((id) => id === deletedBlog.id)
      // check if blog to delete exists
      if (deletedBlogIndex > -1) {
        const updatedBlogList = state.toSpliced(deletedBlogIndex, 1)
        return updatedBlogList
      }
      return state
    },
    createComment(state, action) {
      const updatedBlog = state.find((blog) => blog.id == action.payload.id)
      updatedBlog.comments.push(action.payload.comment.content)
    },
  },
})

export const {
  appendNew,
  setBlogs,
  updateBlogArray,
  removeBlog,
  createComment,
} = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createAndSaveNew = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(blogObject)
    dispatch(appendNew(newBlog))
  }
}

export const updateAndSaveBlog = (blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogObject)
    dispatch(updateBlogArray(blogObject))
  }
}

export const deleteBlog = (blogObject) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(blogObject)
    dispatch(removeBlog(blogObject))
  }
}

export const postComment = (comment, id) => {
  return async (dispatch) => {
    await blogService.appendComment(comment, id)
    dispatch(createComment({ comment, id }))
  }
}

export default blogSlice.reducer
