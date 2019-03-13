import React, { useState } from 'react'
import { Input, ToggleButton, Label } from 'volantis-ui'
import PropTypes from 'prop-types'

import {
  DEFAULT_FIELDS, // untuk fields
  DEFAULT_OPT_FIELDS, // untuk select options
  getRuleFields,
  getErrorMessage,
  DEFAULT_RULES,
  CONFIRMATION_CONTENT,
  DEFAULT_MODAL
} from '../constant'

import inputReplacer from '../../../../../helpers/input-replacer'
import checkRequired from '../../../../../helpers/input-check-required'

const TabOverview = ({ detail, putApp }) => {
  const [isValid, setIsValid] = useState(true)
  const [showModal, setShowModal] = useState({ ...DEFAULT_MODAL })
  const [fields, setFields] = useState({ ...DEFAULT_FIELDS, ...detail })
  const [optFields, setOptFields] = useState({ ...DEFAULT_OPT_FIELDS })
  const [rules, setRules] = useState({ ...DEFAULT_RULES })
  const [fieldsError, setFieldsError] = useState([])

  const handleChangeInput = ({ key, value, replacer = '', valueReplacer = '' }) => {
    if (key === 'callbackUrl') {
      setShowModal((prevModal) => ({ ...prevModal, [key]: !key}))
    } else {
      const currentData = { ...fields, [key]: replacer === '' ? value : inputReplacer({ replacer, value, valueReplacer }) }
      const currentRules = {
        ...rules,
        touched: { ...rules.touched, [key]: true }
      }
      const { isValid, errMessage } = getErrorMessage({ fields: currentData, rules: currentRules })
      setFields(currentData)
      setRules(currentRules)
      setFieldsError(errMessage)
      setIsValid(isValid)
    }
  }
  
  const handleChangeToggle = ({ key = '' }) => {
    setFields((prevFields) => {
      const fields = { ...prevFields }
      if (key === 'isEnabled' && fields[key]) {
        setShowModal((prevModal) => ({ ...prevModal, [key]: !key}))
      } else {
        fields[key] = !fields[key]
      }
      return fields
      // ({ ...prevFields, [key]: !prevFields[key] })
    })
  }

  const handleSubmit = () => {
    console.log('submit =====>', fields)
    putApp(fields)
  }

  const resetAll = () => {
    setIsValid(true)
    setFields({ ...DEFAULT_FIELDS })
    setRules({ ...DEFAULT_RULES })
    setFieldsError([])
  }
  return (
    <>
      <div className="full-field">
        <div className="p10px">
          <Label value="APP ACCESS" />
          <ToggleButton
            isChecked={fields.isEnabled}
            onChange={() =>handleChangeToggle({ key: 'isEnabled' })}
            title="Access Button"
          />
        </div>
      </div>
      {
        !!rules && !!rules.fields && rules.fields.length > 0 && rules.fields.map((rule, idx) => (
          <Input
            key={idx}
            title={rule.title}
            name={rule.name}
            placeholder={rule.placeholder}
            maxLength={rule.maxLength}
            replacer={rule.replacer}
            type={rule.type}
            regex={rule.regex}
            isDisabled={rule.isDisabled}
            value={fields[rule.name]}
            errorMessage={!!fieldsError ? rules.touched[rule.name] && fieldsError[rule.name] || '': ''}
            onChange={ ({ target: { value} }) => handleChangeInput({ key: rule.name, value, replacer: rule.replacer || '' })
            }
          />
        ))
      }
    </>
  )
}

TabOverview.propTypes = {
  detail: PropTypes.object,
  putApp: PropTypes.func
}

TabOverview.defaultProps = {
  detail: {},
  putApp: () => {}
}

export default TabOverview