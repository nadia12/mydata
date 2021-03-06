import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import { Row, Column, Tooltip } from 'volantis-ui'
import {
  FolderIcon,
  CloseIcon,
} from 'volantis-icon'
import { InfoDrawerStyle, AccuracyStyle } from './style'
import method from './lifecycle'
import Accuracy from './accuracy'

const InfoDrawer = props => {
  const { selectedItem, selected, handleToggleModal } = props

  const item = selectedItem(selected)
  const location = window.localStorage.getItem('MYDATA.location')
  const path = JSON.parse(location).name === 'ROOT' ? 'My Data' : JSON.parse(location).name

  return (
    <InfoDrawerStyle>
      <table className="table-info-detail">
        <tbody>
          <tr>
            <th className="is-uppercase header-table-info" colSpan="3" style={{ textAlign: 'left', verticalAlign: 'middle' }}>
              <Row>
                <Column xs={1}><FolderIcon /></Column>
                <Column xs={10}>
                  {
                    <Tooltip position="top" component={item.name || ''} container={item.name || ''} showWhenOverflow containerWidth="20rem" />
                  }
                </Column>
                <Column xs={1} className="has-cursor-pointer" style={{ float: 'right' }}>
                  <div className="is-pulled-right has-cursor-pointer pr10px">
                    <CloseIcon onClick={() => handleToggleModal()} />
                  </div>
                </Column>
              </Row>
            </th>
          </tr>
          {!!props.assetDetail.show && (
          <tr>
            <AccuracyStyle>
              <Accuracy refinedMetricPerformance={props.assetDetail.refinedMetricPerformance} />
            </AccuracyStyle>
          </tr>
          )}
          <tr>
            <td className="is-uppercase pl16px">Type</td>
            <td className="pl24px">{item.type}</td>
          </tr>
          <tr>
            <td className="is-uppercase pl16px">Location</td>
            <td className="pl24px">
              <span className="folder-path">
                <FolderIcon />
                &nbsp;&nbsp;&nbsp;
                {path}
              </span>
            </td>
          </tr>
          <tr>
            <td className="is-uppercase pl16px">Owner</td>
            <td className="pl24px">{item.creatorName}</td>
          </tr>
          <tr>
            <td className="is-uppercase pl16px">Date Modified</td>
            <td className="pl24px">{item.dateModified}</td>
          </tr>
          <tr>
            <td className="is-uppercase pl16px">Date Created</td>
            <td className="pl24px">{item.createdDate}</td>
          </tr>
        </tbody>
      </table>
    </InfoDrawerStyle>
  )
}

InfoDrawer.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
  selectedItem: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  assetDetail: PropTypes.object.isRequired,
}

InfoDrawer.defaultProps = {
}

export default lifecycle(method)(InfoDrawer)
