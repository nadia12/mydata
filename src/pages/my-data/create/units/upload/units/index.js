import Dropzone from 'react-dropzone'
import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'volantis-ui'

import {
  UploadStyled,
  BoxUploadStyled,
  DragfileStyled,
} from './style'

const Upload = props => {
  const {
    handleChangeFileInput,
    fileInput,
  } = props

  return (
    <UploadStyled>
      <Dropzone
        onDrop={handleChangeFileInput}
        ref={fileInput}
      >
        {
          ({ getRootProps, getInputProps }) => (
            <BoxUploadStyled {...getRootProps()}>
              <input
                {...getInputProps()}
                className="is-hidden"
                type="file"
              />
              <DragfileStyled>
                Drag your file here
                <br />
                or
                <br />
              </DragfileStyled>
              <Button theme="outlined" label="Browse from local computer" />
            </BoxUploadStyled>
          )
        }
      </Dropzone>
    </UploadStyled>
  )
}

Upload.propTypes = {
  handleChangeFileInput: PropTypes.func.isRequired,
  fileInput: PropTypes.any.isRequired,
  accept: PropTypes.string.isRequired,
}

export default Upload
