import React from 'react'
import PropTypes from 'prop-types'
import { InputStyle } from './style'

const InputFile = props => {
  const { handleSetUploadFile } = props

  return (
    <InputStyle>
      <input
        type="file"
        onChange={e => handleSetUploadFile(e)}
        accept="image/*"
        multiple
      />
    </InputStyle>
  )
}

InputFile.propTypes = {
  handleSetUploadFile: PropTypes.func.isRequired,
}

export default InputFile
