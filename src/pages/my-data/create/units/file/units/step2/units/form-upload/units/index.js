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
  } = props

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
              <FormStyled>
                {
                  form.type && form.type === 'select' && (
                    <>
                      <Select
                        name={form.key}
                        label={`${form.name || ''}`.toUpperCase()}
                        placeholder="(select type)"
                        options={form.options}
                        onChange={selected => handleChangeInput({
                          value: selected.value, key: form.key, replacer: '',
                        })}
                        value={selectValue}
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
}
FormUpload.propTypes = {
  handleChangeInput: PropTypes.func,
  fields: PropTypes.object,
  rules: PropTypes.object,
}

export default FormUpload
