import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.toSorted((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`logging in with ${username} ${password}...`)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`welcome, ${user.name}`, 3))
    } catch (exception) {
      console.log('wrong credentials')
      dispatch(setNotification('wrong username or password', 3))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out...')

    console.log(`${user.username} logged out`)
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.createNew(blogObject)
      setBlogs(blogs.concat(blog))
      dispatch(setNotification(`created a new blog titled ${blog.title}`, 3))
    } catch (exception) {
      console.log('oopsie')
      console.log(exception)
      dispatch(setNotification('an error occured', 3))
    }
  }

  const updateBlog = (blogObject) => {
    const updatedBlog = {
      ...blogObject,
      likes: (blogObject.likes += 1),
    }

    // using then instead of async/await to mitigate delay in array sorting
    try {
      blogService.update(updatedBlog).then((response) => {
        const blog = response.data
      })
      // replace the liked blog with a new object
      // and sort the array in desc order based on likes
      const updatedBlogIndex = blogs.indexOf(blogObject)
      if (updatedBlogIndex > -1) {
        const updatedBlogArray = blogs.toSpliced(
          updatedBlogIndex,
          1,
          updatedBlog
        )
        setBlogs(updatedBlogArray.toSorted((a, b) => b.likes - a.likes))
      }
      console.log(blogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} ${blogObject.author}?`)
    ) {
      try {
        blogService.remove(blogObject).then((response) => {
          const removedBlog = response.data
          console.log(`removed blog ${blogObject.title}`)
        })

        const deletedBlogIndex = blogs.indexOf(blogObject)
        if (deletedBlogIndex > -1) {
          const updatedBlogArray = blogs.toSpliced(deletedBlogIndex, 1)
          setBlogs(updatedBlogArray.toSorted((a, b) => b.likes - a.likes))
        }
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          name="username"
          placeholder="username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
        <br></br>
        <input
          type="password"
          value={password}
          name="password"
          placeholder="password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const logoutForm = () => (
    <div>
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
    </div>
  )

  return (
    <div>
      <h2>Blog App</h2>

      <Notification />

      {!user && loginForm()}
      {user && (
        <div>
          {logoutForm()}
          <Togglable buttonLabel={'Add blog'}>
            <AddBlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}

      <h2>Blogs</h2>
      {!user &&
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={{ username: null }}
          />
        ))}
      {user &&
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
