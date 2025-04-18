import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hiddenButton = { display: visible ? 'none' : '' }
  const visibleContent = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hiddenButton} class="block">
        <button class="button is-light" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={visibleContent} class="block">
        {props.children}
        <button class="button is-dark" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
