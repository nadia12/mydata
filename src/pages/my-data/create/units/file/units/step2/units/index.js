
import React from 'react'
import PropTypes from 'prop-types'
import {
  Subtitle,
  Body,
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
    handleOnUpload,
    fields,
    filesData,
    rules,
    handleChangeInput,
    data: {
      step0: {
        uploadType,
        fileType,
      },
    },
    files: {
      file,
    },
    authCookie,
  } = props
  const acceptType = MYDATA_CREATE.UPLOAD_ACCEPT_TYPE[`${fileType}`.toLowerCase()]

  const isLocal = uploadType !== 'link'
  const { showTableUpload } = filesData

  const tableProps = {
    file,
    percentage: filesData.percentage,
  }

  const formProps = {
    handleChangeInput,
    fields,
    rules,
  }

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" type="primary">
          {`Upload File: ${fileType}`}
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Body type="secondary">
          { !isLocal && 'Please enter your file URL below and make sure the URL you write down is valid.' }
          { isLocal && 'You can upload your file from local storage by browsing your folder or simply drag the file here.' }
        </Body>
      </Cols>
      <Cols padding={0}>
        { isLocal && (isBack || showTableUpload) && <TableUpload {...tableProps} /> }
        { (!isLocal || (isLocal && showTableUpload)) && (<FormUpload {...formProps} />) }
        {
          isLocal && (!isBack && !showTableUpload) && (
            <Upload
              handleChangeFileInput={accepted => {
                handleChangeFileInput(accepted)
                handleOnUpload({ files: accepted, authCookie })
              }}
              fileInput={React.createRef()}
              accept={acceptType}
              handleOnUpload={handleOnUpload}
            />
          )
        }
      </Cols>
    </>
  )
}

StepTwoFile.propTypes = {
  handleChangeFileInput: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleOnUpload: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  filesData: PropTypes.object.isRequired,
  files: PropTypes.object,
  rules: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  authCookie: PropTypes.string.isRequired,
  isBack: PropTypes.bool,
}

StepTwoFile.defaultProps = {
  files: {},
  isBack: false,
}

export default StepTwoFile
