import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'volantis-ui'

const InputColumn = ({
  dataheader,
  handleColumnEnter,
}) => {
  const [text, setText] = React.useState('')

  return (
    <>
      <Input
        id={dataheader}
        name={dataheader}
        type="text"
        placeholder="Search..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') handleColumnEnter({ key: dataheader, value: text })
        }}
      />
    </>
  )
}

InputColumn.propTypes = {
  dataheader: PropTypes.string,
  handleColumnEnter: PropTypes.func,
}

InputColumn.defaultProps = {
  dataheader: '',
  handleColumnEnter: () => {},
}

export default InputColumn
