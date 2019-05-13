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

export const setBreadcrumbBy = locationName => {
  let jBreadcrumbs = jBreadcrumb()

  if (jBreadcrumbs === null || !Array.isArray(jBreadcrumbs)) return null

  const breadcrumbIdx = jBreadcrumbs.length
  const exist = (breadcrumbIdx > 1) && jBreadcrumbs.some(bc => bc.label === locationName)

  if (!exist && isWindowExist()) {
    jBreadcrumbs = [
      ...jBreadcrumbs,
      {
        label: locationName,
        name: locationName,
        entityId: locationName,
        idx: breadcrumbIdx,
        path: '',
      },
    ]
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumbs))
  }
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
