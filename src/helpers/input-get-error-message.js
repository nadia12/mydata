const REGEX = {
  dotNumeric: /[^.0-9]/gi,
  specialAlphaNumeric: /[^ A-Z0-9/\\:!@#$%^&*)(+=._-]/gi,
  alphaNumeric: /[^ A-Z0-9]/gi,
  numeric: /[^0-9]/gi,
  alpha: /[^a-z]/gi,
}

const ERROR_FIELD = ({ errorType, specialType = '' }) => {
  const errMsg = type => ({
    required: 'Field must be filled',
    typeValid: `Field must be a valid ${type} format`,
  })

  return errMsg(specialType)[errorType] || ''
}

const getErrorMessage = ({ fields = {}, rules }) => {
  const { required, fields: fieldRules } = rules
  const errMessage = Object.entries(fields).reduce((carry, [key, value]) => {
    const newCarry = { ...carry }
    const isRequired = (required || []).includes(key) && `${value || ''}`.trim() === ''
    const currRules = (fieldRules || []).find(fr => fr.name === key)
    const isTypeValid = !isRequired && !!currRules && !!currRules.regex && !REGEX[currRules.regex].test(value)

    let errMsg = ''
    if (isRequired) errMsg = ERROR_FIELD({ errorType: 'required' })
    else if (isTypeValid) errMsg = ERROR_FIELD({ errorType: 'typeValid', specialType: currRules.regex || '' })

    if (errMsg !== '') newCarry[key] = errMsg

    return newCarry
  }, {})

  return errMessage
}

export default getErrorMessage
