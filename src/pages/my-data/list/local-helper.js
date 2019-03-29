/****** 
What is LocalHelper? 
LocalHelper is collection of functions that set or get data on/from local Storage 

****/

import { LOCATIONS } from './constant'

export const location = window.localStorage.getItem('MYDATA.location');
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


export const isTrash = location === LOCATIONS.TRASH
export const isModel = location === LOCATIONS.MODEL
export const isPretrainedModel = location === LOCATIONS.PRETRAINED_MODEL
export const isDataset = location === LOCATIONS.DATASET
export const isInSystemFolder = ([LOCATIONS.TRASH, LOCATIONS.MODEL, LOCATIONS.PRETRAINED_MODEL, LOCATIONS.DATASET]).includes(location)
export const isLocationExist = typeof location !== 'undefined' && !!location && `${location}`.trim() !== '';