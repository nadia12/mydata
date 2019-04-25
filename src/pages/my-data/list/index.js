import { connect } from 'react-redux'
import { LOCATIONS } from 'Config/constants'
import List from './units'
import {
  setHeaders,
  setEntityList,
  handleChangeMenuRight,
  handleChangeTopMenu,
  handleChangeInput,
  handleSort,
  handleChangeLocation,
  handleSearchList,
  handleSearchChange,
  getBreadcrumbList,
  setFooterText,
  handleActionTrash,
} from './function'

import {
  setToggleModal,
  setToggleModalClose,
  setToggleModalOpen,
  setValue,
} from './reducer'

import {
  setRootLocation,
  isInTrash,
} from './local-helper'

import { THEAD } from './constant'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  show: _mydataList.show,
  position: _mydataList.position,
  menuList: _mydataList.menuList,
  search: _mydataList.search,
  sort: _mydataList.sort,
  isInTrash: () => isInTrash(),
  THEAD,
  LOCATIONS,
})

const mapDispatchToProps = (dispatch, props) => ({
  setHeaders: () => dispatch(setHeaders()),
  setRootLocation: () => setRootLocation(),
  handleSort: name => dispatch(handleSort(name)),
  handleToggleModal: modalType => dispatch(setToggleModal(modalType)),
  handleAddNewData: () => {
    dispatch(setToggleModalOpen('menubar'))

    return dispatch(setToggleModalClose('menubarRight'))
  },
  handleChangeTopMenu: menu => {
    dispatch(setToggleModalClose('menubar'))

    return dispatch(handleChangeTopMenu(menu, props.linkTo))
  },
  handleChangeMenuRight: (menu, value) => {
    dispatch(setToggleModalClose('menubarRight'))

    return dispatch(handleChangeMenuRight(menu, value, props.linkTo))
  },
  handleChangeInput: params => dispatch(handleChangeInput(params)),
  handleMouseLeave() {
    dispatch(setToggleModalClose('menubar'))
    if (typeof window !== 'undefined' && window !== null && !!window.document.getElementById('mouse-leave')) window.document.getElementById('mouse-leave').style.display = 'none'
  },
  setEntityList: () => dispatch(setEntityList()),
  getPermission: () => dispatch(setValue('actionPermission', '')),
  getBreadcrumbList: () => dispatch(getBreadcrumbList()),
  handleChangeLocation: locationName => dispatch(handleChangeLocation(locationName)),
  handleSearchList: () => dispatch(handleSearchList()),
  handleSearchChange: value => dispatch(handleSearchChange(value)),
  setFooterText: () => dispatch(setFooterText()),
  onClickTrash: () => {
    dispatch(handleSearchChange(''))
    dispatch(handleChangeLocation((isInTrash() ? LOCATIONS.ROOT : LOCATIONS.TRASH)))
  },
  onClickRestore: () => dispatch(handleActionTrash('restore')),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
