import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  Select,
} from 'volantis-ui'

import {
  Cols,
} from 'GlobalComponent/cols/units'
import {
  FormStyled,
} from 'Pages/my-data/create/units/file/units/step2/units/style'

const FormUpload = props => {
  const {
    handleChangeInput,
    fields,
    rules,
    fileLocal,
    percentage,
  } = props
  const finishedUpload = percentage === 100

  return (
    <Cols padding={16}>
      {
        rules && rules.fields && rules.fields.map((form, idx) => {
          const selectValue = fields && fields[form.key] && fields[form.key] !== ''
            ? (form.options || []).find(opt => opt.value === fields[form.key])
            : null

          const rules1 = rules
          const hasError = form.key && rules1 && rules1.required && rules1.touched && rules1.touched[form.key] && rules1.required.findIndex(req => req === form.key) > -1 && fields[form.key] === ''

          return (
            <React.Fragment key={idx}>
              <FormStyled isLocal={fileLocal}>
                {
                  form.type && form.type === 'select' && (
                    <>
                      <Select
                        name={form.key}
                        label={`${form.name || ''}`.toUpperCase()}
                        placeholder="(select type)"
                        options={form.options}
                        onChange={(_, selected) => handleChangeInput({
                          value: selected.value, key: form.key, replacer: '',
                        })}
                        value={selectValue || ''}
                      />
                    </>
                  )
                }
                {
                  !(form.type && form.type === 'select') && (
                    <Input
                      {...form}
                      label={form.name}
                      name={form.key}
                      key={`step1-${idx}`}
                      onChange={e => handleChangeInput({
                        key: form.key, value: e.target.value, replacer: form.replacer,
                      })}
                      value={fields[form.key] || ''}
                      errorMessage={
                        hasError ? 'Fields is required' : ''
                      }
                      disabled={fileLocal && finishedUpload}
                    />
                  )
                }
              </FormStyled>
            </React.Fragment>
          )
        })
      }
    </Cols>
  )
}

FormUpload.defaultProps = {
  handleChangeInput: () => {},
  fields: {},
  rules: {},
  fileLocal: false,
  percentage: 0,
}
FormUpload.propTypes = {
  handleChangeInput: PropTypes.func,
  fields: PropTypes.object,
  rules: PropTypes.object,
  fileLocal: PropTypes.bool,
  percentage: PropTypes.number,
}

export default FormUpload
