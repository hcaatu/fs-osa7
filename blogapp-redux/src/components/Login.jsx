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
    <div class="level">
      <div class="level-item">
        <p>
          <strong>{user.name} </strong> logged in
        </p>
      </div>
      <div class="level-item">
        <button class="button is-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )

  const padding = {
    padding: 5,
  }

  return (
    <div style={padding}>
      {!user && (
        <Link to="/login">
          <button class="button is-link">Login</button>
        </Link>
      )}{' '}
      {user && logoutForm()}
    </div>
  )
}

export default Login
