import React from 'react'
import PropTypes from 'prop-types'

export default function Test({
  count
}) {
  return (
    <div>
      {count}
    </div>
  )
}

Test.propTypes = {
  count: PropTypes.number
}

Test.defaultProps = {
  count: 0
}
