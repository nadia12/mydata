import React, { useState } from 'react'
import { Input } from 'volantis-ui'
import PropTypes from 'prop-types'

import {
  DEFAULT_FIELDS, // untuk fields
  DEFAULT_OPT_FIELDS, // untuk select options
  getRuleFields,
  getErrorMessage,
  DEFAULT_RULES
} from '../constant'

import inputReplacer from '../../../../../helpers/input-replacer'
import checkRequired from '../../../../../helpers/input-check-required'

const TabOverview = ({
  detail
}) => {
  const [isValid, setIsValid] = useState(true)
  const [fields, setFields] = useState({ ...DEFAULT_FIELDS, ...detail })
  const [optFields, setOptFields] = useState({ ...DEFAULT_OPT_FIELDS })
  const [rules, setRules] = useState({ ...DEFAULT_RULES })
  const [fieldsError, setFieldsError] = useState([])

  const handleChangeInput = ({ key, value, replacer = '', valueReplacer = '' }) => {
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

  const resetAll = () => {
    setIsValid(true)
    setFields({ ...DEFAULT_FIELDS })
    setRules({ ...DEFAULT_RULES })
    setFieldsError([])
  }
  return (
    <>
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
  detail: PropTypes.object
}

TabOverview.defaultProps = {
  detail: {}
}

export default TabOverview