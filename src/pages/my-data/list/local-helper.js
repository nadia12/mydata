/****** 
What is LocalHelper? 
LocalHelper is collection of functions that set or get data on/from local Storage 

****/

import { LOCATIONS } from './constant'
// const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb');
// export const currentLocation = JSON.parse(location);
// export const currentBreadcrumb = JSON.parse(breadcrumb);

// export const getLocalBreadcrumb = () =>{
//   const location = window.localStorage.getItem('MYDATA.location');
//   const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb');

//   const locationExist = typeof location !== 'undefined' && !!Location;
//   const breadcrumbExist = typeof breadcrumb !== 'undefined' && !!breadcrumb;
//   if (!locationExist) {
//     // if location on local not defined. it will be set on root.
//     window.localStorage.setItem('MYDATA.location', JSON.stringify({ parentId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, entityId: LOCATIONS.ROOT, path: '' }));
//     window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{ name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT, label: 'My Data', entityId: LOCATIONS.ROOT, path: '' }]));
//   }
//   let jBreadcrumb = [];
//   if (breadcrumbExist) jBreadcrumb = JSON.parse(breadcrumb);
// }

// // const location = window.localStorage.getItem('MYDATA.location'),
// // const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb'),

// export const localBreadcrumb = {
//   isLocationExist: typeof location !== 'undefined' && !!location,
//   isBreadcrumbExist:  typeof breadcrumb !== 'undefined' && !!breadcrumb,
//   setOnLocal: () =>{
//     if (!localBreadcrumb.isLocationExist) {
//       window.localStorage.setItem('MYDATA.location', JSON.stringify({ parentId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, entityId: LOCATIONS.ROOT, path: '' }));
//       window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{ name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT, label: 'My Data', entityId: LOCATIONS.ROOT, path: '' }]));
//     }
//   },
//   setJBreadcrumb: () => localBreadcrumb.breadcrumbExist ? JSON.parse(breadcrumb) : ''
// }


export const isInTrash = location === LOCATIONS.TRASH
export const isInModel = location === LOCATIONS.MODEL
export const isInPretrainedModel = location === LOCATIONS.PRETRAINED_MODEL
export const isInDataset = location === LOCATIONS.DATASET
export const isInSensorGroup = location === LOCATIONS.SENSOR_GROUP
export const isInSystemFolder = ([LOCATIONS.TRASH, LOCATIONS.MODEL, LOCATIONS.PRETRAINED_MODEL, LOCATIONS.DATASET]).includes(location)

export const location = window.localStorage.getItem('MYDATA.location')
export const isLocationExist = !!location

export const jLocation = isLocationExist ? JSON.parse(location) : [];

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