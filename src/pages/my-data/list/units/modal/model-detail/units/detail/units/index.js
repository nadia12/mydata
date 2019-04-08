import React from 'react';
import PropTypes from 'prop-types';
import { Label, Row, Column, Subtitle } from 'volantis-ui'

const Detail = props => {
  return (
    <Row className='mb-1rem'>
      <Column>
        <Label>MODEL NAME</Label>
        <Subtitle size="normal" type="secondary"><p>{props.name}</p></Subtitle>
      </Column>
      <Column>
        <Label>DATE UPDATED</Label>
        <Subtitle size="normal" type="secondary"><p>{props.updatedAt}</p></Subtitle>
      </Column>
    </Row>
  )
}

Detail.propTypes = {
  name: PropTypes.string,
  updatedAt: PropTypes.string
}

Detail.defaultProps = {
  name: 'Model Name is Here',
  updatedAt: '28 Mar 2019 14:22'
}

export default Detail
 