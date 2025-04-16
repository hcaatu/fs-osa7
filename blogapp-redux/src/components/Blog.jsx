import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateAndSaveBlog,
  deleteBlog,
  initializeBlogs,
} from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  if (!blog) {
    return null
  }

  const addLike = (event) => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    try {
      dispatch(updateAndSaveBlog(updatedBlog))
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog))
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      {blog.url}
      <br></br>
      likes {blog.likes}
      <button onClick={addLike}>like</button>
      <br></br>
      {blog.user.name}
      {!user && <div></div>}
      {user && user.username === blog.user.username && (
        <button onClick={removeBlog}>remove blog</button>
      )}
    </div>
  )
}

export default Blog
