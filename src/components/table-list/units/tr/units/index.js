import React from 'react'
import PropTypes from 'prop-types'

const Tr = ({en, isSelected, oneClick, doubleClick, rightClick, iconSvg, ICON}) => {
  const setIcon = iconSvg || (!!ICON && (ICON.set(en.iconType) || ICON.set(en.type) || ICON.set(en.entityType) || ICON.set(en.name)));
  return (
    <tr
      key={`tr-file-${en.idx}`} 
      onContextMenu={!!rightClick.isActive ? (evt) => rightClick.action(evt, en) : null} 
      onClick={!!oneClick.isActive ? (evt) => oneClick.action(evt, en) : null} 
      onDoubleClick={!!doubleClick.isActive ? (evt) => doubleClick.action(evt, en) : null}
      className={ !!isSelected ? 'is-active' : '' } 
    >
      {/* { 
        props.tds.map((td, idx) => {
          return <td key={`td-${idx}`} style={{ width: td.width }}><div className={`table-icon ${isSelected ? 'icon-selected' : '' }`}>{getIcon}{td.content}</div></td>
        })
      } */}
      <td style={{ width: '25.84%' }}><div className={`table-icon ${isSelected ? 'icon-selected' : '' }`}>{setIcon}{en.name}</div></td>
      <td style={{ width: '15.94%' }}><div> {en.creatorName} </div></td>
      <td style={{ width: '15.94%' }}>{ en.type }</td>
      <td style={{ width: '7.9%' }}>{en.size}</td>
      <td style={{ width: '15.94%' }}>{en.updatedAt}</td>
      <td style={{ width: '18.34%' }}>{en.status || '-'}</td>
    </tr >
  );
};

Tr.defaultProps = {
  en: {}, 
  isSelected: false, 
  oneClick: {isActive: false, action: () => null},
  doubleClick: {isActive: false, action: () => null},
  rightClick: {isActive: false, action: () => null},
  ICON: null,
  iconSvg: null,
}

Tr.propTypes = {
  _mydataList: PropTypes.object.isRequired,
  tds: PropTypes.array,
  en: PropTypes.object, 
  isSelected: PropTypes.bool, 
  oneClick: PropTypes.bool,
  doubleClick: PropTypes.bool,
  rightClick: PropTypes.bool,
  ICON: PropTypes.object,
  iconSvg: PropTypes.element,
  isOneClickAble: PropTypes.bool,
}

export default Tr;