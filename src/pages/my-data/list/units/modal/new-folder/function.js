import uuidv4 from 'uuid/v4'
import Method from 'Config/constants/request-method'

import {
  FILE_TYPES,
  LOCATIONS,
} from 'Config/constants'
import { getCookie } from 'Helpers/get-cookie'
import { DEFAULT_TYPE_LABEL } from '../../../constant'
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
      cookie: { user: userInfoName, auth: authCookie },
      service: { endpoint: { emmaDirectory } },
    },
  } = getState()

  const userInfo = getCookie({ cookieName: userInfoName })
  const driveId = userInfo.owner_id || ''

  return dispatch({
    type: [
      POST_NEW_FOLDER_REQUEST,
      POST_NEW_FOLDER_SUCCESS,
      POST_NEW_FOLDER_ERROR,
    ],
    shuttle: {
      path: `${emmaDirectory}/${driveId}/entity`,
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
    volantisConstant: { cookie: { user: userInfoName } },
  } = getState()

  const userInfo = getCookie({ cookieName: userInfoName })
  const driveId = userInfo.owner_id || ''
  const creatorName = userInfo.name || ''
  const creatorId = userInfo.id || ''
  const location = (typeof window !== 'undefined' && window !== null && window.localStorage.getItem('MYDATA.location')) || ''
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
    mime: 'UNDEFINED',
  }
  dispatch(postNewFolder(data, () => {
    dispatch(handleSearchTypeChange(DEFAULT_TYPE_LABEL)) // return the default search to all type
    dispatch(setToggleModalClose('newFolder'))
    // (this.props.list.errorMsg !== '') this.toggleShow('failedCreateEntity', { type: 'failedCreateEntity' });
  }))
}
// === END ADD ENTITY ON MODAL [NEW FOLDER]
