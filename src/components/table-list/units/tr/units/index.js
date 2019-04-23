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
  ellipsisText,
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
          <div className="td-text">
            <Tooltip message={td.value} position="top" style={{ zIndex: '10000' }}>{ ellipsisText(td.value) }</Tooltip>
          </div>
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
  ellipsisText: () => {},
}

Tr.propTypes = {
  key: PropTypes.string,
  isSelected: PropTypes.bool,
  oneClick: PropTypes.bool,
  doubleClick: PropTypes.bool,
  rightClick: PropTypes.bool,
  tds: PropTypes.array,
  ellipsisText: PropTypes.func,
}

export default Tr
