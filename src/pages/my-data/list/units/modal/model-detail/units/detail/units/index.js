import React from 'react'
import PropTypes from 'prop-types'
import {
  Label,
  Row,
  Column,
  Subtitle,
} from 'volantis-ui'

const Detail = props => {
  const { asset } = props.selected

  return (
    <Row className="mb-1rem">
      <Column>
        <Label>MODEL NAME</Label>
        <Subtitle size="normal" colorType="secondary"><p>{asset[0].name}</p></Subtitle>
      </Column>
      <Column>
        <Label>DATE UPDATED</Label>
        <Subtitle size="normal" colorType="secondary"><p>{asset[0].createdAt}</p></Subtitle>
      </Column>
    </Row>
  )
}

Detail.propTypes = {
  selected: PropTypes.object.isRequired,
}

Detail.defaultProps = {
}

export default Detail
