import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
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
} from './function'

import {
  setToggleModal,
  setToggleModalClose,
  setToggleModalOpen,
  setValue,
  setAuthCookie,
  setUserInfo,
} from './reducer'

import {
  setRootLocation,
  isInTrash,
  jLocation,
} from './local-helper'

import { THEAD } from './constant'

const mapStateToProps = state => ({
  show: state._mydataList.show,
  position: state._mydataList.position,
  menuList: state._mydataList.menuList,
  search: state._mydataList.search,
  sort: state._mydataList.sort,
  isInTrash: () => isInTrash(),
  THEAD,
  LOCATIONS,
})

const mapDispatchToProps = dispatch => ({
  setHeaders: () => dispatch(setHeaders()),
  setRootLocation: () => setRootLocation(),
  setAuthCookie: props => dispatch(setAuthCookie(props)),
  setUserInfo: props => dispatch(setUserInfo(props)),
  handleSort: name => dispatch(handleSort(name)),
  handleToggleModal: modalType => dispatch(setToggleModal(modalType)),
  handleAddNewData: () => {
    dispatch(setToggleModalOpen('menubar'))

    return dispatch(setToggleModalClose('menubarRight'))
  },
  handleChangeTopMenu: menu => {
    dispatch(setToggleModalClose('menubar'))

    return dispatch(handleChangeTopMenu(menu))
  },
  handleChangeMenuRight: (menu, value) => {
    dispatch(setToggleModalClose('menubarRight'))

    return dispatch(handleChangeMenuRight(menu, value))
  },
  handleNewSensorGroupAdd: async (tHeaders, sensorGroupFields) => {
    // ini belum yaa
    const groupMappingId = uuidv4()

    // const reqDataSG = {
    //   name: sensorGroupFields.sensorGroupName,
    //   description: sensorGroupFields.description,
    //   mappingScheme: null,
    //   groupMappingId
    // }
    //
    // const headers = { ...tHeaders, 'V-NAME': sensorGroupFields.sensorGroupName }
    // this.props.createNewSensorGroup({ reqData: reqDataSG, headers });
    // await this.props.addToSensorGroup({
    //   reqData: {
    //     groupMappingId,
    //     sensors: sensorGroupFields.sensors || null
    //   },
    //   headers
    // });
    // this.handleSearchTypeChange(DEFAULT_TYPE_LABEL); // return the default search to all type
    // this.fetchEntityList();
    // this.toggleShow('newSensorGroup');
    dispatch(setToggleModalClose('newSensorGroup'))
  },
  handleChangeInput: params => dispatch(handleChangeInput(params)),
  handleMouseLeave() {
    dispatch(setToggleModalClose('menubar'))
    document.getElementById('mouse-leave').style.display = 'none'
  },
  setEntityList: () => dispatch(setEntityList()),
  getPermission: () => dispatch(setValue('actionPermission', '')),
  getBreadcrumbList: () => dispatch(getBreadcrumbList()),
  handleChangeLocation: locationName => dispatch(handleChangeLocation(locationName)),
  handleSearchList: () => dispatch(handleSearchList()),
  handleSearchChange: value => dispatch(handleSearchChange(value)),
  setFooterText: () => dispatch(setFooterText()),
  onClickTrash: () => dispatch(handleChangeLocation((isInTrash() ? LOCATIONS.ROOT : LOCATIONS.TRASH))),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
