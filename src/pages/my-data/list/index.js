import { connect } from 'react-redux'
import { LOCATIONS } from 'Config/constants'
import List from './units'
import {
  setHeaders,
  setEntityList,
  setEntitiesByHref,
  handleChangeMenuRight,
  handleChangeTopMenu,
  handleChangeInput,
  handleSort,
  handleClickTrashBin,
  handleSearchList,
  handleSearchChange,
  getBreadcrumbList,
  setFooterText,
  handleActionTrash,
  handleResetSelectList,
} from './function'

import {
  resetState,
  setToggleModal,
  setToggleModalClose,
  setToggleModalOpen,
  setValue,
  setEmptyEntities,
} from './reducer'

import {
  checkPath,
} from './url-helper'

import { THEAD } from './constant'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  show: _mydataList.show,
  position: _mydataList.position,
  menuList: _mydataList.menuList,
  search: _mydataList.search,
  sort: _mydataList.sort,
  prev: _mydataList.prev,
  isInTrash: () => checkPath(LOCATIONS.TRASH),
  lastEntitiesLength: _mydataList.lastEntitiesLength,
  THEAD,
  LOCATIONS,
})

const mapDispatchToProps = (dispatch, props) => ({
  resetState: () => dispatch(resetState()),
  setHeaders: () => dispatch(setHeaders()),
  handleSort: name => dispatch(handleSort(name)),
  handleToggleModal: modalType => dispatch(setToggleModal(modalType)),
  handleAddNewData: () => {
    dispatch(setToggleModalOpen('menubar'))

    return dispatch(setToggleModalClose('menubarRight'))
  },
  handleToApiManagement: id => dispatch((dispatch, getState) => {
    const {
      volantisConstant: { routes: { apiManagement: { root: apiManagementRoot } } },
    } = getState()
    props.linkTo(`${apiManagementRoot}?app=${id}`)
  }),
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
  setEntityList: query => dispatch(setEntityList(query)),
  setEntitiesByHref: () => dispatch(setEntitiesByHref()),
  setEmptyEntities: () => dispatch(setEmptyEntities()),
  getBreadcrumbList: () => dispatch(getBreadcrumbList(props.linkTo)),
  handleSearchList: () => dispatch(handleSearchList(props.linkTo)),
  handleSearchChange: value => dispatch(handleSearchChange(value)),
  setFooterText: () => dispatch(setFooterText()),
  onClickTrashBin: () => dispatch(handleClickTrashBin(props.linkTo)),
  onClickRestore: () => dispatch(handleActionTrash('restore')),
  onOutsideClick: () => dispatch(setToggleModalClose('menubarRight')),
  handleScroll: event => {
    const element = event.target
    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      dispatch(setEntityList())
    }
  },
  setCurrentLocation: lastObject => dispatch(setValue('prev', lastObject)),
  setFilterPagination: ({ searchName = '' }) => {
    dispatch(setValue('pagination', { page: 0 }))
    dispatch(setValue('search', { list: searchName }))
  },
  linkTo: pathname => props.linkTo(pathname),
  handleResetSelectList: () => dispatch(handleResetSelectList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
