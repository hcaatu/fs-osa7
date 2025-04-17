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
      <div class="box">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h2 class="subtitle is-4">
                <em>{blog.title}</em> by <strong>{blog.author}</strong>
              </h2>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <h2 class="subtitle is-5">
                <strong>{blog.likes}</strong> likes
              </h2>
            </div>
            <div class="level-item">
              <button class="button is-small is-primary" onClick={addLike}>
                Like
              </button>
            </div>
          </div>
        </div>
        <div class="subtitle is-5" href={blog.url}>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h2 class="subtitle is-5">
                Added by <strong>{blog.user.name}</strong>
              </h2>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              {!user && <div></div>}
              {user && user.username === blog.user.username && (
                <button class="button is-danger" onClick={removeBlog}>
                  remove blog
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="subtitle is-5">
              <strong>{blog.comments.length}</strong> comments
            </h1>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <form class="field has-addons" onSubmit={addComment}>
              <p class="control">
                <input class="input" type="text" name="content"></input>
              </p>
              <p class="control">
                <button class="button is-primary" type="submit">
                  add comment
                </button>
              </p>
            </form>
          </div>
        </div>
      </nav>
      <ul class="content">
        {blog.comments.map((comment) => (
          <li class="media" key={Math.random() * 100000}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
