
import React from 'react'
import PropTypes from 'prop-types'
import {
  Select,
  Subtitle,
  Text,
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
    ? fields.dbType : null

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" colorType="primary">
          Database type
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Text colorType="secondary">
          Please select database type you want to connect. You can choose between MySQL, PostgreSQL, MS SQL, DB2 or Oracle.
        </Text>
      </Cols>
      <ColsStyled padding={0}>
        <Select
          label="WHICH DATABASE DO YOU WANT TO USE?"
          name="WHICH DATABASE DO YOU WANT TO USE?"
          placeholder="(select database)"
          options={TYPE_OPTIONS}
          // isOptionDisabled={(option) => option.value === ''}
          onChange={(_, selected) => handleChangeInput({ key: 'dbType', value: selected.value })
          }
          value={datasetValue || ''}
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
