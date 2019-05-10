/* eslint-disable no-use-before-define */
import QueryString from 'query-string'
import { LOCATIONS } from 'config/constants'

export const isWindowExist = () => (typeof window !== 'undefined' && window !== null)

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
        try {
          const extData = getCurrentWindow('querystring').q
          decodedData = (!!extData && typeof extData !== 'undefined') ? JSON.parse(Buffer.from(decodeURIComponent(extData), 'base64').toString('ascii')) : dataValue
        } catch {
          decodedData = ''
        }
      }

      return decodedData
    },
  }

  return defineAction[typeAction]()
}

export const getCurrentWindow = type => {
  const defaultQs = {
    q: extendedData('encode'),
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
    [LOCATIONS.TRASH]: () => pathName.includes(LOCATIONS.TRASH),
    [LOCATIONS.FOLDER]: () => extendedData('decode').locationType === LOCATIONS.FOLDER,
    [LOCATIONS.ROOT]: () => extendedData('decode').locationType === LOCATIONS.ROOT,
    default: () => {},
  }

  return checkLocation[location]() || checkLocation.default()
}
