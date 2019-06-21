import moment from 'moment'
import filesize from 'filesize'
import {
  jBreadcrumb as getJBreadcrumb,
  jLocation as getJLocation,
} from 'Config/lib/local-helper'
import { getCookie } from 'Helpers/get-cookie'
import { SELECTED_TYPES } from './constant'

const now = moment(new Date()).format('YYYY-MM-DD')

// Entities dari request harus di setup lagi. dipanggil setelah dispatch getEntityList
export const doRefineEntities = (res, err) => {
  let refinedEntity = []
  const errExist = !!err
  if (!!res && !errExist) {
    refinedEntity = [...res]
    if (refinedEntity.length > 0) {
      refinedEntity = refinedEntity.map((en, idx) => {
        const end = moment(en.updatedAt).format('YYYY-MM-DD')
        const isToday = now === end
        const status = !!en.status && en.status.split('_').join(' ')
        const size = en.size === 0 ? '-' : filesize(en.size)
        const updatedAt = isToday ? `Today ${moment(en.updatedAt).format('HH:mm')}` : moment(en.updatedAt).format('DD MMM YYYY HH:mm')
        const dateModified = moment(en.updatedAt).format('MMM D, YYYY')
        const createdDate = moment(en.createdAt).format('MMM D, YYYY')
        const selectedType = SELECTED_TYPES(en.uiEntityType)
        const isSelected = false

        return {
          ...en,
          isSelected,
          status,
          idx,
          size,
          updatedAt,
          dateModified,
          createdDate,
          selectedType,
        }
      })
    }
  }

  return refinedEntity
}

export const setHeadersConnector = ({
  name = [], userInfoName = '',
}) => {
  const jLocation = getJLocation()
  const jBreadcrumb = getJBreadcrumb()

  const userInfo = getCookie({ cookieName: userInfoName })
  const currBreadcrumb = jBreadcrumb.pop() || {} // get last breadcrumb

  const headers = {
    driveId: userInfo.owner_id,
    creatorName: userInfo.name,
    creatorId: userInfo.id,
    parentId: jLocation.entityId,
    name: name || '',
    mime: currBreadcrumb.path || '',
  }

  return headers
}
