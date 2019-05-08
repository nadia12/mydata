import QueryString from 'query-string'
import { LOCATIONS } from 'config/constants'
import { isWindowExist } from './local-helper'

export const getCurrentWindow = type => {
  let windowObject = {}

  const defaultQs = {
    breadcrumb: {},
    searchName: '',
    orderType: '',
    orderName: '',
    name: '',
  }

  if (isWindowExist()) {
    windowObject = {
      href: window.location.href,
      path: window.location.pathname,
      querystring: QueryString.parse(window.location.search) || defaultQs,
      default: '',
    }
  }

  return windowObject[type] || windowObject.default
}

export const checkPath = location => {
  const pathName = getCurrentWindow('path')
  const checkLocation = {
    [LOCATIONS.TRASH]: () => pathName.includes('trash'),
    [LOCATIONS.FOLDER]: () => pathName.includes('folder'),
    [LOCATIONS.ROOT]: () => pathName.includes('my-data'),
    default: () => {},
  }

  return checkLocation[location]() || checkLocation.default()
}

export const currentLocationType = () => {
  let loc = ''

  if (checkPath(LOCATIONS.TRASH)) loc = LOCATIONS.TRASH
  else if (checkPath(LOCATIONS.FOLDER)) loc = LOCATIONS.FOLDER
  else if (checkPath(LOCATIONS.ROOT)) loc = LOCATIONS.ROOT

  return loc
}

