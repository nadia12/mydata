import { connect } from 'react-redux'
import { LOCATIONS } from 'Config/constants'
import {
  checkPath,
} from 'Config/lib/url-helper'
import { isWindowExist, jLocation as getJLocation } from 'Config/lib/local-helper'
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
  handleResetSelectList,
  getAllFolders,
} from './function'

import {
  resetState,
  setToggleModal,
  setToggleModalClose,
  setToggleModalOpen,
  setValue,
  setEmptyEntities,
} from './reducer'

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
  handleSort: name => dispatch(handleSort(name, props.linkTo)),
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
    if (isWindowExist() && !!window.document.getElementById('mouse-leave')) window.document.getElementById('mouse-leave').style.display = 'none'
  },
  setEntityList: query => dispatch(setEntityList(query)),
  setEntitiesByHref: () => dispatch(setEntitiesByHref()),
  setEmptyEntities: () => dispatch(setEmptyEntities()),
  resetFolders: () => dispatch(setValue('allFolders', [])),
  getBreadcrumbList: () => dispatch(getBreadcrumbList(props.linkTo)),
  handleSearchList: () => dispatch(handleSearchList(props.linkTo)),
  handleSearchChange: value => dispatch(handleSearchChange(value)),
  setFooterText: () => dispatch(setFooterText()),
  onClickTrashBin: () => dispatch(handleClickTrashBin(props.linkTo)),
  onOutsideClick: () => dispatch(setToggleModalClose('menubarRight')),
  handleScroll: event => {
    const element = event.target
    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      const jLocation = getJLocation()
      dispatch(setEntityList({ parentId: jLocation.entityId }))
    }
  },
  setCurrentLocation: lastObject => dispatch(setValue('prev', lastObject)),
  setFilterPagination: ({ searchName = '', orderName, orderType }) => {
    dispatch(setValue('pagination', { page: 0 }))
    dispatch(setValue('search', { list: searchName }))
    if (!!orderName && !!orderType) dispatch(setValue('sort', { orderName, orderType }))
  },
  linkTo: pathname => props.linkTo(pathname),
  handleResetSelectList: () => dispatch(handleResetSelectList()),
  linkToMyDataRoot: () => (dispatch, getState) => {
    const {
      volantisConstant: { routes: { myData: { root: myDataRoot } } },
    } = getState()
    props.linkTo(myDataRoot)
  },
  getAllFolders: () => dispatch(getAllFolders()),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
