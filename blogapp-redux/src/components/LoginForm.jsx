import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      navigate('/blogs')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 3))
    }
  }

  return (
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
}

export default LoginForm
