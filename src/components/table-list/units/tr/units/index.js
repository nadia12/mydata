import React from 'react'
import PropTypes from 'prop-types'

const Tr = ({
  en,
  isSelected,
  oneClick,
  doubleClick,
  rightClick,
  iconSvg,
  ICON,
}) => {
  const setIcon = iconSvg || ICON

  return (
    <tr
      key={`tr-file-${en.idx}`}
      onContextMenu={rightClick.isActive ? evt => rightClick.action(evt, en) : () => {}}
      onClick={oneClick.isActive ? evt => oneClick.action(evt, en) : () => {}}
      onDoubleClick={doubleClick.isActive ? evt => doubleClick.action(evt, en) : () => {}}
      className={isSelected ? 'is-active' : undefined}
    >
      <td style={{ width: '25.84%' }}>
        <div className={`table-icon ${isSelected ? 'icon-selected' : ''}`}>
          {setIcon}
          {en.name}
        </div>
      </td>
      <td style={{ width: '15.94%' }}><div>{en.creatorName}</div></td>
      <td style={{ width: '15.94%' }}>{ en.type }</td>
      <td style={{ width: '7.9%' }}>{en.size}</td>
      <td style={{ width: '15.94%' }}>{en.updatedAt}</td>
      <td style={{ width: '18.34%' }}>{en.status || '-'}</td>
    </tr>
  )
}

Tr.defaultProps = {
  en: {},
  isSelected: false,
  oneClick: { isActive: false, action: () => {} },
  doubleClick: { isActive: false, action: () => {} },
  rightClick: { isActive: false, action: () => {} },
  ICON: null,
  iconSvg: null,
}

Tr.propTypes = {
  en: PropTypes.object,
  isSelected: PropTypes.bool,
  oneClick: PropTypes.bool,
  doubleClick: PropTypes.bool,
  rightClick: PropTypes.bool,
  ICON: PropTypes.object,
  iconSvg: PropTypes.element,
}

export default Tr
