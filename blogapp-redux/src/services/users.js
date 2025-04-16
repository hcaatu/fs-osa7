import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const createNew = async (user) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, user, config)
  return response.data
}

export default { setToken, getAll, createNew }
