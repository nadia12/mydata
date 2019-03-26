import React from 'react'
import PropTypes from 'prop-types'

const Tr = ({en, isSelected, handleClick, handleDoubleClick, handleRightClick, icon, setIcon}) => {
  const getIcon = !!setIcon && (setIcon(en.iconType) || setIcon(en.type) || setIcon(en.entityType) || setIcon(en.name));
  
  return (
    <tr
      key={`tr-${en.idx}`} 
      onContextMenu={!!handleRightClick ? (evt) => handleRightClick(evt, en) : null} 
      onClick={!!handleClick ? (evt) => handleClick(evt, en) : null} 
      className={ isSelected ? 'is-active' : '' } 
      onDoubleClick={!!handleDoubleClick ? () => handleDoubleClick(en) : null}
    >
      <td style={{ width: '25.84%' }}><div className={`table-icon ${isSelected ? 'icon-selected' : '' }`}>{icon || getIcon}{en.name}</div></td>
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
  handleClick: null, 
  handleDoubleClick: null, 
  handleRightClick: null, 
  setIcon: null,
  icon: null,
}

Tr.propTypes = {
  en: PropTypes.object, 
  isSelected: PropTypes.bool, 
  handleClick: PropTypes.func, 
  handleDoubleClick: PropTypes.func, 
  handleRightClick: PropTypes.func, 
  setIcon: PropTypes.func,
  icon: PropTypes.element
}

export default Tr;