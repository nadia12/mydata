import { replacer } from '../../../../config/constants'

export const DEFAULT_FIELDS = {
  datasetId: '',
  callbackUrl: '',
  name: '',
  clientId: '',
  clientSecret: '',
  isEnabled: true
}

export const DEFAULT_OPT_FIELDS = {
  datasetId: {} // { value: value, label: label, name: name }
}

const REGEX = {
  url: /^(http|s):\/\/.{1}/i
}

const ERROR_FIELD = ({ errorType, specialType = '' }) => {
  const errMsg = (type) => ({
    required: 'Field must be filled',
    typeValid: `Field must be a valid ${specialType} format`
  })
  return errMsg(specialType)[errorType] || ''
}

export const getErrorMessage = ({ fields, rules }) => {
  const { required, fields: fieldRules } = rules
  const errMessage = Object.entries(fields).reduce((carry, [key, value]) => {
    const isRequired = required.includes(key) && `${value || ''}`.trim() === ''
    const currRules = fieldRules.find((fr) => fr.name === key)
    const isTypeValid = !isRequired && !!currRules && !!currRules.regex && !REGEX[currRules.regex].test(value)

    let errMsg = ''
    if (isRequired) errMsg = ERROR_FIELD({ errorType: 'required' })
    else if (isTypeValid) errMsg = ERROR_FIELD({ errorType: 'typeValid', specialType: currRules.regex || '' })

    if (errMsg !== '') carry[key] = errMsg
    return carry
  }, {})

  return {
    errMessage,
    isValid: !!!errMessage || (!!errMessage && Object.keys(errMessage).length === 0)
  }
}

export const getRuleFields = {
  create: [
    { label: 'APP NAME', name: 'name', maxLength: 30, placeholder: 'App Name', replacer: replacer.specialAlphaNumeric, type: 'text' },
    { label: 'DATASET', name: 'datasetId', type: 'select', placeholder: '(select dataset)' },
    { label: 'CALLBACK URL', name: 'callbackUrl', placeholder: 'Callback URL', maxLength: 30, replacer: replacer.specialAlphaNumeric, type: 'text', regex: 'url' }
  ],
  overview: [
    { label: 'APP NAME', name: 'name', placeholder: 'App Name', maxLength: 30, replacer: replacer.specialAlphaNumeric, type: 'text' },
    { label: 'DATASET', name: 'datasetId', type: 'select', placeholder: '(select dataset)' },
    { label: 'CALLBACK URL', name: 'callbackUrl', placeholder: 'Callback URL', maxLength: 30, replacer: replacer.specialAlphaNumeric, type: 'text', regex: 'url' },
    { label: 'CLIENT ID', name: 'clientId', placeholder: 'Client Id', maxLength: 30, replacer: replacer.specialAlphaNumeric, type: 'text', disabled: true },
    { label: 'CLIENT SECRET', name: 'clientSecret', placeholder: 'Client Secret', maxLength: 30, replacer: replacer.specialAlphaNumeric, type: 'password', disabled: true }
  ],
  default: []
}

export const DEFAULT_RULES = {
  options: {
      datasetId: []
    }, // list options fields select => sesuai field name
  touched: {},
  fields: getRuleFields.overview,
  required: ['datasetId', 'callbackUrl', 'name']
}