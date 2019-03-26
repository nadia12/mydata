/*
Location: api-management > units > index.js
*/
import React, { useState } from 'react'
import {
  Input,
  Checkbox,
  Label,
  Button
} from 'volantis-ui'
import PropTypes from 'prop-types'

// import {
//   DEFAULT_FIELDS, // untuk fields
//   DEFAULT_OPT_FIELDS, // untuk select options
//   getRuleFields,
//   getErrorMessage,
//   DEFAULT_RULES,
//   CONFIRMATION_CONTENT,
//   DEFAULT_MODAL
// } from '../constant'

// import inputReplacer from '../../../../../helpers/input-replacer'
// import checkRequired from '../../../../../helpers/input-check-required'

const TabOverview = ({
    detail, isValid, rules, fields, fieldsError,
    putApp, handleChangeInput, handleChangeToggle
  }) => {
  // const [isValid, setIsValid] = useState(true)
  // const [showModal, setShowModal] = useState({ ...DEFAULT_MODAL })
  // const [fields, setFields] = useState({ ...DEFAULT_FIELDS, ...detail })
  // const [optFields, setOptFields] = useState({ ...DEFAULT_OPT_FIELDS })
  // const [rules, setRules] = useState({ ...DEFAULT_RULES })
  // const [fieldsError, setFieldsError] = useState([])

  // const handleChangeInput = ({ key, value, replacer = '', valueReplacer = '' }) => {
  //   if (key === 'callbackUrl') {
  //     setShowModal((prevModal) => ({ ...prevModal, [key]: !key}))
  //   } else {
  //     const currentData = { ...fields, [key]: replacer === '' ? value : inputReplacer({ replacer, value, valueReplacer }) }
  //     const currentRules = {
  //       ...rules,
  //       touched: { ...rules.touched, [key]: true }
  //     }
  //     const { isValid, errMessage } = getErrorMessage({ fields: currentData, rules: currentRules })
  //     setFields(currentData)
  //     setRules(currentRules)
  //     setFieldsError(errMessage)
  //     setIsValid(isValid)
  //   }
  // }
  
  // const handleChangeToggle = ({ key = '' }) => {
  //   setFields((prevFields) => {
  //     const fields = { ...prevFields }
  //     if (key === 'isEnabled' && fields[key]) {
  //       setShowModal((prevModal) => ({ ...prevModal, [key]: !key}))
  //     } else {
  //       fields[key] = !fields[key]
  //     }
  //     return fields
  //   })
  // }

  // const handleSubmit = () => {
  //   console.log('submit =====>', fields)
  //   putApp(fields)
  // }

  // const resetAll = () => {
  //   setIsValid(true)
  //   setFields({ ...DEFAULT_FIELDS })
  //   setRules({ ...DEFAULT_RULES })
  //   setFieldsError([])
  // }
  return (
    <>
      <div className="full-field">
        <div className="p10px">
          <Label value="APP ACCESS" />
          <Checkbox
            isChecked={fields.isEnabled}
            onChange={handleChangeToggle}
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

      <Button
        name="Save"
        disabled={!isValid}
        onClick={putApp}
      />
    </>
  )
}

TabOverview.propTypes = {
  putApp: PropTypes.func,
  handleChangeInput: PropTypes.func,
  handleChangeToggle: PropTypes.func,
  fieldsError: PropTypes.array,
  rules: PropTypes.object,
  fields: PropTypes.object,
  isValid: PropTypes.bool,
  showModal: PropTypes.object,
  optFields: PropTypes.array
}

TabOverview.defaultProps = {
  putApp: () => {},
  handleChangeInput: () => {},
  handleChangeToggle: () => {},
  fieldsError: [],
  rules: {},
  fields: {},
  showModal: {},
  isValid: false,
  optFields: []
}

export default (TabOverview)