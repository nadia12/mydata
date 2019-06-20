import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Subtitle,
  Text,
  Select,
} from 'volantis-ui'

import {
  Cols,
} from 'GlobalComponent/cols/units'
import {
  ColsStyled,
} from 'Pages/my-data/create/units/database/units/step3/units/style'

const StepThreeDatabase = props => {
  const {
    handleChangeInput,
    rules,
    data,
    getTableList,
    tableList,
  } = props

  useEffect(() => {
    getTableList({
      type: data.step0.uploadType,
      step0: data.step0,
      step1: data.step1,
      step2: data.step2,
    })
  }, [])

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" colorType="primary">
          Database table
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Text colorType="secondary">
          Please select the table from your database to be added to Volantis carefully. Only the selected table that can be processed in Volantis.
        </Text>
      </Cols>
      <ColsStyled padding={24}>
        <Select
          label="TABLE NAME"
          name="select-table"
          options={tableList}
          isSearchable
          isMulti
          backspaceRemovesValue
          placeholder="Table name"
          onChange={selected => { handleChangeInput({ value: selected, key: rules.fields[0].key }) }}
          value={data.step2.tableName || []}
        />
      </ColsStyled>
    </>
  )
}

StepThreeDatabase.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  rules: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getTableList: PropTypes.func.isRequired,
  tableList: PropTypes.array.isRequired,
}

export default StepThreeDatabase
