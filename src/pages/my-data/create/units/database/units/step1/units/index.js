import { H3Styled, ColumnStyled } from './style'
import React from 'react'
import { Select } from 'volantis-ui'
import {
  typeOptions
} from '../constant'

const StepOneDatabase = (props) => {
  const { handleChangeInput, fields } = props
  return (
    <>
      <H3Styled>Database Type</H3Styled>
      <ColumnStyled>
        Please select Database type you want to connect. You can choose between MySQL, PostgreSQL, MS SQL, DB2 or Oracle.
      </ColumnStyled>
      <ColumnStyled>
        <Select
          label="WHICH DATABASE DO YOU WANT TO USE?"
          name="WHICH DATABASE DO YOU WANT TO USE?"
          placeholder="(select database)"
          options={typeOptions}
          isOptionDisabled={(option) => option.value === ''}
          onChange={(selected) => handleChangeInput({ key: 'dbType', value: selected.value })} value={{ value: fields.dbType, label: fields.dbType }} />
      </ColumnStyled>
    </>
  )
}

StepOneDatabase.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
}

export default StepOneDatabase
