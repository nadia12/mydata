import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Label,
  Select,
} from 'volantis-ui'
import {
  AddIcon,
  DeleteIcon,
} from 'volantis-icon'
import {
  BoxTable,
  BoxTableContent,
  TblProps,
  BoxTableFooter,
  ButtonFooter,
} from './style'

const TableProperties = props => {
  const {
    properties = [],
    optionProperties,
    handleChangeProps,
    handleDeleteProps,
    handleAddProps,
  } = props
  const [currentProps, setCurrentProps] = useState(-1)
  const selectedOpt = properties.length === 0 ? [] : properties.map(prop => prop.key)

  const addProps = () => {
    setCurrentProps(!!properties && (properties.length || 0))
    handleAddProps()
  }

  const deleteProps = () => {
    if (currentProps > -1) {
      handleDeleteProps(currentProps)
      setCurrentProps(-1)
    }
  }

  return (
    <>
      <Label>PROPERTIES</Label>
      <BoxTable>
        <BoxTableContent>
          <TblProps cellSpacing="1">
            <tbody>
              {
                properties && properties.map((prop, idx) => {
                  if (!!!prop) return

                  return (
                    <tr key={idx} onClick={() => setCurrentProps(idx)}>
                      <td>
                        <Select
                          name="properties"
                          isSearchable
                          options={optionProperties.filter(opt => !selectedOpt.includes(opt)).map(opt => ({ label: opt, value: opt }))}
                          value={prop.key && prop.key !== '' ? { label: prop.key, value: prop.key } : {}}
                          placeholder="Select"
                          onChange={(_, selected) => handleChangeProps({ idx, value: selected.value, key: 'key' })}
                        />
                      </td>
                      <td>
                        <input
                          value={prop.value}
                          name=""
                          placeholder="Enter Value"
                          className="input is-standard input-table"
                          onChange={e => handleChangeProps({ idx, value: e.target.value, key: 'value' })}
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </TblProps>
        </BoxTableContent>
        <BoxTableFooter>
          <ButtonFooter>
            <AddIcon onClick={addProps} />
          </ButtonFooter>
          <ButtonFooter disabled={!(properties && properties.length > 0)}>
            <DeleteIcon onClick={deleteProps} />
          </ButtonFooter>
        </BoxTableFooter>
      </BoxTable>
    </>
  )
}

TableProperties.propTypes = {
  properties: PropTypes.array.isRequired,
  optionProperties: PropTypes.array.isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  handleDeleteProps: PropTypes.func.isRequired,
  handleAddProps: PropTypes.func.isRequired,
}

export default TableProperties
