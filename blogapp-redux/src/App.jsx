import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'

const App = () => {
  return (
    <Router>
      <NavBar />

      <h2>Blog App</h2>

      <Notification />

      <Routes>
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={<p>Redux Blog App for Full Stack Open part 7</p>}
        />
      </Routes>
    </Router>
  )
}

export default App
