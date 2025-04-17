import { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ createBlog }) => {
  const useField = (name, type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
      setValue(event.target.value)
    }

    const onSubmit = (event) => {
      setValue('')
    }

    const placeholder = name

    return {
      type,
      value,
      name,
      placeholder,
      onChange,
      onSubmit,
    }
  }

  const title = useField('title', 'text')
  const author = useField('author', 'text')
  const url = useField('url', 'text')

  const addBlog = (event) => {
    event.preventDefault()

    title.onSubmit()
    author.onSubmit()
    url.onSubmit()

    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <input {...title}></input>
        <br></br>
        <input {...author}></input>
        <br></br>
        <input {...url}></input>
        <br></br>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default AddBlogForm
