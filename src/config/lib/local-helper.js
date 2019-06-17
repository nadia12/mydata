/** ****
What is LocalHelper?
LocalHelper is collection of functions that set or get data on/from local Storage
consists of Location and breadcrumb
*** */

import { LOCATIONS } from 'Config/constants'

export const isWindowExist = () => (typeof window !== 'undefined' && window !== null)

export const setRootLocation = () => {
  if (!isWindowExist()) return

  window.localStorage.setItem('MYDATA.location', JSON.stringify({
    parentId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, entityId: LOCATIONS.ROOT, path: '',
  }))
  window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{
    name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT, label: 'My Data', entityId: LOCATIONS.ROOT, path: '',
  }]))
}

export const setTrashLocation = () => {
  if (!isWindowExist()) return

  window.localStorage.setItem('MYDATA.location', JSON.stringify({
    parentId: LOCATIONS.TRASH, name: LOCATIONS.TRASH, entityId: LOCATIONS.ROOT, path: '',
  }))
  window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{
    name: LOCATIONS.TRASH, parentId: LOCATIONS.TRASH, label: 'Trash', entityId: LOCATIONS.ROOT, path: '',
  }]))
}

export const getLocation = () => {
  if (isWindowExist()) return window.localStorage.getItem('MYDATA.location')

  return null
}
export const jLocation = () => {
  const location = getLocation()
  if (!!location && `${location}`.trim() !== '') return JSON.parse(location)

  setRootLocation()

  return {
    parentId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, entityId: LOCATIONS.ROOT, path: '',
  }
}

export const isInTrash = () => {
  const location = jLocation()
  const name = (!!location && location.name) || ''

  return name === LOCATIONS.TRASH
}

export const isInSensorGroup = () => {
  const location = jLocation()
  const name = (!!location && location.name) || ''

  return name === LOCATIONS.SENSOR_GROUP
}

export const getBreadcrumb = () => {
  if (isWindowExist()) return window.localStorage.getItem('MYDATA.breadcrumb')

  return null
}

export const jBreadcrumb = () => {
  const breadcrumb = getBreadcrumb()
  if (!!breadcrumb && `${breadcrumb}`.trim() !== '') return JSON.parse(breadcrumb)

  setRootLocation()

  return [{
    name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT, label: 'My Data', entityId: LOCATIONS.ROOT, path: '',
  }]
}

export const isBreadcrumbExist = () => !!jBreadcrumb

export const setBreadcrumbBy = entity => {
  const currJBreadcrumb = jBreadcrumb()

  if (currJBreadcrumb === null || !Array.isArray(currJBreadcrumb)) return null

  const breadcrumbIdx = currJBreadcrumb.length || 0

  const newJBreadcrumb = [
    ...currJBreadcrumb,
    {
      label: entity.name,
      name: entity.name,
      entityId: entity.id,
      parentId: entity.id,
      idx: breadcrumbIdx,
      path: entity.path,
    },
  ]

  return newJBreadcrumb
}

export const setLocationBreadcrumbBy = locationName => {
  if (!isWindowExist()) return
  window.localStorage.setItem('MYDATA.location', JSON.stringify({
    parentId: locationName,
    name: locationName,
    entityId: locationName,
    path: '',
  }))

  window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{
    name: locationName,
    parentId: locationName,
    label: locationName,
    entityId: locationName,
    path: '',
  }]))
}

export const setPrev = prevValue => {
  window.localStorage.setItem('MYDATA.prev', JSON.stringify(prevValue))
}

