import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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

  const createBlog = (blogObject) => {
    try {
      dispatch(createAndSaveNew(blogObject))
      dispatch(setNotification(`Created ${blogObject.title}`, 3))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('An error occured', 3))
    }
  }

  return (
    <div class="block">
      {user && (
        <div>
          <AddBlogForm createBlog={createBlog} />
        </div>
      )}

      <ul class="content"></ul>
      {blogs.map((blog) => (
        <li key={blog.id} class="media">
          <div></div>
          <Link to={`/blogs/${blog.id}`}>
            <button class="button is-medium is-link is-inverted is-fullwidth">
              {blog.title} {blog.author}
            </button>
          </Link>
        </li>
      ))}
    </div>
  )
}

export default BlogList
