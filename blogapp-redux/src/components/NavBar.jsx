import { Link } from 'react-router-dom'
import Login from './Login'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const user = useSelector((state) => state.user)

  const style = {
    border: 'solid',
    padding: 7,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'CornflowerBlue',
    background: 'CornflowerBlue',
    color: 'white',
  }

  return (
    <div class="box">
      <nav class="level">
        <div class="level-item has-text-centered">
          <Link to="/">
            <h1 class="subtitle is-6" style={style}>
              Home
            </h1>
          </Link>
        </div>
        <div class="level-item has-text-centered">
          <Link to="/blogs">
            <h1 class="subtitle is-6" style={style}>
              Blogs
            </h1>
          </Link>
        </div>
        {user && (
          <div class="level-item has-text-centered">
            <Link to="/users">
              <h1 class="subtitle is-6" style={style}>
                Users
              </h1>
            </Link>
          </div>
        )}
        <div class="level-item has-text-centered">
          <p> </p>
        </div>
        <div class="level-item has-text-centered"></div>
        <div class="level-item has-text-centered"></div>
        <div class="level-item has-text-centered"></div>

        <div class="level-right">
          <Login />
        </div>
      </nav>
    </div>
  )
}

export default NavBar
