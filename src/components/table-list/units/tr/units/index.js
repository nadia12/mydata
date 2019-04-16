import React from 'react'
import PropTypes from 'prop-types'

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
          <div className={td.className}>
            {td.icon}
            {td.value}
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
}

Tr.propTypes = {
  key: PropTypes.string,
  isSelected: PropTypes.bool,
  oneClick: PropTypes.bool,
  doubleClick: PropTypes.bool,
  rightClick: PropTypes.bool,
  tds: PropTypes.array,
}

export default Tr
