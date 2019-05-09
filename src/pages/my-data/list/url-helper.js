/* eslint-disable no-use-before-define */
import QueryString from 'query-string'
import { LOCATIONS } from 'config/constants'
import { isWindowExist } from './local-helper'

/* * == default value ==
  breadcrumb: {},
  searchName: '',
  orderType: '',
  orderName: '',
  name: '',
  locationType: ''* */
export const defaultDataValue = {
  locationType: LOCATIONS.ROOT,
}

export const extendedData = (typeAction, dataValue = defaultDataValue) => {
  const defineAction = {
    encode: () => isWindowExist() && encodeURIComponent(Buffer.from(JSON.stringify(dataValue)).toString('base64')),
    decode: () => {
      let decodedData = dataValue
      if (isWindowExist()) {
        const extData = getCurrentWindow('querystring')['extended-data']
        decodedData = typeof extData !== 'undefined' ? JSON.parse(Buffer.from(decodeURIComponent(extData), 'base64').toString('ascii')) : dataValue
      }

      return decodedData
    },
  }

  return defineAction[typeAction]()
}

export const getCurrentWindow = type => {
  const defaultQs = {
    'extended-data': extendedData('encode'),
  }
  if (isWindowExist()) {
    const windowObject = {
      href: window.location.href,
      path: window.location.pathname,
      querystring: QueryString.parse(window.location.search) || defaultQs,
    }

    return windowObject[type] || ''
  }

  return ''
}

export const checkPath = location => {
  const pathName = getCurrentWindow('path')
  const checkLocation = {
    [LOCATIONS.TRASH]: () => pathName.includes('trash'),
    [LOCATIONS.FOLDER]: () => extendedData('decode').locationType === LOCATIONS.FOLDER,
    [LOCATIONS.ROOT]: () => extendedData('decode').locationType === LOCATIONS.ROOT,
    default: () => {},
  }

  return checkLocation[location]() || checkLocation.default()
}

export const currentLocationType = locationType => {
  if (!!locationType) return locationType

  return (typeof locationType === 'undefined' && checkPath(LOCATIONS.TRASH)) ? LOCATIONS.TRASH : LOCATIONS.ROOT
}
