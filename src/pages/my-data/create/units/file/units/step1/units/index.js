import { H3Styled, ColumnMultilineStyled, ColumnStyled } from './style'
import React from 'react'
import { Label } from 'volantis-ui'
import {
  uploadTypeList,
  fileTypeList
} from '../../constant'
import RadioGroup from '../../../../radio-group'

const StepOneFile = (props) => {
  const { handleChangeInput, fields } = props
  return (
    <>
      <H3Styled>Choose File</H3Styled>
      <ColumnMultilineStyled>
        <ColumnStyled>
          Please select on how you want to upload your file. You can browse your local storage or insert the URL to upload your file. You can upload CSV or XLS/XLSX file in My Data.
        </ColumnStyled>
        <ColumnStyled>
          <Label>How do you upload your file?</Label>
          <RadioGroup handleChangeInput={handleChangeInput} value={fields.uploadType} name="uploadType" radioLists={uploadTypeList} />
        </ColumnStyled>
        <ColumnStyled>
          <Label>Which file type do you want to upload?</Label>
          <RadioGroup handleChangeInput={handleChangeInput} value={fields.fileType} name="fileType" radioLists={fileTypeList} />
        </ColumnStyled>
      </ColumnMultilineStyled>
    </>
  )
}

StepOneFile.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
}

export default StepOneFile
