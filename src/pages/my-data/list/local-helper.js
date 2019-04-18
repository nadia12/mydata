/** ****
What is LocalHelper?
LocalHelper is collection of functions that set or get data on/from local Storage
consists of Location and breadcrumb
*** */

import { LOCATIONS } from 'Config/constants'

export const setRootLocation = () => {
  if (typeof window === 'undefined' || window === null) return

  window.localStorage.setItem('MYDATA.location', JSON.stringify({
    parentId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, entityId: LOCATIONS.ROOT, path: '',
  }))
  window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{
    name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT, label: 'My Data', entityId: LOCATIONS.ROOT, path: '',
  }]))
}

export const getLocation = () => {
  if (typeof window !== 'undefined' && window !== null) return window.localStorage.getItem('MYDATA.location')

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
export const isInSystemFolder = () => {
  const location = jLocation()

  const name = (!!location && location.name) || ''

  return ([
    LOCATIONS.TRASH,
    LOCATIONS.MODEL,
    LOCATIONS.PRETRAINED_MODEL,
    LOCATIONS.DATASET,
  ].includes(name))
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
  if (typeof window !== 'undefined' && window !== null) return window.localStorage.getItem('MYDATA.breadcrumb')

  return null
}

export const jBreadcrumb = () => {
  const breadcrumb = getBreadcrumb()
  if (!!breadcrumb && `${breadcrumb}`.trim() === '') return JSON.parse(breadcrumb)

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

  if (!exist) {
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

export const setLocationBy = locationName => {
  if (typeof window === 'undefined' || window === null) return

  window.localStorage.setItem('MYDATA.location', JSON.stringify({
    parentId: locationName,
    name: locationName,
    entityId: LOCATIONS.ROOT,
    path: '',
  }))
}

export const setLocation = () => {
  if (typeof window !== 'undefined' && window !== null) {
    const location = jLocation()
    window.localStorage.setItem('MYDATA.location', JSON.stringify(location))
  }
}
