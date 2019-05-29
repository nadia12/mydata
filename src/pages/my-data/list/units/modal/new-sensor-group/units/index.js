import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Input,
} from 'volantis-ui'
import {
  CheckIcon,
  SearchIcon,
} from 'volantis-icon'

import {
  Columns,
  Column,
} from 'Assets/css/bulma'
// import {
//   REPLACER
// } from 'Config/constants'
import {
  SensorStyle,
} from 'Pages/my-data/list/units/modal/new-sensor-group/units/style'

const renderSensorTable = props => {
  const {
    sensors,
    search,
    handleChangeSearch,
    handleSelectSensor,
  } = props
  const selectedSensor = sensors || []
  const filteredSensor = search.trim() !== '' && sensors && sensors.length > 0
    ? sensors.filter(sensor => `${sensor.name}`.trim().toLowerCase().indexOf(search.trim().toLowerCase()) > -1)
    : sensors

  return (
    <table cellSpacing="0" className="table-sensor">
      <tbody>
        <tr>
          <th colSpan={2}>
            <Input name="search" value={search} onChange={({ e: { target: { value } } }) => handleChangeSearch(value)} />
            <span style={{ position: 'absolute', marginTop: '-1.75rem', marginLeft: '.25rem' }}><SearchIcon /></span>
          </th>
        </tr>
        {
          (filteredSensor || []).map(sensor => {
            const isSelected = selectedSensor.includes(sensor.id)

            return (
              <tr className={isSelected ? 'background-check' : ''} key={sensor.id} onClick={() => handleSelectSensor(sensor.id)}>
                <td className="check">
                  {
                    isSelected
                      ? (
                        <div
                          style={{
                            width: '16px', height: '16px', backgroundColor: '#ffd77b', border: '1px solid black', margin: '0 auto', borderRadius: '3px',
                          }}
                        >
                          <CheckIcon size={14} color="#000000" />
                        </div>
                      )
                      : ' '
                  }
                </td>
                <td>{sensor.name}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

renderSensorTable.propTypes = {
  sensors: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  handleChangeSearch: PropTypes.func.isRequired,
  handleSelectSensor: PropTypes.func.isRequired,
}

const NewSensorGroupModal = props => {
  const {
    _mydataList,
    isValid,
    fields,
    rules,
    fields: { sensors },
    search,
    handleChangeSearch,
    handleSelectSensor,
    handleAdd,
    handleChangeInput,
    handleCloseModal,
  } = props

  const sensorProps = {
    sensors,
    search,
    isValid,
    handleChangeSearch,
    handleSelectSensor,
    handleAdd,
  }

  return (
    <Modal isShow>
      <SensorStyle>
        <h1 className="has-text-gold">New sensor group</h1>
        {
          _mydataList.rules.fields.map((form, idx) => (
            <React.Fragment key={idx}>
              <div className="pd-bottom2">
                { form.type === 'checkgroup' && renderSensorTable(sensorProps) }
                {
                  (typeof form.type === 'undefined' || form.type === 'text') && (
                    <Input
                      {...form}
                      hasValidation
                      key={`sensor-${idx}`}
                      onChange={e => handleChangeInput({
                        fieldName: 'newSensorGroup', key: form.key, value: e.target.value, replacer: form.REPLACER,
                      })}
                      value={fields[form.key] || ''}
                      rightInfo={rules.touched[form.key] && rules.required.includes(form.key) && `${fields[form.key]}`.trim() === '' ? 'Field must be filled' : ''}
                    />
                  )
                }
              </div>
            </React.Fragment>
          ))
        }
        <Columns className="columns is-pulled-right align-items padding-top20">
          <Column className="column p0">
            <Button label="Cancel" theme="no-border" onClick={() => handleCloseModal('newSensorGroup')} />
          </Column>
          <Column className="column is-two-thirds p0">
            <Button label="Create" disabled={!isValid} onClick={isValid ? handleAdd : () => {}} />
          </Column>
        </Columns>
      </SensorStyle>
    </Modal>
  )
}

NewSensorGroupModal.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  handleChangeSearch: PropTypes.func.isRequired,
  handleSelectSensor: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  search: PropTypes.string,
  isValid: PropTypes.bool.isRequired,
  _mydataList: PropTypes.object,
  rules: PropTypes.array,
  fields: PropTypes.object,
}

NewSensorGroupModal.defaultProps = {
  search: '',
  _mydataList: {},
  rules: [],
  fields: {},
}

export default NewSensorGroupModal
