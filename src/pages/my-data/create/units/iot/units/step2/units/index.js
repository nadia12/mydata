import React from 'react'
import {
  Label,
  Subtitle,
  Text,
  Select,
  Input,
} from 'volantis-ui'
import PropTypes from 'prop-types'

import {
  H3Styled,
  Cols,
} from 'Pages/my-data/create/units/style'
import TableProperties from 'Pages/my-data/create/units/iot/units/table-properties/units'

const StepTwoIot = props => {
  const {
    selectedType,
    sensorProps: {
      sensorType,
    },
    deviceType,
    handleChangeInput,
    fields,
    rules,
    handleChangeProps,
    handleDeleteProps,
    handleAddProps,
  } = props
  const getSensorWithType = sensor => !!sensor && selectedType.includes(sensor.sensorType)
  const reduceSensorProperties = (carry, sensor) => [...carry, ...sensor.sensorProperties]

  const optionProperties = (!!sensorType && sensorType.filter(getSensorWithType).reduce(reduceSensorProperties, [])) || []
  const uniqueProperties = (!!optionProperties && optionProperties.filter((v, i, a) => a.indexOf(v) === i)) || []

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" colorType="primary">
          <H3Styled>{`Device Detail: ${deviceType}`}</H3Styled>
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Text colorType="secondary">
          Please add more detail information regarding your IoT device.
        </Text>
      </Cols>
      <Cols padding={24}>
        {
          rules.fields.map((form, idx) => (
            <div className="column is-8" key={`step1-${idx}`}>
              {
                form.type && form.type === 'select' && (
                  <>
                    <Label>{`${form.name || ''}`.toUpperCase()}</Label>
                    <Select
                      isMulti={form.isMultiSelect}
                      name={form.key}
                      placeholder="(select type)"
                      options={form.options}
                      onChange={(_, selected) => handleChangeInput({ value: selected, key: form.key })}
                      value={fields[form.key] || []}
                    />
                  </>
                )
              }
              {
                !(form.type && form.type === 'select') && (
                  <div className="style-input-iot">
                    <Input
                      name={form.name}
                      label={form.name}
                      {...form}
                      key={`step1-${idx}`}
                      onChange={e => handleChangeInput({
                        step: 'step1', key: form.key, value: e.target.value, replacer: form.replacer,
                      })}
                      value={fields[form.key] || ''}
                      errMessage={rules.touched[form.key] && rules.required.includes(form.key) && `${fields[form.key]}`.trim() === '' ? 'Field must be filled' : ''}
                    />
                  </div>
                )
              }
            </div>
          ))
        }
      </Cols>
      <Cols padding={24}>
        <TableProperties
          properties={fields.properties}
          optionProperties={uniqueProperties}
          handleChangeProps={handleAddProps}
          handleDeleteProps={handleChangeProps}
          handleAddProps={handleDeleteProps}
        />
      </Cols>
    </>
  )
}

StepTwoIot.propTypes = {
  deviceType: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  rules: PropTypes.array.isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  handleDeleteProps: PropTypes.func.isRequired,
  handleAddProps: PropTypes.func.isRequired,
  sensorProps: PropTypes.object.isRequired,
  selectedType: PropTypes.array.isRequired,
}

export default StepTwoIot
