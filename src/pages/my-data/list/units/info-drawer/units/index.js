import React from 'react';
import PropTypes from 'prop-types';

import {
  FolderIcon,
  CloseIcon
} from 'volantis-icon'

const InfoDrawer = props => {
  return (
    <div className="column is-4 main-content-body-right">
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
                <div className="is-pulled-right has-cursor-pointer" onClick={() => dispatch(props.setToggleModal('infoDrawer'))}><CloseIcon /></div>
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
    </div>
  )
}

InfoDrawer.propTypes = {
  setToggleModal: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
}

InfoDrawer.defaultProps = {
}

export default InfoDrawer
