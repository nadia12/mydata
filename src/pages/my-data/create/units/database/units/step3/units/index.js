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
          Data type mapping
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Text colorType="secondary">
          You can map each of your column to the available data type options. If you have multiple table on your database, you can map each of your table by selecting the respective table on the dropdown. Unmapped column won&apos;t be saved to our storage.
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
