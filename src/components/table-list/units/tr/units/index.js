import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'volantis-ui'

const Tr = ({
  key,
  tds,
  isSelected,
  oneClick,
  doubleClick,
  rightClick,
}) => (
  <tr
    key={`tr-entity-${key}`}
    onContextMenu={rightClick.isActive ? evt => rightClick.action(evt) : () => {}}
    onClick={oneClick.isActive ? evt => oneClick.action(evt) : () => {}}
    onDoubleClick={doubleClick.isActive ? evt => doubleClick.action(evt) : () => {}}
    className={isSelected ? 'is-active' : undefined}
  >
    {
      tds.map((td, idx) => (
        <td style={{ width: td.width }} key={`td-entity-${idx}`}>
          {td.icon}
          {
            <Tooltip
              position="right"
              showWhenOverflow
              component={td.value || ''}
              container={td.value || ''}
              containerWidth="9rem"
            />
          }
        </td>
      ))
    }
  </tr>
)

Tr.defaultProps = {
  key: '',
  isSelected: false,
  oneClick: { isActive: false, action: () => {} },
  doubleClick: { isActive: false, action: () => {} },
  rightClick: { isActive: false, action: () => {} },
  tds: [],
}

Tr.propTypes = {
  key: PropTypes.string,
  isSelected: PropTypes.bool,
  oneClick: PropTypes.object,
  doubleClick: PropTypes.object,
  rightClick: PropTypes.object,
  tds: PropTypes.array,
}

export default Tr
