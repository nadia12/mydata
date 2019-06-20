import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'volantis-ui'

const InputColumn = ({
  dataheader,
  searchColumns,
  onDebounceInput,
  handleColumnEnter,
}) => {
  const [text, setText] = React.useState(searchColumns.dataheader)

  return (
    <>
      <Input
        id={dataheader}
        name={dataheader}
        type="text"
        placeholder="Search..."
        value={text}
        onChange={() => setText()}
        onDebounce={() => onDebounceInput({ key: dataheader, value: text })}
        debounceTimeout={1}
        onKeyPress={e => {
          if (e.key === 'Enter') handleColumnEnter()
        }}
      />
    </>
  )
}

InputColumn.propTypes = {
  dataheader: PropTypes.string,
  searchColumns: PropTypes.object,
  onDebounceInput: PropTypes.func,
  handleColumnEnter: PropTypes.func,
}

InputColumn.defaultProps = {
  dataheader: '',
  searchColumns: {},
  onDebounceInput: () => {},
  handleColumnEnter: () => {},
}

export default InputColumn
