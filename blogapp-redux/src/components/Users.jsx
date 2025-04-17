import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { initializeUsers } from '../reducers/userReducer'

const Users = () => {
  const dispatch = useDispatch()
  const usersArray = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const UsersTable = () => {
    return (
      <table class="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersArray.map((user) => (
            <tr key={user.id}>
              <th>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </th>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h2 class="title is-4">Users</h2>
      <UsersTable />
    </div>
  )
}

export default Users
