
import React from 'react'
import PropTypes from 'prop-types'
import {
  Subtitle,
  Text,
} from 'volantis-ui'

import {
  Cols,
} from 'GlobalComponent/cols/units'
import {
  MYDATA_CREATE,
} from 'Config/constants'
import Upload from 'Pages/my-data/create/units/upload/units'
import TableUpload from 'Pages/my-data/create/units/file/units/step2/units/table-upload/units'
import FormUpload from 'Pages/my-data/create/units/file/units/step2/units/form-upload/units'

const StepTwoFile = props => {
  const {
    isBack,
    handleChangeFileInput,
    fields,
    filesData,
    rules,
    handleOnUpload,
    handleOnPause,
    handleChangeInput,
    data: {
      step0: {
        uploadType,
      },
    },
    files: {
      file,
    },
    allowNext,
  } = props

  const acceptType = uploadType === 'filelocal' ? MYDATA_CREATE.UPLOAD_ACCEPT_TYPE.supportedFile : MYDATA_CREATE.UPLOAD_ACCEPT_TYPE.default
  const online = window.navigator.onLine

  const isLocal = uploadType !== 'fileurl'
  const { showTableUpload } = filesData

  const tableProps = {
    file,
    percentage: filesData.percentage,
    online,
    allowNext,
    handleOnUpload,
    handleOnPause,
  }

  const formProps = {
    handleChangeInput,
    fields,
    rules,
    file,
    uploadType,
  }

  return (
    <>
      <Cols margin={1}>
        <Cols padding={16}>
          <Subtitle size="big" colorType="primary">
            { isLocal ? 'Upload File from Local Computer' : 'Upload File from URL' }
          </Subtitle>
        </Cols>
        <Cols padding={24}>
          <Text colorType="secondary">
            { !isLocal ? 'Please enter your file URL below and make sure the URL you write down is valid.' : 'You can upload your file from local storage by browsing your folder or simply drag the file here.' }
          </Text>
        </Cols>
        <Cols padding={0}>
          { isLocal && (isBack || showTableUpload) && <TableUpload {...tableProps} /> }
          { (!isLocal || (isLocal && showTableUpload)) && (<FormUpload {...formProps} />) }
          {
            isLocal && (!isBack && !showTableUpload) && (
              <>
                <Upload
                  handleChangeFileInput={accepted => {
                    handleChangeFileInput(accepted)
                  }}
                  fileInput={React.createRef()}
                  accept={acceptType}
                  file={file}
                />
              </>
            )
          }
        </Cols>
      </Cols>
    </>
  )
}

StepTwoFile.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
  handleChangeFileInput: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  filesData: PropTypes.object.isRequired,
  allowNext: PropTypes.bool.isRequired,
  files: PropTypes.object,
  rules: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  isBack: PropTypes.bool,
  uploadUrl: PropTypes.string,
  authCookie: PropTypes.string,
  handleOnUpload: PropTypes.func,
  handleOnPause: PropTypes.func,
}

StepTwoFile.defaultProps = {
  handleOnPause: () => {},
  handleOnUpload: () => {},
  files: {},
  isBack: false,
  uploadUrl: PropTypes.string,
  authCookie: '',
}

export default StepTwoFile
