import { Cols } from '../../../../style'
import React from 'react'
import { Label, Subtitle, Body } from 'volantis-ui'
import TableProperties from '../../table-properties/units';

const StepTwoIot = (props) => {
  const { 
    selectedType,
    sensorProps: { sensorType },
    deviceType,
    handleChangeInput,
    fields,
    rules,
    handleChangeProps,
    handleDeleteProps,
    handleAddProps
  } = props
  let optionProperties = []

  if (sensorType && sensorType.length > 0) {
    sensorType.forEach((sensor) => {
      if (selectedType.includes(sensor.sensorType)) optionProperties.push(...sensor.sensorProperties);
    })
  }

  optionProperties = optionProperties.filter((v, i, a) => a.indexOf(v) === i)

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" type="primary">
          <H3Styled>{`Device Detail: ${deviceType}`}</H3Styled>
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Body type="secondary">
          Please add more detail information regarding your IoT device.
        </Body>
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
                      onChange={(selected) => handleChangeInput({ value: selected, key: form.key })} 
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
                      onChange={(e) => handleChangeInput({ step: 'step1', key: form.key, value: e.target.value, replacer: form.replacer })}
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
          optionProperties={optionProperties}
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
  rules: PropTypes.object.isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  handleDeleteProps: PropTypes.func.isRequired,
  handleAddProps: PropTypes.func.isRequired,
  sensorProps: PropTypes.object.isRequired,
  selectedType: PropTypes.array.isRequired
}

export default StepTwoIot
