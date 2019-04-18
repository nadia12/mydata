/** ****
What is LocalHelper?
LocalHelper is collection of functions that set or get data on/from local Storage
consists of Location and breadcrumb
*** */

import { LOCATIONS } from 'Config/constants'

export const getLocation = () => window.localStorage.getItem('MYDATA.location')
export const jLocation = () => (!!getLocation() ? JSON.parse(getLocation()) : {})
export const isInSystemFolder = () => {
  const { name } = jLocation()

  return ([
    LOCATIONS.TRASH,
    LOCATIONS.MODEL,
    LOCATIONS.PRETRAINED_MODEL,
    LOCATIONS.DATASET].includes(name)
  )
}

export const isInTrash = () => jLocation().name === LOCATIONS.TRASH
export const isInSensorGroup = () => jLocation().name === LOCATIONS.SENSOR_GROUP

export const getBreadcrumb = () => window.localStorage.getItem('MYDATA.breadcrumb')
export const isBreadcrumbExist = () => (!!getBreadcrumb() && getBreadcrumb().length)

export const setRootLocation = () => {
  window.localStorage.setItem('MYDATA.location', JSON.stringify({
    parentId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, entityId: LOCATIONS.ROOT, path: '',
  }))
  window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{
    name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT, label: 'My Data', entityId: LOCATIONS.ROOT, path: '',
  }]))
}

export const setBreadcrumbBy = locationName => {
  const breadcrumb = getBreadcrumb()
  const breadcrumbExist = breadcrumb !== null && `${breadcrumb}`.trim() !== ''
  let jBreadcrumb = breadcrumbExist ? JSON.parse(breadcrumb) : []
  const breadcrumbIdx = jBreadcrumb.length || 0

  const exist = (jBreadcrumb.length > 1) && jBreadcrumb.findIndex(bc => bc.label === locationName) > -1

  if (!exist) {
    jBreadcrumb = [
      ...jBreadcrumb,
      {
        label: locationName,
        name: locationName,
        entityId: locationName,
        idx: breadcrumbIdx,
        path: '',
      },
    ]
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb))
  }
}

export const setLocationBy = locationName => {
  window.localStorage.setItem('MYDATA.location', JSON.stringify({
    parentId: locationName,
    name: locationName,
    entityId: LOCATIONS.ROOT,
    path: '',
  }))
}

export const setLocation = () => {
  window.localStorage.setItem('MYDATA.location', JSON.stringify(jLocation()))
}
