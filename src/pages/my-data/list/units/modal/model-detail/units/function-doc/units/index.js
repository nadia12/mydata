import React from 'react'
import PropTypes from 'prop-types'
import { FunctionDocStyled } from './style'

const FunctionDoc = props => {
  console.log("FunctionDoc", props)

  return (
    <FunctionDocStyled>
      <table className="table is-normal is-fullwidth mt1 table-function" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th colSpan="4" className="is-uppercase" style={{ color: '#9EA1B4' }}>Function</th>
          </tr>
        </thead>
        <tbody>
          {props.Trs}
        </tbody>
      </table>
    </FunctionDocStyled>
  )
}

FunctionDoc.propTypes = {
  Trs: PropTypes.array.isRequired,
}

FunctionDoc.defaultProps = {
  // Trs: null,
}

export default FunctionDoc
