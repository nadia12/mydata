import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'volantis-ui'

const InputColumn = ({
  dataheader,
  handleColumnEnter,
  saveValueColumn,
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
        debounceTimeout={0}
        onDebounce={() => saveValueColumn({ key: dataheader, value: text })}
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
  saveValueColumn: PropTypes.func,
}

InputColumn.defaultProps = {
  dataheader: '',
  handleColumnEnter: () => {},
  saveValueColumn: () => {},
}

export default InputColumn
