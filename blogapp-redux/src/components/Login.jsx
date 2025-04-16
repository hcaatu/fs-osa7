import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser, loginFromLocalStorage } from '../reducers/loginReducer'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(loginFromLocalStorage(user))
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  const logoutForm = () => (
    <em>
      <e>{user.name} logged in </e>
      <button onClick={handleLogout}>logout</button>
    </em>
  )

  const padding = {
    padding: 5,
  }

  return (
    <e style={padding}>
      {!user && <Link to="/login">login</Link>} {user && logoutForm()}
    </e>
  )
}

export default Login
