import moment from 'moment';
const now = moment(new Date()).format('YYYY-MM-DD');

import {
  GET_ENTITY_REQUEST,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,
  POST_CONNECTOR_REQUEST,
  POST_CONNECTOR_SUCCESS,
  POST_CONNECTOR_ERROR,
} from './action-type'
import Method from 'Config/constants/request-method'
import Hostname from 'Config/constants/hostname'

// === ENTITIES 
  export const getEntityList = (params, cb) => {
    //sample params, akan dihapus
    const authCookie = "z5PyGqlECp7ZRrF4eOLVWAzc9eICRTSeNDOJYDmNcPVwtr3vyQDkrACp6uv6vsU2"
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
//====

export const postConnectorData = (connectorIds = [], cb) => {
  const authCookie = "z5PyGqlECp7ZRrF4eOLVWAzc9eICRTSeNDOJYDmNcPVwtr3vyQDkrACp6uv6vsU2"
  return {
    type: [
      POST_CONNECTOR_REQUEST,
      POST_CONNECTOR_SUCCESS,
      POST_CONNECTOR_ERROR
    ],
    shuttle: {
      path: `/v1/connector?access_token=${authCookie}`,
      method: Method.post,
      endpoint: Hostname.root,
      payloads: connectorIds
    },
    authCookie,
    nextAction: (res, err) => cb(res, err)
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
  
  