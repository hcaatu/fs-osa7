import { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ createBlog }) => {
  const useField = (name, type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
      setValue(event.target.value)
    }

    const onSubmit = () => {
      setValue('')
    }

    const placeholder = name.charAt(0).toUpperCase() + name.slice(1)

    const marginBottom = {
      marginBottom: 10,
    }

    return {
      type,
      value,
      name,
      placeholder,
      onChange,
      onSubmit,
      class: 'input',
      style: marginBottom,
    }
  }

  const title = useField('title', 'text')
  const author = useField('author', 'text')
  const url = useField('url', 'text')
  const [visible, setVisible] = useState()

  const hiddenButton = { display: visible ? 'none' : '' }
  const visibleContent = { display: visible ? '' : 'none', marginBottom: 15 }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

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

  const margin = {
    marginRight: 10,
  }

  return (
    <div>
      <div style={hiddenButton} class="block">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h2 class="title is-3">Blogs</h2>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <button
                class="button is-medium is-dark"
                onClick={toggleVisibility}
              >
                Add blog
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={visibleContent} class="box">
        <h2 class="title is-5">Create a new blog</h2>

        <form onSubmit={addBlog}>
          <input {...title}></input>
          <br></br>
          <input {...author}></input>
          <br></br>
          <input {...url}></input>
          <br></br>
          <button style={margin} class="button is-dark" type="submit">
            Save
          </button>
          <button
            class="button is-light"
            type="button"
            onClick={toggleVisibility}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default AddBlogForm
