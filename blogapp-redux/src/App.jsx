import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import { useSelector } from 'react-redux'

const margin = {
  marginTop: 12,
  marginBottom: 12,
}

const App = () => {
  const user = useSelector((state) => state.user)
  return (
    <div class="container is-max-tablet">
      <Router>
        <NavBar />
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h1 class="title is-2" style={margin}>
                Blog App
              </h1>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <Notification />
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/blogs" element={<BlogList />} />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to="/blogs" />}
          />
          <Route
            path="/users/:id"
            element={user ? <UserInfo /> : <Navigate replace to="/blogs" />}
          />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route
            path="/login"
            element={user ? <Navigate replace to="/blogs" /> : <LoginForm />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
