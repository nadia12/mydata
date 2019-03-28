import React from 'react';
import PropTypes from 'prop-types';
import { InfoDrawerStyle } from './style'

import {
  FolderIcon,
  CloseIcon
} from 'volantis-icon'


const InfoDrawer = props => {

  const itemByType = selecteds =>{
    let item = {}
  
    if (selecteds.sensorgroup.length === 1) item = selecteds.sensorgroup[0];
    if (selecteds.sensor.length === 1) item = selecteds.sensor[0];
    if (selecteds.datasource.length === 1) item = selecteds.datasource[0];
    if (selecteds.folder.length === 1) item = selecteds.folder[0];
    if (selecteds.asset.length === 1) item = selecteds.asset[0];
  
    return item
  }

  const { selected , handleToggleModal} = props
  let selectedItem = itemByType(selected);

  const location = window.localStorage.getItem('MYDATA.location');
  const path = JSON.parse(location).name === 'ROOT' ? 'My Data' : JSON.parse(location).name;
  return (
    <InfoDrawerStyle>
      <table className="table-info-detail">
        <tbody>
          <tr>
            <th className="is-uppercase header-table-info" colSpan="3" style={{ textAlign: 'left', verticalAlign: 'middle' }}>
              <div className="th-info">
                <FolderIcon />
              </div>
              <div className="th-info">
                {selectedItem.name}
              </div>
              <div className="th-info" style={{ float: 'right' }}>
                <div className="is-pulled-right has-cursor-pointer" onClick={() => handleToggleModal('infoDrawer')}><CloseIcon /></div>
              </div>
            </th>
          </tr>
          <tr>
            <td className="is-uppercase pl16px">Type</td>
            <td className="pl24px">{selectedItem.type}</td>
          </tr>
          <tr>
            <td className="is-uppercase pl16px">Location</td>
            <td className="pl24px"><span className="folder-path"><FolderIcon />&nbsp;&nbsp;&nbsp;{path}</span></td>
          </tr>
          <tr>
            <td className="is-uppercase pl16px">Owner</td>
            <td className="pl24px">{selectedItem.creatorName}</td>
          </tr>
          <tr>
            <td className="is-uppercase pl16px">Date Modified</td>
            <td className="pl24px">{selectedItem.dateModified}</td>
          </tr>
        </tbody>
      </table>
    </InfoDrawerStyle>
  )
}

InfoDrawer.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
}

InfoDrawer.defaultProps = {
}

export default InfoDrawer
