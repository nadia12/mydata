import moment from 'moment'
import { dateFormats } from './constant'

const REGEX = {
  currency: /[a-zA-Z$.]{1,}?(([0-9]\d{0,2}(,|.\d{3})*)|\d+)/,
  number: /^[-+]?[0-9]{1,}(.[0-9]{1,})?/,
  hasStr: /[^0-9.]/,
  uuid4: /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/,
  latLng: /[0-9.]{1,}\s{0,1},\s{0,1}[0-9.]{1,}/,
}

const validateDate = value => {
  const validDate1 = moment(value, moment.ISO_8601, true).isValid()
  const validDate2 = moment(value, dateFormats, true).isValid()

  return (validDate1 || validDate2)
}

const validateBoolean = value => (value === 'false' || value === 'true')

const validateCharacter = (value = '') => (value.length === 1)

const validateString = value => new RegExp(REGEX.hasStr, 'gi').test(value)

const validateNull = value => typeof value === 'undefined' || value === 'null' || value === null

const validateNumber = (value = '') => {
  const isNumber = new RegExp(REGEX.number, 'gi').test(value)

  return isNumber || typeof value === 'number'
}

const validateCurrency = (value = '') => (new RegExp(REGEX.currency, 'gi').test(value))

const validateByte = (value = 1) => (value >= -128 && value <= 127)

const validateShort = (value = 1) => (value >= -32768 && value <= 32767)

const validateInteger = (value = 1) => {
  const intPow = 2 ** 31
  const isInteger = value >= -1 * intPow && value <= intPow - 1

  return isInteger
}

const validateLong = value => {
  const longPow = 2 ** 63
  const isLong = value >= -1 * longPow && value <= longPow - 1

  return isLong
}

const validateGeoshape = (value = '') => (new RegExp(REGEX.latLng, 'gi').test(value))

const validateUUID = (value = '') => (new RegExp(REGEX.uuid4, 'gi').test(value))

export const setDataType = value => {
  let datum = value
  const isNumber = validateNumber(datum)
  const dataType = ['String']
  const isDate = validateDate(value)
  const isCurrency = validateCurrency(datum)

  if (validateNull(value)) return dataType
  if (validateBoolean(value)) dataType.push('Boolean')
  if (isCurrency) datum = value.replace(REGEX.currency, '$1').replace(/,/g, '.')
  if (value.length > 1) {
    if (value.startsWith('-') || value.startsWith('+')) datum = value.substr(1)
    if (validateString(datum)) {
      if (validateUUID(value)) dataType.push('UUID')
      if (validateGeoshape(value)) dataType.push('Geoshape')
      if (validateDate(value)) dataType.push('Date')
    }
  }
  if (!isNumber && validateCharacter(value)) dataType.push('Character')
  if ((isNumber && !isDate) || isCurrency) {
    const numDatum = isCurrency ? datum.replace(REGEX.currency, '$1') : Number(`${value}`)
    if (isCurrency || (value.substr(-2, 1) === '.')) dataType.push('Float')
    if (isCurrency || (value.substr(-3, 1) === '.')) dataType.push('Double')
    if (!isCurrency && validateByte(numDatum)) dataType.push('Byte')
    if (!isCurrency && validateShort(numDatum)) dataType.push('Short')
    if (isCurrency || validateInteger(numDatum)) dataType.push('Integer')
    if (isCurrency || validateLong(numDatum)) dataType.push('Long')
  }

  return dataType
}
