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

  console.log(usersArray)

  const UsersTable = () => {
    return (
      <table>
        <tbody>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>  
        {usersArray.map(user => 
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <UsersTable users={usersArray} />
    </div>
  )
}

export default Users
