import uuidv4 from 'uuid/v4';
import Method from 'Config/constants/request-method'
import Hostname from 'Config/constants/hostname'

import { DEFAULT_TYPE_LABEL, FILE_TYPES, LOCATIONS } from '../../../constant'
import { handleSearchTypeChange } from '../../../function'

import {
  POST_NEW_FOLDER_REQUEST,
  POST_NEW_FOLDER_SUCCESS,
  POST_NEW_FOLDER_ERROR,
} from './action-type'

import { isLocationExist, location } from '../../../local-helper'
import { setToggleModalClose } from '../../../reducer';

// === ADD ENTITY ON MODAL [NEW FOLDER]
const postNewFolder= (reqData, cb) => (dispatch, getState) => {
  const authCookie = getState()._mydataList.authCookie || "z5PyGqlECp7ZRrF4eOLVWAzc9eICRTSeNDOJYDmNcPVwtr3vyQDkrACp6uv6vsU2"
  const { entities }= getState()._mydataList;

  return dispatch({
    type: [
      POST_NEW_FOLDER_REQUEST,
      POST_NEW_FOLDER_SUCCESS,
      POST_NEW_FOLDER_ERROR
    ],
    shuttle: {
      path: `/v1/directory/${reqData.driveId}/collection?access_token=${authCookie}`,
      method: Method.post,
      endpoint: Hostname.root,
      payloads: reqData
    },
    authCookie,
    nextAction: (res, err) => {
      const data = typeof res !== 'undefined' && !!res ? [...entities, res] : entities;
      cb(data, err)
    }
  })
}

export const handleAddNewFolder = () => (dispatch, getState) => {
  const { fields, headers } = getState()._mydataList
  const data = {
    type: FILE_TYPES.COLLECTION,
    name: fields.newFolder.folderName,
    parentId: isLocationExist ? JSON.parse(location).entityId : LOCATIONS.ROOT,
    creatorName: headers['V-CREATORNAME'],
    creatorId: headers['V-CREATORID'],
    size: 0,
    driveId: headers['V-DRIVEID'],
    entityType: null,
    additionalData: null,
    id: uuidv4()
  };
  dispatch(postNewFolder(data, ()=>{
    dispatch(handleSearchTypeChange(DEFAULT_TYPE_LABEL)) // return the default search to all type
    dispatch(setToggleModalClose('newFolder'))
    // (this.props.list.errorMsg !== '') this.toggleShow('failedCreateEntity', { type: 'failedCreateEntity' });
  }))
}
// === END ADD ENTITY ON MODAL [NEW FOLDER]