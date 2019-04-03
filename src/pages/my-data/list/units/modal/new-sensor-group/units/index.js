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
import {
  REPLACER,
} from 'Config/constants'
import {
  SensorStyle,
} from 'Pages/my-data/list/units/modal/new-sensor-group/units/style'


renderSensorTable = () => {
  const { search, sensors } = props
  const selectedSensor = props.fields.sensors || []
  const filteredSensor = search.trim() !== '' && sensors && sensors.length > 0
    ? sensors.filter((sensor) => sensor.name.trim().toLowerCase().indexOf(search.trim().toLowerCase()) > -1)
    : sensors

  return (
    <table cellSpacing="0" className="table-sensor">
      <tbody>
        <tr>
          <th colSpan={2}>
            <Input name="search" value={search} onChange={(e) => props.handleChangeSearch(e.target.value)} />
            <span style={{ position: 'absolute', marginTop: '-1.75rem', marginLeft: '.25rem' }}><SearchIcon /></span>
          </th>
        </tr>
        {
          (filteredSensor || []).map((sensor) => {
            const isSelected = selectedSensor.includes(sensor.id)
            return (
              <tr className={isSelected ? 'background-check' : ''} key={sensor.id} onClick={() => props.handleSelectSensor(sensor.id)}>
                {/* <td className="check">{ isSelected ? 'v' : ' '}</td> */}
                <td className="check">{ isSelected ? <div style={{ width: '16px', height: '16px', backgroundColor: '#ffd77b', border: '1px solid black', margin: '0 auto', borderRadius: '3px' }}><CheckIcon size={14} color="#000000" /></div>  : ' '}</td>
                <td>{sensor.name}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

const NewSensorGroupModal = props => {
  return (
    <Modal isShow={true}>
      <SensorStyle>
        <h1 className="has-text-gold">New sensor group</h1>
        {
          props.rules.fields.map((form, idx) => (
            <React.Fragment key={idx}>
              <div className="pd-bottom2">
                { form.type === 'checkgroup' && renderSensorTable() }
                {
                  (typeof form.type === 'undefined' || form.type === 'text') && (
                    <Input
                      {...form}
                      hasValidation={true}
                      key={`sensor-${idx}`}
                      onChange={(e) => props.handleChangeInput({ fieldName: 'newSensorGroup', key: form.key, value: e.target.value, replacer: form.REPLACER })}
                      value={props.fields[form.key] || ''}
                      rightInfo={props.rules.touched[form.key] && props.rules.required.includes(form.key) && `${props.fields[form.key]}`.trim() === '' ? 'Field must be filled' : ''}
                    />
                  )
                }
              </div>
            </React.Fragment>
          ))
        }
        <Columns className="columns is-pulled-right align-items padding-top20">
          <Column className="column p0">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Button label="Cancel" type="no-border" onClick={() => props.handleCloseModal('newSensorGroup')} />
          </Column>
          <Column className="column is-two-thirds p0">
            <Button label="Create" disabled={!props.isValid} onClick={props.isValid ? props.handleAdd : null } />
          </Column>
        </Columns>
      </SensorStyle>
    </Modal>
  )
}

NewSensorGroupModal.propTypes = {
  fields: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleChangeSearch: PropTypes.func.isRequired,
  handleSelectSensor: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  search: PropTypes.string,
  isValid: PropTypes.bool.isRequired,
  sensors: PropTypes.array,
}

NewSensorGroupModal.defaultProps = {
  search: '',
  sensors: [],
}

export default NewSensorGroupModal
