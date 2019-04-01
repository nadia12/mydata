import { Cols } from '../../../../style'
import React from 'react'
import { Label, Subtitle, Body } from 'volantis-ui'
import {
  uploadTypeList,
  fileTypeList
} from '../constant'
import RadioGroup from '../../../../../../../../components/radio-group'

const StepOneFile = (props) => {
  const { handleChangeInput, fields } = props
  console.log('MASUK STEP ONE====>', props)
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
        <RadioGroup handleChangeInput={handleChangeInput} value={fields.uploadType} name="uploadType" radioLists={uploadTypeList} />
      </Cols>
      <Cols padding={24}>
        <Label>WHICH FILE TYPE DO YOU WANT TO UPLOAD?</Label>
        <RadioGroup handleChangeInput={handleChangeInput} value={fields.fileType} name="fileType" radioLists={fileTypeList} />
      </Cols>
    </>
  )
}

StepOneFile.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
}

export default StepOneFile
