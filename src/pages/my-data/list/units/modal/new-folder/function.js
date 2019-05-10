import uuidv4 from 'uuid/v4'
import {
  FILE_TYPES,
  LOCATIONS,
} from 'Config/constants'
import { getCookie } from 'Helpers/get-cookie'
import { postNewFolder, setToggleModalClose } from 'MyData/list/reducer'
import { isWindowExist, extendedData } from 'Config/lib/url-helper'
import { setEntitiesByHref } from 'MyData/list/function'

export const handleAddNewFolder = () => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataList: {
        fields,
      },
    },
    volantisConstant: {
      cookie: { user: userInfoName, auth: authCookie },
      service: { endpoint: { emmaDirectory } },
    },
  } = getState()

  const userInfo = getCookie({ cookieName: userInfoName })
  const driveId = userInfo.owner_id || ''
  const creatorName = userInfo.name || ''
  const creatorId = userInfo.id || ''
  const location = (isWindowExist() && window.localStorage.getItem('MYDATA.location')) || ''
  const isLocationExist = location !== ''
  const pathNewFolder = `${emmaDirectory}/${driveId}/entity`

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
  dispatch(postNewFolder(pathNewFolder, data, authCookie, () => {
    dispatch(setToggleModalClose('newFolder'))
    dispatch(setToggleModalClose('entityContent'))
    dispatch(setEntitiesByHref())
  }))
}
// === END ADD ENTITY ON MODAL [NEW FOLDER]
