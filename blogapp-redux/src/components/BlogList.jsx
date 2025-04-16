import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import AddBlogForm from './AddBlogForm'
import { initializeBlogs, createAndSaveNew } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector((state) =>
    state.blogs.toSorted((a, b) => b.likes - a.likes)
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const createBlog = (blogObject) => {
    try {
      dispatch(createAndSaveNew(blogObject))
      dispatch(
        setNotification(`created a new blog titled ${blogObject.title}`, 3)
      )
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('an error occured', 3))
    }
  }

  return (
    <div>
      {user && (
        <div>
          <Togglable buttonLabel={'Add blog'}>
            <AddBlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}

      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
