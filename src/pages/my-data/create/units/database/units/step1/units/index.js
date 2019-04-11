
import React from 'react'
import PropTypes from 'prop-types'
import {
  Select,
  Subtitle,
  Body,
} from 'volantis-ui'

import {
  TYPE_OPTIONS,
} from 'Pages/my-data/create/units/database/units/step1/constant'
import {
  Cols,
  ColsStyled,
} from 'GlobalComponent/cols/units'

const StepOneDatabase = props => {
  const {
    handleChangeInput,
    fields,
  } = props

  const datasetValue = fields && fields.dbType && fields.dbType !== ''
    ? { value: fields.dbType, label: fields.dbType }
    : null

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" type="primary">
          Database Type
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Body type="secondary">
        Please select Database type you want to connect. You can choose between MySQL, PostgreSQL, MS SQL, DB2 or Oracle.
        </Body>
      </Cols>
      <ColsStyled padding={0}>
        <Select
          label="WHICH DATABASE DO YOU WANT TO USE?"
          name="WHICH DATABASE DO YOU WANT TO USE?"
          placeholder="(select database)"
          options={TYPE_OPTIONS}
          // isOptionDisabled={(option) => option.value === ''}
          onChange={selected => handleChangeInput({ key: 'dbType', value: selected.value })}
          value={datasetValue}
        />
      </ColsStyled>
    </>
  )
}

StepOneDatabase.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
}

export default StepOneDatabase
