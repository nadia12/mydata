import React from 'react'
import PropTypes from 'prop-types'
import {
  Select,
  Input,
} from 'volantis-ui'

import {
  ColsStyled,
} from 'GlobalComponent/cols/units'

const Step2Input = ({
  fields,
  form,
  errorMessage,
  idx,
  handleChangeInput,
  parent = false,
}) => {
  const formInput = { ...form, label: '' }
  if (parent) formInput.label = form.name

  return (
    <ColsStyled padding={24}>
      {
        form && form.type && form.type === 'select' && (
          <>
            <Select
              isMulti={form.isMultiSelect}
              label={!parent ? (form.name || '').toUpperCase() : ''}
              name={form.key}
              placeholder="(select type)"
              options={form.options}
              onChange={(_, selected) => handleChangeInput({ value: selected, key: form.key })}
              value={fields[form.key]}
            />
          </>
        )
      }
      {
        !(form.type && form.type === 'select') && (
          <span className={form.name === '' ? 'mt-label' : ''}>
            <Input
              {...formInput}
              placeholder={`${form.name}`}
              key={`step1-${idx}`}
              onChange={e => handleChangeInput({
                step: 'step1', key: form.key, value: e.target.value, replacer: form.replacer || '',
              })}
              value={fields[form.key] || ''}
              errorMessage={errorMessage}
            />
          </span>
        )
        }
    </ColsStyled>
  )
}

Step2Input.propTypes = {
  fields: PropTypes.object,
  rules: PropTypes.array,
  form: PropTypes.object,
  idx: PropTypes.number,
  handleChangeInput: PropTypes.func,
  errorMessage: PropTypes.string,
  parent: PropTypes.bool,
}

Step2Input.defaultProps = {
  fields: {},
  rules: [],
  form: {},
  idx: -1,
  handleChangeInput: () => {},
  parent: false,
  errorMessage: '',
}

export default Step2Input
