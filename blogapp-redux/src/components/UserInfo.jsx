import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'

const UserInfo = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((user) => user.id === id)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2 class="title is-5">{user.name}</h2>
      {user.blogs[0] && (
        <div>
          <table class="table">
            <thead>
              <tr>
                <th>Added blogs</th>
              </tr>
            </thead>
            <tbody>
              {user.blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <Link to={'/blogs/' + blog.id}>{blog.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!user.blogs[0] && <div>This user hasn't added any blogs</div>}
    </div>
  )
}

export default UserInfo
