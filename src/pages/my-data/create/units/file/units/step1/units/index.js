import React from 'react'
import {
  Label,
  Subtitle,
  Body,
} from 'volantis-ui'

import {
  Cols,
} from 'Pages/my-data/create/units/style'
import {
  UPLOAD_TYPE_LIST,
  FILE_TYPE_LIST,
} from 'Pages/my-data/create/units/file/units/step1/constant'
import RadioGroup from 'GlobalComponent/radio-group'

const StepOneFile = (props) => {
  const {
    handleChangeInput,
    fields,
  } = props
  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" type="primary">
          Choose File
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Body type="secondary">
        Please select on how you want to upload your file. You can browse your local storage or insert the URL to upload your file. You can upload CSV or XLS/XLSX file in My Data.
        </Body>
      </Cols>
      <Cols padding={24}>
        <Label>HOW DO YOU UPLOAD YOUR FILE?</Label>
        <RadioGroup handleChangeInput={handleChangeInput} value={fields.uploadType} name="uploadType" radioLists={UPLOAD_TYPE_LIST} />
      </Cols>
      <Cols padding={24}>
        <Label>WHICH FILE TYPE DO YOU WANT TO UPLOAD?</Label>
        <RadioGroup handleChangeInput={handleChangeInput} value={fields.fileType} name="fileType" radioLists={FILE_TYPE_LIST} />
      </Cols>
    </>
  )
}

StepOneFile.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
}

export default StepOneFile
