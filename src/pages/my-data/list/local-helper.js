/** ****
What is LocalHelper?
LocalHelper is collection of functions that set or get data on/from local Storage
consists of Location and breadcrumb
*** */

import { LOCATIONS } from './constant'

export const getLocation = () => window.localStorage.getItem('MYDATA.location')
export const jLocation = () => {
  if (!!window) return JSON.parse(getLocation())

  return {}
}
export const isInSystemFolder = () => {
  const hasWindow = typeof window !== 'undefined' && window !== null

  if (!hasWindow) return false

  const { name } = hasWindow ? jLocation() : {}

  return ([
    LOCATIONS.TRASH,
    LOCATIONS.MODEL,
    LOCATIONS.PRETRAINED_MODEL,
    LOCATIONS.DATASET].includes(name)
  )
}

export const isInTrash = () => !!window && jLocation().name === LOCATIONS.TRASH
export const isInSensorGroup = () => !!window && jLocation().name === LOCATIONS.SENSOR_GROUP

export const getBreadcrumb = () => {
  if (typeof window !== 'undefined' && window !== null) {
    return window.localStorage.getItem('MYDATA.breadcrumb')
  }

  return null
}
export const isBreadcrumbExist = () => (!!getBreadcrumb() && getBreadcrumb().length)

// set breadcrumb only for dataset, model and trash
export const setBreadcrumb = () => {
  const jBreadcrumb = isBreadcrumbExist ? JSON.parse(getBreadcrumb()) : []
  const breadcrumbIdx = jBreadcrumb.length || 0

  if (!isBreadcrumbExist && !!window) {
    const location = getLocation()
    jBreadcrumb.push({
      label: location, name: location, entityId: location, idx: breadcrumbIdx, path: '',
    })
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb))
  }
}

export const setJBreadcrumb = () => {
  const jBreadcrumb = isBreadcrumbExist ? JSON.parse(getBreadcrumb()) : []
  const breadcrumbIdx = jBreadcrumb.length || 0
  const location = getLocation()

  if (!isBreadcrumbExist && !!window) {
    jBreadcrumb.push({
      label: location, name: location, entityId: location, idx: breadcrumbIdx, path: '',
    })
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb))
  }
}

export const setRootLocation = () => {
  if (!getLocation() && !!window) {
    window.localStorage.setItem('MYDATA.location', JSON.stringify({
      parentId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, entityId: LOCATIONS.ROOT, path: '',
    }))
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{
      name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT, label: 'My Data', entityId: LOCATIONS.ROOT, path: '',
    }]))
  }
}

export const setLocation = () => {
  if (!!window) window.localStorage.setItem('MYDATA.location', JSON.stringify(jLocation()))
}
