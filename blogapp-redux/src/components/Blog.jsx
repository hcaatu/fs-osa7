import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateAndSaveBlog,
  deleteBlog,
  initializeBlogs,
  postComment,
} from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const addComment = (event) => {
    event.preventDefault()
    const comment = {
      content: event.target.content.value,
    }
    event.target.content.value = ''

    try {
      dispatch(postComment(comment, blog.id))
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} ${blog.author}?`)) {
      try {
        dispatch(
          setNotification(`Removed blog ${blog.title} ${blog.author}`, 3)
        )
        dispatch(deleteBlog(blog))
        navigate('/blogs')
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  console.log(blog.comments)

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
      Added by {blog.user.name}
      {!user && <div></div>}
      {user && user.username === blog.user.username && (
        <button onClick={removeBlog}>remove blog</button>
      )}
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input type="text" name="content"></input>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={Math.random() * 100000}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
