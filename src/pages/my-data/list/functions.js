import moment from 'moment';
const now = moment(new Date()).format('YYYY-MM-DD');

import {
  GET_ENTITY_REQUEST,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,
  POST_CONNECTOR_REQUEST,
  POST_CONNECTOR_SUCCESS,
  POST_CONNECTOR_ERROR,

  SET_ENTITIES,
} from './action-type'
import Method from 'Config/constants/request-method'
import Hostname from 'Config/constants/hostname'
import {setValue} from './reducer'


// === ENTITIES 
  export const getEntityList = (params, cb) => {
    //sample params, akan dihapus
    const authCookie = "6c2V3pMkegMgkd1ZqxcPvMKRiJG8MLIJCYJu5MN3WfzELQ0hXP4idTleyNH35mK0"
    //

    return {
      type: [
        GET_ENTITY_REQUEST,
        GET_ENTITY_SUCCESS,
        GET_ENTITY_ERROR,
      ],
      shuttle: {
        path: `/v1/directory/${params.driveId}/${params.entityId}/contents/?access_token=${authCookie}`,
        method: Method.get,
        endpoint: Hostname.root,
      },
      authCookie,
      nextAction: (res, err) => cb(res, err)
    }
  }

  //dipanggil di mapDispatchTo Props, hasil request getEntityList harus direfined
  export const setRefinedEntities = (res) => {
    let refinedEntity = [...res]
      if (refinedEntity.length > 0) {
        refinedEntity = refinedEntity.map((en) => {
          const end = moment(en.updatedAt).format('YYYY-MM-DD');
          const isToday = now === end;
          const origUpdatedAt = new Date(en.updatedAt);
          const origSize = en.size;
          const size = en.size === 0 ? '-' : en.size;
          const labelType = '';
          const updatedAt = isToday ? `Today ${moment(en.updatedAt).format('HH:mm')}` : moment(en.updatedAt).format('DD MMM YYYY HH:mm');
          const dateModified = moment(en.updatedAt).format('MMM D, YYYY');
          return { ...en, size, updatedAt, dateModified, origSize, origUpdatedAt, labelType };
        });
      }

    return refinedEntity
  }
//====

export const postConnectorData = (connectorIds = []) => {
  const authCookie = "6c2V3pMkegMgkd1ZqxcPvMKRiJG8MLIJCYJu5MN3WfzELQ0hXP4idTleyNH35mK0"
  return {
    type: [
      POST_CONNECTOR_REQUEST,
      POST_CONNECTOR_SUCCESS,
      POST_CONNECTOR_ERROR
    ],
    shuttle: {
      path: `/v1/connector/?access_token=${authCookie}`,
      method: Method.post,
      endpoint: Hostname.root,
      payloads: connectorIds
    },
    authCookie
  }
}
  
  // handleSelectList = (event, en) => {
  //   const isCtrl = event.metaKey || event.ctrlKey;
  //   const isShift = event.shiftKey;
  //   const { ntype, id, idx: enIdx } = en;
  //   const { list: { entity } } = this.props;
  //   const { lastSelected } = this.state;
  //   if (isShift) document.getSelection().removeAllRanges();
  
  //   this.setState((prevState) => {
  //     const { selected } = prevState;
  //     let newSelected = { ...selected };
  
  //     if (isCtrl) {
  //       const detail = selected[ntype].find((det) => det.id === id);
  //       let newSelectedType = selected[ntype];
  //       const exist = detail && newSelectedType.findIndex((select) => select.id === detail.id) > -1;
  
  //       if (exist) newSelectedType = newSelectedType.filter((select) => select.id !== detail.id);
  //       else newSelectedType.push({ ...en });
  //       newSelected[ntype] = newSelectedType;
  //     } else if (isShift) {
  //       const selectedEntities = lastSelected < en.idx ? entity.slice(lastSelected, en.idx + 1) : entity.slice(en.idx, lastSelected + 1);
  //       selectedEntities.forEach((selectedEn, idx) => {
  //         const selectedType = newSelected[selectedEn.ntype];
  //         const exist = selectedType.findIndex(({ id: selectId }) => selectId === selectedEn.id) > -1;
  //         if (!exist) newSelected[selectedEn.ntype].push({ ...selectedEn });
  //       });
  //     } else {
  //       newSelected = {
  //         sensorgroup: [],
  //         sensor: [],
  //         datasource: [],
  //         folder: [],
  //         asset: [],
  //         [ntype]: [en]
  //       };
  //     }
  
  //     this.renderRightClickAction(newSelected);
  //     return {
  //       selected: newSelected,
  //       show: { ...prevState.show, menubarRight: false, infoDrawer: false },
  //       lastSelected: enIdx
  //     };
  //   });
  // }
  
  