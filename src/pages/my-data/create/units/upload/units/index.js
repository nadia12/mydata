import Dropzone from 'react-dropzone'
import React from 'react'
import {
  Button,
} from 'volantis-ui'

import {
  UploadStyled,
  BoxUploadStyled,
  DragfileStyled,
} from './style'

const Upload = (props) => {
  const {
    handleChangeFileInput,
    fileInput,
    accept,
  } = props
  return (
    <UploadStyled>
      <Dropzone
        onDrop={handleChangeFileInput}
        accept={accept}
        ref={fileInput}
      >
        {
          ({ getRootProps, getInputProps }) => (
            <BoxUploadStyled {...getRootProps()}>
              <input
                {...getInputProps()}
                className="is-hidden"
                type="file"
                accept={accept}
              />
              <DragfileStyled>
                Drag your file here<br />
                or<br />
              </DragfileStyled>
              <Button type="outlined" label="Browse from local computer" />
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
