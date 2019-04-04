/****** 
What is LocalHelper? 
LocalHelper is collection of functions that set or get data on/from local Storage 

****/

import { LOCATIONS } from './constant'
export const location = window.localStorage.getItem('MYDATA.location')
export const isLocationExist = !!location

export const jLocation = isLocationExist ? JSON.parse(location) : [];

export const isInTrash = jLocation.name === LOCATIONS.TRASH
export const isInModel = jLocation.name === LOCATIONS.MODEL
export const isInPretrainedModel = jLocation.name === LOCATIONS.PRETRAINED_MODEL
export const isInDataset = jLocation.name === LOCATIONS.DATASET
export const isInSensorGroup = jLocation.name === LOCATIONS.SENSOR_GROUP
export const isInSystemFolder = ([LOCATIONS.TRASH, LOCATIONS.MODEL, LOCATIONS.PRETRAINED_MODEL, LOCATIONS.DATASET]).includes(jLocation.name)


export const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb')
export const isBreadcrumbExist = typeof breadcrumb !== 'undefined' && !!breadcrumb

  // set breadcrumb only for dataset, model and trash
export const setBreadcrumb = () => {
  const jBreadcrumb = breadcrumbExist ? JSON.parse(breadcrumb) : [];
  const breadcrumbIdx = jBreadcrumb.length || 0;

  if (!isBreadcrumbExist) {
    jBreadcrumb.push({ label: location, name: location, entityId: location, idx: breadcrumbIdx, path: '' });
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb));
  }
}

export const setJBreadcrumb = (Jbreadcrumb) => {
  const jBreadcrumb = breadcrumbExist ? JSON.parse(breadcrumb) : [];
  const breadcrumbIdx = jBreadcrumb.length || 0;

  if (!isBreadcrumbExist) {
    jBreadcrumb.push({ label: location, name: location, entityId: location, idx: breadcrumbIdx, path: '' });
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb));
  }
}

export const setRootLocation = () =>{
  if (!isLocationExist) {
    window.localStorage.setItem('MYDATA.location', JSON.stringify({ parentId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, entityId: LOCATIONS.ROOT, path: '' }));
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{ name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT, label: 'My Data', entityId: LOCATIONS.ROOT, path: '' }]));
  }
}

export const setLocation = (jLocation) => {
  window.localStorage.setItem('MYDATA.location', JSON.stringify(jLocation));
}