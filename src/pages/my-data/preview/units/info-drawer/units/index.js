import React from 'react'
import PropTypes from 'prop-types'
import {
  Row, Column, Title, Label, Text, Tooltip,
} from 'volantis-ui'
import moment from 'moment'
import filesize from 'filesize'
import { InfoBoxStyle } from './style'

const InfoDrawer = ({
  infoData: {
    name, uiEntityType, createdAt, creatorName, size,
  },
}) => (
  <>
    <InfoBoxStyle>
      <Row className="p16px">
        <Column xs={12} className="mb24px">
          <Title>File Information</Title>
        </Column>
        <Column xs={12} className="mb22px">
          <Column xs={12} className="p0 mb10px"><Label>FILE NAME</Label></Column>
          <Column xs={12} className="p0">
            <Tooltip
              position="left"
              showWhenOverflow
              component={name || ''}
              container={name || ''}
              containerWidth="9rem"
            />

          </Column>
        </Column>
        <Column xs={12} className="mb22px">
          <Column xs={12} className="p0 mb10px"><Label>TYPE</Label></Column>
          <Column xs={12} className="p0"><Text colorType="white">{uiEntityType}</Text></Column>
        </Column>
        <Column xs={12} className="mb22px">
          <Column xs={12} className="p0 mb10px"><Label>DATE CREATED</Label></Column>
          <Column xs={12} className="p0"><Text colorType="white">{moment(createdAt).format('MMM D, YYYY')}</Text></Column>
        </Column>
        <Column xs={12} className="mb22px">
          <Column xs={12} className="p0 mb10px"><Label>OWNER</Label></Column>
          <Column xs={12} className="p0"><Text colorType="white">{creatorName}</Text></Column>
        </Column>
        <Column xs={12} className="mb22px">
          <Column xs={12} className="p0 mb10px"><Label>SIZE</Label></Column>
          <Column xs={12} className="p0"><Text colorType="white">{filesize(size)}</Text></Column>
        </Column>

      </Row>
    </InfoBoxStyle>
  </>
)

InfoDrawer.propTypes = {
  infoData: PropTypes.object,
}

InfoDrawer.defaultProps = {
  infoData: {},
}

export default InfoDrawer
