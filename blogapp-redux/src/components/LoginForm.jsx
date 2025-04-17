import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUsername('')
      setPassword('')
    }
  }

  const marginBottom = {
    marginBottom: 10,
  }

  return (
    <div class="box">
      <h2 class="title is-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div style={marginBottom}>
          <input
            class="input"
            type="text"
            value={username}
            name="username"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>

        <div style={marginBottom}>
          <input
            class="input"
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>

        <button class="button is-link" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
