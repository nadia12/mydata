import uuidv4 from 'uuid/v4'
import Method from 'Config/constants/request-method'

import {
  FILE_TYPES,
} from 'Config/constants'
import { DEFAULT_TYPE_LABEL, LOCATIONS } from '../../../constant'
import { handleSearchTypeChange } from '../../../function'

import {
  POST_NEW_FOLDER_REQUEST,
  POST_NEW_FOLDER_SUCCESS,
  POST_NEW_FOLDER_ERROR,
} from './action-type'

import { setToggleModalClose } from '../../../reducer'

// === ADD ENTITY ON MODAL [NEW FOLDER]
const postNewFolder = (reqData, cb) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataList: {
        entities,
      },
    },
    volantisConstant: {
      cookie: { user: userInfo, auth: authCookie },
      service: { endpoint: { libraDirectory } },
    },
  } = getState()

  const driveId = userInfo.owner_id || ''

  return dispatch({
    type: [
      POST_NEW_FOLDER_REQUEST,
      POST_NEW_FOLDER_SUCCESS,
      POST_NEW_FOLDER_ERROR,
    ],
    shuttle: {
      path: `${libraDirectory}/${driveId}/collection`,
      method: Method.post,
      payloads: reqData,
    },
    authCookie,
    nextAction: (res, err) => {
      const data = typeof res !== 'undefined' && !!res ? [...entities, res] : entities
      cb(data, err)
    },
  })
}

export const handleAddNewFolder = () => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataList: {
        fields,
      },
    },
    volantisConstant: { cookie: { user: userInfo } },
  } = getState()

  const driveId = userInfo.owner_id || ''
  const creatorName = userInfo.name || ''
  const creatorId = userInfo.id || ''
  const location = (!!window && window.localStorage.getItem('MYDATA.location')) || ''
  const isLocationExist = location !== ''

  const data = {
    type: FILE_TYPES.COLLECTION,
    name: fields.newFolder.folderName,
    parentId: isLocationExist ? JSON.parse(location).entityId : LOCATIONS.ROOT,
    creatorName,
    creatorId,
    size: 0,
    driveId,
    entityType: null,
    additionalData: null,
    id: uuidv4(),
  }
  dispatch(postNewFolder(data, () => {
    dispatch(handleSearchTypeChange(DEFAULT_TYPE_LABEL)) // return the default search to all type
    dispatch(setToggleModalClose('newFolder'))
    // (this.props.list.errorMsg !== '') this.toggleShow('failedCreateEntity', { type: 'failedCreateEntity' });
  }))
}
// === END ADD ENTITY ON MODAL [NEW FOLDER]
