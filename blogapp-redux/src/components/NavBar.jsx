import { Link } from 'react-router-dom'
import Login from './Login'

const NavBar = () => {
  const padding = {
    padding: 5,
  }

  return (
    <div className="navbar">
      <Link style={padding} to="/">
        home
      </Link>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <Login />
    </div>
  )
}

export default NavBar
