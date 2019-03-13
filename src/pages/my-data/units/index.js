import React from 'react'
import PropTypes from 'prop-types'
// import {
//   TrashFolderIcon,
//   FileIcon,
//   DatabaseIcon,
//   DeviceIcon,
//   DatasetIcon,
//   ModelIcon,
//   FolderIcon,
//   SensorGroupIcon,
//   CloseIcon,
//   ArrowDropDownFullIcon,
//   ArrowDropUpFullIcon
// } from 'volantis-icon';
// import { StyleBulma, StyleCustom, StyleMyData } from '../../../css';
import MY_DATA from '../../../dummy-data/my-data'
import {
  ENTITY_ICON,
  ENTITY_TYPE_LABEL,
  FILE_TYPES,
  ENTITY_TYPES,
  LOCATIONS,
  DEFAULT_TYPE_LABEL,
  CONFIRMATION_CONTENT,
  SENSOR_STATUS,
  DEFAULT_STATE,
  ASSET_STATUS,
  DATASOURCE_STATUS,
  NTYPES
} from './constans';


export default class List extends React.Component {
  static async getInitialProps() {
    return { services: getServicesURL(), title: 'My Data - Volantis IQ' };
  }
  static defaultProps = {
    search: '',
    path: null,
    apiKey: 'def_APIKEY'
  };
  static propTypes = {
    search: PropTypes.string,
    path: PropTypes.string,
    apiKey: PropTypes.string,
    getDatasetList: PropTypes.func.isRequired,
    getModelList: PropTypes.func.isRequired,
    getConnectorData: PropTypes.func.isRequired,
    searchEntityTypePath: PropTypes.func.isRequired,
    searchEntityNamePath: PropTypes.func.isRequired,
    getAccuracy: PropTypes.func.isRequired,
    getFunctionDoc: PropTypes.func.isRequired,
    addToSensorGroup: PropTypes.func.isRequired,
    createNewSensorGroup: PropTypes.func.isRequired,
    getSensorGroupList: PropTypes.func.isRequired,
    getSensorNoGroupList: PropTypes.func.isRequired,
    getEntityList: PropTypes.func.isRequired,
    getTrashList: PropTypes.func.isRequired,
    syncDatasource: PropTypes.func.isRequired,
    moveDirectory: PropTypes.func.isRequired,
    moveToTrash: PropTypes.func.isRequired,
    restoreFromTrash: PropTypes.func.isRequired,
    createNewEntity: PropTypes.func.isRequired,
    sortEntities: PropTypes.func.isRequired,
    asset: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    services: PropTypes.object.isRequired
  }

  state = {
    ...DEFAULT_STATE,  
    headers: {},
    lastSelected: 0,
    menuList: [],
    position: { left: 0, top: 0 },
    actionPermission: getPermission(),
    thead: [
      { name: 'Name', width: '25.84%', origName: 'name', isSortAble: true },
      { name: 'Owner', width: '15.94%', origName: 'creatorName', isSortAble: true },
      { name: 'Type', width: '15.94%', origName: 'labelType', isSortAble: true },
      { name: 'Size', width: '7.9%', origName: 'origSize', isSortAble: true },
      { name: 'Last Updated', width: '15.94%', origName: 'origUpdatedAt', isSortAble: true },
      { name: 'Status', width: '18.34%', origName: 'status', isSortAble: false }
    ],
    sort: {
      activeField: 'origUpdatedAt', // See for thead above => name, creatorName, updatedAt, size, type
      isAsc: true
    }
  };

  componentDidMount() {
    const params = queryString.parse(window.location.search);

    Object.keys(params).forEach((key) => {
      window.localStorage.setItem(key, params[key]);
    });

    const location = window.localStorage.getItem('MYDATA.location');
    const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb');

    const locationExist = typeof location !== 'undefined' && location !== null && `${location}`.trim() !== '';
    const breadcrumbExist = typeof breadcrumb !== 'undefined' && breadcrumb !== null && `${breadcrumb}`.trim() !== '';
    let jBreadcrumb = [];
    if (!locationExist) {
      window.localStorage.setItem('MYDATA.location', JSON.stringify({ parentId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, entityId: LOCATIONS.ROOT, path: '' }));
      window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{ name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT, label: 'My Data', entityId: LOCATIONS.ROOT, path: '' }]));
    }
    if (breadcrumbExist) jBreadcrumb = JSON.parse(breadcrumb);
    const user = currentUser();
    const currentLocation = JSON.parse(location);
    const hasCurrentLocation = currentLocation && currentLocation.parentId;

    this.setState(({ search, sort }) => ({
      headers: {
        'V-DRIVEID': user.owner_id,
        'V-CREATORNAME': user.name,
        'V-CREATORID': user.id,
        'V-PARENTID': LOCATIONS.ROOT,
        'V-PATH': ''
      },
      search: {
        ...search,
        inFilteredResult: locationExist && breadcrumbExist && Array.isArray(jBreadcrumb) && jBreadcrumb.length > 1
      },
      sort: {
        activeField: params.sort || sort.activeField,
        isAsc: params.sortType === 'asc' || sort.isAsc
      }
    }), () => {
      const isDataset = hasCurrentLocation && currentLocation.parentId === LOCATIONS.DATASET;
      const isModel = hasCurrentLocation && currentLocation.parentId === LOCATIONS.MODEL;
      const isTrash = hasCurrentLocation && currentLocation.parentId === LOCATIONS.TRASH;
      if(isDataset || isModel || isTrash) {
        this.handleChangeLocation(currentLocation.parentId);
      } else {
        this.fetchEntityList();
        this.fetchSensorList();
        this.fetchSensorGroupList();
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeField } = prevState.sort;
    const didFetchEntityList = prevProps.list.getEntityListState !== this.props.list.getEntityListState && this.props.list.getEntityListState === stateStatus.success;
    if (didFetchEntityList) {
      const { entity } = this.props.list;

      this.handleSort(activeField);

      const connectorIds = entity.map((et) => (et.id));
      this.props.getConnectorData({ connectorIds });
      this.setState(({ show }) => ({ show: { ...show, entityContent: true } }));
    }

    if (prevProps.list.moveToTrashState !== this.props.list.moveToTrashState && this.props.list.moveToTrashState === stateStatus.success) {
      this.fetchEntityList();
      // this.handleConfirmationModal({ type: 'successMoveToTrash', status: 'success' });
    } else if (prevProps.list.moveToTrashState !== this.props.list.moveToTrashState && this.props.list.moveToTrashState === stateStatus.failed) {
      // this.handleConfirmationModal({ type: 'failedMoveToTrash', status: 'failed' });
    }


    if (prevProps.list.restoreFromTrashState !== this.props.list.restoreFromTrashState && this.props.list.restoreFromTrashState === stateStatus.success) {
      this.fetchTrashList();
      // this.handleConfirmationModal({ type: 'successRestore', status: 'success' });
    } else if (prevProps.list.restoreFromTrashState !== this.props.list.restoreFromTrashState && this.props.list.restoreFromTrashState === stateStatus.failed) {
      // this.handleConfirmationModal({ type: 'failedRestore', status: 'failed' });
    }
  }

  fetchSensorList = () => this.props.getSensorNoGroupList({ driveId: this.state.headers['V-DRIVEID'] });
  fetchSensorGroupList = () => this.props.getSensorGroupList({ driveId: this.state.headers['V-DRIVEID'] });
  fetchModelList = () => this.props.getModelList();
  fetchDatasetList = () => this.props.getDatasetList();
  fetchTrashList = () => this.props.getTrashList({ driveId: this.state.headers['V-DRIVEID'] });

  fetchFunctionDoc = async () => {
    const { selected: { asset } } = this.state;
    await this.props.getFunctionDoc({ assetId: asset[0].id, componentType: `${asset.type}`.toUpperCase() });
    let accuracy = 0;
    if (asset[0].type === 'Model') accuracy = await this.props.getAccuracy({ asset: asset[0] });
    this.setState((prevState) => ({ ...prevState, accuracy }));
    this.toggleShow('assetDetail');
  }

  fetchEntityList = async () => {
    const location = JSON.parse(window.localStorage.getItem('MYDATA.location'));
    const req = {
      driveId: this.state.headers['V-DRIVEID'],
      entityId: location.entityId
    };
    this.setState(({ show }) => ({
      show: { ...show, entityContent: false },
      selected: { sensorgroup: [], sensor: [], datasource: [], folder: [], asset: [] }
    }));
    await this.props.getEntityList(req);
  }

  // folder click
  fetchDetailList = ({ isDataset = false, isModel = false, entity = {} }) => {
    if (!isDataset && !isModel && entity.name && (entity.entityType === null || entity.entityType === ENTITY_TYPES.DEVICE_GROUP_SENSOR)) {
      const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb');
      const breadcrumbExist = typeof breadcrumb !== 'undefined' && breadcrumb !== null && `${breadcrumb}`.trim() !== '';
      const jBreadcrumb = breadcrumbExist ? JSON.parse(breadcrumb) : [];
      const breadcrumbIdx = jBreadcrumb.length || 0;
      jBreadcrumb.push({ label: entity.name, name: entity.name, entityId: entity.id, idx: breadcrumbIdx, path: entity.path });

      const newLocation = {
        name: entity.name,
        entityId: entity.id,
        path: entity.path
      };

      this.setState(({ headers }) => ({
        headers: { ...headers, 'V-PARENTID': entity.id, 'V-PATH': entity.path },
        selected: { ...DEFAULT_STATE.selected }
      }), () => {
        window.localStorage.setItem('MYDATA.location', JSON.stringify(newLocation));
        window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb));
        this.fetchEntityList();
      });
    }
  }

  handleAddNewData = () => {
    this.toggleShow('menubar');
  }
  handleShowInfoDrawer = () => {
    this.toggleShow('infoDrawer');
  }
  toggleShow = (name, data = {}) => {
    this.setState(({ show, modalData }) => {
      const newModalData = name === 'confirmationModal' ? data : modalData;
      return { modalData: { ...newModalData }, show: { ...show, [name]: !show[name] } };
    });
  }
  /* 1. AddNew */
  handleChangeMenu = (menu) => {
    const lmenu = menu.toLowerCase();
    this.toggleShow('menubar');

    const { list: { entity } } = this.props;
    let createHeader;

    if (entity.length > 0) {
      const { driveId, name, parentId } = entity[0];
      createHeader = { driveId, name, parentId };
    } else {
      createHeader = { driveId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT };
    }
    window.localStorage.setItem('MYDATA.create', JSON.stringify(createHeader));

    if (['file', 'sql', 'device', 'media'].includes(lmenu)) router.push(`${RoutePath.createMyData}?type=${menu.toLowerCase()}`);
    else if (lmenu === 'folder') {
      this.setState({ fields: { ...DEFAULT_STATE.fields } });
      this.toggleShow('newFolder');
    } else if (lmenu === 'sensorgroup') {
      this.fetchSensorList();
      this.setState({ fields: { ...DEFAULT_STATE.fields } });
      this.toggleShow('newSensorGroup');
    }
  }

  handleChangeInput = ({ fieldName, key, value, replacer = '', valueReplacer = '' }) => {
    const { fields, rules } = this.state;
    const currentData = { ...fields[fieldName], [key]: replacer === '' ? value : inputReplacer(replacer, value, valueReplacer) };
    const currentRules = { ...rules };
    currentRules[fieldName].touched = { ...currentRules[fieldName].touched, [key]: true };
    const isValid = !checkRequired(currentData, currentRules[fieldName].required);

    this.setState({
      isValid: { ...this.state.isValid, [fieldName]: isValid },
      rules: currentRules,
      fields: {
        ...fields,
        [fieldName]: currentData
      }
    });
  }
  /* 2. NewFolder */
  handleNewFolderAdd = async () => {
    this.toggleShow('newFolder');

    const location = window.localStorage.getItem('MYDATA.location');
    const locationExist = typeof location !== 'undefined' && location !== null && `${location}`.trim() !== '';
    const data = {
      type: FILE_TYPES.COLLECTION,
      name: this.state.fields.newFolder.folderName,
      parentId: locationExist ? JSON.parse(location).entityId : LOCATIONS.ROOT,
      creatorName: this.state.headers['V-CREATORNAME'],
      creatorId: this.state.headers['V-CREATORID'],
      size: 0,
      driveId: this.state.headers['V-DRIVEID'],
      entityType: null,
      additionalData: null,
      id: uuidv4()
    };
    await this.props.createNewEntity(data);
    this.handleSearchTypeChange(DEFAULT_TYPE_LABEL); // return the default search to all type
    if (this.props.list.errorMsg !== '') this.toggleShow('failedCreateEntity', { type: 'failedCreateEntity' });
  }
  /* 3. NewSensorGroup */
  handleNewSensorGroupAdd = async () => {
    const groupMappingId = uuidv4();
    const reqDataSG = {
      name: this.state.fields.newSensorGroup.sensorGroupName,
      descripition: this.state.fields.newSensorGroup.description,
      mappingScheme: null,
      groupMappingId
    };

    const headers = { ...this.state.headers, 'V-NAME': this.state.fields.newSensorGroup.sensorGroupName };
    this.props.createNewSensorGroup({ reqData: reqDataSG, headers });
    await this.props.addToSensorGroup({
      reqData: {
        groupMappingId,
        sensors: this.state.fields.newSensorGroup.sensors || null
      },
      headers
    });
    this.handleSearchTypeChange(DEFAULT_TYPE_LABEL); // return the default search to all type
    this.fetchEntityList();
    this.toggleShow('newSensorGroup');
  }

  handleNewSensorGroupChangeSearch = (value) => {
    this.setState(({ search }) => ({ search: { ...search, newSensorGroup: value } }));
  }

  handleNewSensorGroupSelectSensor = (id) => {
    const { fields, fields: { newSensorGroup: { sensors } } } = this.state;

    const isExists = sensors && sensors.includes(id);
    this.setState({
      fields: {
        ...fields,
        newSensorGroup: {
          ...fields.newSensorGroup,
          sensors: isExists ? sensors.filter((sensor) => sensor !== id) : [...sensors || [], id]
        }
      }
    });
  }
  /*
    4. Action atas
    => delete
    => sync
    => starred
    => search
  */
  handleAddToSensorGroup = async (menu) => {
    await this.props.addToSensorGroup({
      groupMappingId: menu,
      ids: this.state.selected.sensor.map((sensor) => sensor.id)
    });
    this.toggleShow('confirmationModal');
    this.fetchEntityList();
  }

  handleSync = async () => {
    await this.props.syncDatasource({ connectorId: this.state.selected.datasource[0].id });
    this.toggleShow('confirmationModal', { type: 'sync' });
    this.fetchEntityList();
  }

  handleStarred = () => {
    console.log('======stared=======');
    console.log(this.state.selected);
  }
  handleCreatePipeline = () => {
    const { selected: { datasource }, selected } = this.state;

    delete selected.menu;

    const newSelected = {
      ...selected
    };

    if(datasource && datasource.length > 0) {
      const filteredDatasource = datasource.filter((d) => d.status === DATASOURCE_STATUS.SUCCESS || d.status === DATASOURCE_STATUS.SYNC_SUCCESS || d.status === DATASOURCE_STATUS.SYNC_FAILED);
      newSelected.datasource = filteredDatasource;
    }

    const flattenSelect = Object.values(newSelected).flatMap((select) => select);
    const ids = flattenSelect.map(({ id }) => encodeURIComponent(id));
    const names = flattenSelect.map(({ name }) => encodeURIComponent(name));

    if (ids.length === 0) {
      this.handleConfirmationModal({ type: 'addToPipelineEmpty' });
    } else {
      const qs = `${queryString.stringify({ ids })}&${queryString.stringify({ name: names })}`;
      if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
        window.location.href = `${RoutePath.pipeline}?${qs}`;
      }
    }
  }

  handleInfo = () => {
    this.toggleShow('assetDetail');
  }

  // type = move || restore
  handleActionTrash = (type = 'move') => {
    const { moveToTrash, restoreFromTrash } = this.props;

    const selected = [...Object.values(this.state.selected)];
    const driveId = this.state.headers['V-DRIVEID'];

    const flattenSelect = Object.values(selected).flatMap((select) => select);
    const ids = flattenSelect.map((s) => (s.id));

    if (type === 'move') {
      moveToTrash({ driveId, ids });
    } else {
      restoreFromTrash({ driveId, ids });
    }
  }

  handleCreateApp = () => {
    const { selected: { asset } } = this.state;
    const { id, name } = asset[0];
    const data = { label: name || '', value: id || '', name: 'datasetId' };

    window.localStorage.setItem('API.createApp', JSON.stringify(data));
    window.location.href = apiManagementPath;
  }

  handleMoveDirectory = async (menu) => {
    const selected = [...Object.values(this.state.selected)];
    selected.forEach((select, idx) => {
      select.forEach((s) => {
        if (s && s.id) {
          const data = {
            driveId: this.state.headers['V-DRIVEID'],
            entityId: s.id,
            name: s.name,
            targetCollectionId: menu
          };
          this.props.moveDirectory(data);
        }
      });
      this.fetchEntityList();
    });
  }

  handleTelemetryMapping = () => {
    const { selected: { sensorgroup, sensor } } = this.state;
    let type;
    let id;
    if (sensorgroup.length === 1) {
      type = 'sensorgroup';
      id = sensorgroup[0].id;
    } else if (sensor.length === 1) {
      type = 'sensor';
      id = sensor[0].id;
    }
    window.localStorage.setItem('MYDATA.telemetry', JSON.stringify({ type, id }));
    window.location.href = '/my-data/telemetry';
  }
  /* 5. asset detail */
  handleAssetDetails = () => {
    // this.fetchFunctionDoc();
    this.toggleShow('assetDetails');
  }
  /* 6. list */

  // set breadcrumb only for dataset, model and trash
  setBreadcrumb = (location) => {
    const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb') || '';
    const breadcrumbExist = breadcrumb !== null && `${breadcrumb}`.trim() !== '';
    const jBreadcrumb = breadcrumbExist ? JSON.parse(breadcrumb) : [];
    const breadcrumbIdx = jBreadcrumb.length || 0;

    const exist = (jBreadcrumb.length > 1) && jBreadcrumb.findIndex((bc) => bc.label === location) > -1;

    if (!exist) {
      jBreadcrumb.push({ label: location, name: location, entityId: location, idx: breadcrumbIdx, path: '' });
      window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb));
    }
  }

  handleChangeLocation = async (location) => {
    let filteredAsset = [];
    const inFilteredResult = true;
    if (location === LOCATIONS.DATASET) {
      await this.fetchDatasetList();
      filteredAsset = this.props.asset.datasets;
      this.setBreadcrumb(location);
      window.localStorage.setItem('MYDATA.location', JSON.stringify({ parentId: LOCATIONS.DATASET, name: LOCATIONS.DATASET, entityId: LOCATIONS.ROOT, path: '' }));
    } else if (location === LOCATIONS.MODEL) {
      await this.fetchModelList();
      this.setBreadcrumb(location);
      filteredAsset = this.props.asset.models;
      window.localStorage.setItem('MYDATA.location', JSON.stringify({ parentId: LOCATIONS.MODEL, name: LOCATIONS.MODEL, entityId: LOCATIONS.ROOT, path: '' }));
    } else if (location === LOCATIONS.TRASH) {
      await this.fetchTrashList();
      this.setBreadcrumb(location);
      window.localStorage.setItem('MYDATA.location', JSON.stringify({ parentId: LOCATIONS.TRASH, name: LOCATIONS.TRASH, entityId: LOCATIONS.ROOT, path: '' }));
    }

    const listType = location === LOCATIONS.SENSOR_GROUP ? DEFAULT_TYPE_LABEL : location;
    this.setState(({ show, search }) => ({
      filteredAsset,
      location,
      search: { ...search, listType, inFilteredResult },
      show: { ...show, entityContent: true },
      selected: { ...DEFAULT_STATE.selected  }
    }), () => {
      this.handleSort(this.state.sort.activeField);
    });
  }
  handleSearchChange = (value) => {
    this.setState(({ search }) => ({ search: { ...search, list: value, inSearchList: false } }));
  }
  handleSearchTypeChange = (value) => {
    let inFilteredResult = true;
    this.setState(
      ({ search, headers, location, show }) => {
        if (value === DEFAULT_TYPE_LABEL) {
          if (headers['V-PATH'] === '') inFilteredResult = false;
          this.fetchEntityList();
        } else {
          this.props.searchEntityTypePath({
            driveId: headers['V-DRIVEID'],
            entityType: value,
            parentPath: headers['V-PATH']
          });
        }
        return {
          search: { newSensorGroup: '', list: '', listType: value, inFilteredResult },
          show: { ...show, entityContent: false }
        };
      }
    );
  }

  handleSearchList = () => {
    let inFilteredResult = true;
    const { headers, search: { list: searchListText }, location } = this.state;
    const inModel = location === LOCATIONS.MODEL;
    const inDataset = location === LOCATIONS.DATASET;
    const inModelOrDataset = inModel || inDataset;
    let filteredAsset = [];
    if (location === '' || location === LOCATIONS.SENSOR_GROUP) {
      if (searchListText === '') {
        inFilteredResult = false;
        this.fetchEntityList();
      } else {
        this.props.searchEntityNamePath({
          driveId: headers['V-DRIVEID'],
          entityName: searchListText,
          parentPath: headers['V-PATH']
        });
      }
    } else if (inModelOrDataset) {
      const { asset } = this.props;
      const entity = inModel ? asset.models : asset.datasets;

      filteredAsset = entity.length > 0 && searchListText.trim() !== ''
        ? entity.filter((et) => et.name.toLowerCase().indexOf(searchListText.trim().toLowerCase()) > -1)
        : entity;
    }

    this.setState(({ search }) => ({ search: { ...search, inFilteredResult }, filteredAsset, selected: { ...DEFAULT_STATE.selected } }));
  }

  handleSelectList = (event, en) => {
    const isCtrl = event.metaKey || event.ctrlKey;
    const isShift = event.shiftKey;
    const { ntype, id, idx: enIdx } = en;
    const { list: { entity } } = this.props;
    const { lastSelected } = this.state;
    if (isShift) document.getSelection().removeAllRanges();

    this.setState((prevState) => {
      const { selected } = prevState;
      let newSelected = { ...selected };

      if (isCtrl) {
        const detail = selected[ntype].find((det) => det.id === id);
        let newSelectedType = selected[ntype];
        const exist = detail && newSelectedType.findIndex((select) => select.id === detail.id) > -1;

        if (exist) newSelectedType = newSelectedType.filter((select) => select.id !== detail.id);
        else newSelectedType.push({ ...en });
        newSelected[ntype] = newSelectedType;
      } else if (isShift) {
        const selectedEntities = lastSelected < en.idx ? entity.slice(lastSelected, en.idx + 1) : entity.slice(en.idx, lastSelected + 1);
        selectedEntities.forEach((selectedEn, idx) => {
          const selectedType = newSelected[selectedEn.ntype];
          const exist = selectedType.findIndex(({ id: selectId }) => selectId === selectedEn.id) > -1;
          if (!exist) newSelected[selectedEn.ntype].push({ ...selectedEn });
        });
      } else {
        newSelected = {
          sensorgroup: [],
          sensor: [],
          datasource: [],
          folder: [],
          asset: [],
          [ntype]: [en]
        };
      }

      this.renderRightClickAction(newSelected);
      return {
        selected: newSelected,
        show: { ...prevState.show, menubarRight: false, infoDrawer: false },
        lastSelected: enIdx
      };
    });
  }

  /* 7. handle directory */
  handleBreadcrumbChange = ({ entityId, idx }) => {
    const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb');
    const breadcrumbExist = typeof breadcrumb !== 'undefined' && breadcrumb !== null && `${breadcrumb}`.trim() !== '';
    if (breadcrumbExist) {
      const jBreadcrumb = JSON.parse(breadcrumb);

      const currBreadcrumb = jBreadcrumb[idx] || {};
      const newBreadcrumb = jBreadcrumb.filter((bread, idx2) => idx2 <= idx);

      const newLocation = {
        name: currBreadcrumb.name,
        entityId: currBreadcrumb.entityId,
        path: currBreadcrumb.path
      };

      window.localStorage.setItem('MYDATA.location', JSON.stringify(newLocation));
      window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(newBreadcrumb));
      if (idx === 0) {
        this.setState(({ headers }) => ({ ...DEFAULT_STATE, headers: { ...headers, 'V-PARENTID': LOCATIONS.ROOT, 'V-PATH': '' } }), this.fetchEntityList);
      } else {
        this.setState(({ headers }) => ({ headers: { ...headers, 'V-PATH': currBreadcrumb.path, 'V-PARENTID': currBreadcrumb.entityId || LOCATIONS.ROOT } }), this.fetchEntityList);
      }
    }
  }
  /* 8. handleConfirmationModal */
  handleConfirmationModal = (props) => {
    this.toggleShow('confirmationModal', props);
  }
  /* 9. render */
  isSelectedAllError = (selected = this.state.selected) => {
    const arraySelected = [...Object.values(selected)];
    const findSuccess = arraySelected.findIndex((select) => select.status !== DATASOURCE_STATUS.ERROR) > -1;
    return !findSuccess;
  }

  handleRightMenu = (menu, value) => {
    const lmenu = menu.toLowerCase();
    this.toggleShow('menubarRight');

    if (lmenu === 'info') this.handleShowInfoDrawer();
    if (lmenu === 'pipeline sensor') this.handleConfirmationModal({ type: 'addToPipeline' });
    if (lmenu === 'pipeline') this.handleCreatePipeline();
    if (lmenu === 'sensor') this.handleConfirmationModal({ type: 'addToSensorGroup' });
    if (lmenu === 'folder') this.handleMoveDirectory(value);
    if (lmenu === 'create app') this.handleCreateApp();
    if (lmenu === 'delete') this.handleActionTrash('move');
    if (lmenu === 'sync') this.handleSync();
    if (lmenu === 'asset') this.fetchFunctionDoc();
    if (lmenu === 'restore') this.handleActionTrash('restore');
  }

  renderRightClickAction = (selected) => {
    const { actionPermission, location } = this.state;
    const { entity } = this.props.list;
    const inSensorGroup = location === LOCATIONS.SENSOR_GROUP;
    const inModel = location === LOCATIONS.MODEL;
    const inDataset = location === LOCATIONS.DATASET;
    const inTrash = location === LOCATIONS.TRASH;

    const permissionRemove = actionPermission.removeDatabase && actionPermission.removeFolder && actionPermission.removeIot;
    const permissionRestore = permissionRemove;
    const permissionAsset = (inModel && actionPermission.viewModel) || (inDataset && actionPermission.viewDataset);
    const permissionAddToPipeline = actionPermission.addToPipeline;

    const cDataSource = selected.datasource.length;
    const cAsset = selected.asset.length;
    const cSensor = selected.sensor.length;
    const cFolder = selected.folder.length;
    const cSensorGroup = selected.sensorgroup.length;


    const hasSelectedItem = cFolder + cSensor + cSensorGroup + cDataSource >= 1;
    const cAssetSuccess = cAsset > 0 ? selected.asset.filter((et) => et.status === ASSET_STATUS.SUCCESS || et.status === ASSET_STATUS.DONE).length : 0;

    const hasSensorSelected = cSensor + cSensorGroup >= 1;
    const showAddToPipeline = hasSelectedItem;
    const showAddToFolder = hasSelectedItem;
    const folders = entity.length === 0 ? [] : entity.filter((et) => et.entityType === null && et.type === FILE_TYPES.COLLECTION).map((et) => ({ label: et.name, value: et.id }));
    const showInfo = (cSensor === 1 || cSensorGroup === 1 || cDataSource === 1) && (cSensor + cSensorGroup + cDataSource === 1);
    const showTrash = cDataSource >= 1 && cSensor === 0 && cFolder === 0 && cAsset === 0 && cSensorGroup === 0 && this.isSelectedAllError(selected.datasource);
    const showSync = cSensor === 0 && cSensorGroup === 0 && cDataSource === 1 && !selected.datasource[0].entityType.startsWith('FILE_');
    const sensorgroup = entity.length === 0 ? [] : entity.filter((et) => et.entityType === ENTITY_TYPES.DEVICE_GROUP_SENSOR && et.type === FILE_TYPES.ITEM).map((et) => ({ label: et.name, value: et.id }));
    const showAddToSensorGroup = !inSensorGroup && (cSensor > 0 && cSensorGroup === 0 && cDataSource === 0 && selected.sensor.every((sensor) => sensor.type === selected.sensor[0].type));
    const showDetailAssets = (cAsset === 1 && cAssetSuccess === 1);

    const show = {
      pipeline: permissionAddToPipeline && showAddToPipeline && !hasSensorSelected,
      pipelineSensor: permissionAddToPipeline && showAddToPipeline && hasSensorSelected,
      createApp: inDataset && showDetailAssets && actionPermission && actionPermission.createApp,
      info: showInfo,
      sync: showSync,
      folders: showAddToFolder && folders && folders.length > 0,
      delete: permissionRemove && showTrash,
      sensorgroup: showAddToSensorGroup && sensorgroup && sensorgroup.length > 0,
      asset: permissionAsset && showDetailAssets,
      restore: inTrash && permissionRestore && hasSelectedItem
    };

    const submenu = {
      folders: folders || [],
      sensorgroup: sensorgroup || []
    };

    this.setState({ menuList: getMenuList(show, submenu) });
  }

  renderNewFolder = () => (
    <NewFolderModal
      rules={this.state.rules.newFolder.fields[0] || {}}
      folderName={this.state.fields.newFolder.folderName}
      isValid={this.state.isValid.newFolder}
      handleChangeInput={this.handleChangeInput}
      handleAdd={this.handleNewFolderAdd}
      handleCloseModal={() => this.toggleShow('newFolder')}
    />
  );
  renderInfoDrawer = () => {
    const { selected } = this.state;
    let selectedItem;
    const location = window.localStorage.getItem('MYDATA.location');
    const path = JSON.parse(location).name === 'ROOT' ? 'My Data' : JSON.parse(location).name;

    if (selected.sensorgroup.length === 1) selectedItem = selected.sensorgroup[0];
    else if (selected.sensor.length === 1) selectedItem = selected.sensor[0];
    else if (selected.datasource.length === 1) selectedItem = selected.datasource[0];
    else if (selected.folder.length === 1) selectedItem = selected.folder[0];
    else if (selected.asset.length === 1) selectedItem = selected.asset[0];
    else return null;

    return (
      <React.Fragment>
        <div className="column is-4 main-content-body-right">
          <table className="table-info-detail">
            <tbody>
              <tr>
                <th className="is-uppercase header-table-info" colSpan="3" style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                  <div className="th-info">
                    <FolderIcon />
                  </div>
                  <div className="th-info">
                    {selectedItem.name}
                  </div>
                  <div className="th-info" style={{ float: 'right' }}>
                    <div className="is-pulled-right has-cursor-pointer" onClick={() => this.toggleShow('infoDrawer')}><CloseIcon /></div>
                  </div>
                </th>
              </tr>
              <tr>
                <td className="is-uppercase pl16px">Type</td>
                <td className="pl24px">{selectedItem.type}</td>
              </tr>
              <tr>
                <td className="is-uppercase pl16px">Location</td>
                <td className="pl24px"><span className="folder-path"><FolderIcon />&nbsp;&nbsp;&nbsp;{path}</span></td>
              </tr>
              <tr>
                <td className="is-uppercase pl16px">Owner</td>
                <td className="pl24px">{selectedItem.creatorName}</td>
              </tr>
              <tr>
                <td className="is-uppercase pl16px">Date Modified</td>
                <td className="pl24px">{selectedItem.dateModified}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }

  actionOnConfirm = () => {
    const { type, menu } = this.state.modalData;
    const actions = {
      addToSensorGroup: () => this.handleAddToSensorGroup(menu),
      addToPipeline: () => this.handleCreatePipeline()
    };

    return actions[type];
  };

  renderConfirmationModal = () => {
    const { type, status } = this.state.modalData;
    const confirmationModalProps = { ...CONFIRMATION_CONTENT[type], status };
    if (type === 'failedToMoveDirectory') confirmationModalProps.subtitle = this.props.list.errorMsg;

    return (
      <ModalConfirm
        isShow={true}
        {...confirmationModalProps}
        onCancel={() => this.toggleShow('confirmationModal', DEFAULT_STATE.modalData)}
        onConfirm={this.actionOnConfirm()}
      />
    );
  }
  renderNewSensorGroup = () => {
    let { sensors } = this.props.list;
    if (sensors.length > 0) sensors = sensors.filter((sensor) => sensor.status === SENSOR_STATUS.mappingRequired);
    return (
      <NewSensorGroupModal
        fields={this.state.fields.newSensorGroup}
        rules={this.state.rules.newSensorGroup}
        sensors={sensors}
        isValid={this.state.isValid.newSensorGroup}
        handleChangeInput={this.handleChangeInput}
        handleSelectSensor={this.handleNewSensorGroupSelectSensor}
        search={this.state.search.newSensorGroup}
        handleAdd={this.handleNewSensorGroupAdd}
        handleCloseModal={() => this.toggleShow('newSensorGroup')}
        handleChangeSearch={this.handleNewSensorGroupChangeSearch}
      />
    );
  }

  renderAssetDetail = () => {
    const { location, selected: { asset } } = this.state;
    const { datasets, models, apikey, functionDoc } = this.props.asset;
    if (location === LOCATIONS.DATASET && datasets.length > 0) {
      const dataset = datasets.find((ds) => ds.id === asset[0].id || '');
      if (dataset) {
        return (
          <DatasetDetailModal
            accuracy={this.state.accuracy || 0}
            isDataset={true}
            assetId={asset[0].id}
            handleCloseModal={this.toggleShow}
            dateCreated={dataset.createdAt}
            queryBuilders={functionDoc.query_builders || []}
            assetName={dataset.name}
            apikey={apikey}
            endpoints={dataset.endPoints}
            accessToken={accessToken()}
          />
        );
      }
    } else if (location === LOCATIONS.MODEL && models.length > 0) {
      const model = models.find((md) => md.id === asset[0].id || '');
      return (
        <ModelDetailModal
          assetId={asset[0].id}
          model={model}
          handleCloseModal={this.toggleShow}
          dateCreated={model.createdAt}
          queryBuilders={functionDoc.query_builders || []}
          assetName={model.name}
          webAPI={this.props.services.webAPI}
          endpoints={model.endPoints}
          accessToken={accessToken()}
        />);
    }
    this.toggleShow('assetDetail');
    return null;
  }

  renderIcon = (iconName) =>  {
    const icons = {
      sensorgroup: <SensorGroupIcon color={colors.gold} />,
      iotdevice: <DeviceIcon />,
      sql: <DatabaseIcon />,
      folder: <FolderIcon color={colors.gold} />,
      dataset: <DatasetIcon color={colors.gold} />,
      model: <ModelIcon color={colors.gold} />,
      trash: <TrashFolderIcon color={colors.gold} />,
      default: <FileIcon />
    };
    return icons[iconName] || icons.default;
  }

  entitiesbyLocation = (location) => {
    const { models, datasets, entity } = this.props.list;
    const entities = {
      [LOCATIONS.DATASET]: datasets,
      [LOCATIONS.MODEL]: models,
      default: entity
    };
    return entities[location] || entities.default;
  }

  entityTypebyLocation = (location) => {
    const entities = {
      [LOCATIONS.DATASET]: 'datasets',
      [LOCATIONS.MODEL]: 'models',
      default: 'entity'
    };
    return entities[location] || entities.default;
  }

  handleSort = (name) => {
    const { location } = this.state;

    this.setState((prevState) => {
      const inActiveField = prevState.sort.activeField === name;
      return {
        sort: {
          activeField: name,
          isAsc: inActiveField ? !prevState.sort.isAsc : false
        }
      };
    }, () => {
      this.props.sortEntities({
        name,
        prevEntities: this.entitiesbyLocation(location),
        entityType: this.entityTypebyLocation(location),
        sortType: (this.state.sort.isAsc ? 'asc' : 'desc')
      });
    });
  }

  getTableRowsParams = (en) => {
    const { selected: selectedCol } = this.state;
    const isSelected = en.id && selectedCol[en.ntype] && selectedCol[en.ntype].length > 0 && selectedCol[en.ntype].findIndex((select) => `${select.id}` === `${en.id}`) > -1;
    const tableRows = {
      folder: {
        en,
        isSelected,
        handleClick: (event) => this.handleSelectList(event, en),
        handleDoubleClick: () => this.fetchDetailList({ entity: en })
      },
      sensorgroup: {
        en,
        isSelected,
        handleClick: (event) => this.handleSelectList(event, en),
        handleDoubleClick: () => {
          this.handleChangeLocation('Sensor Group');
          this.fetchDetailList({ entity: en });
        }
      },
      asset: {
        en,
        isSelected,
        handleClick: (event) => this.handleSelectList(event, en),
        handleDoubleClick: null
      },
      default: {
        en,
        isSelected,
        handleClick: (event) => this.handleSelectList(event, en),
        handleDoubleClick: null
      }
    };

    return tableRows[en.ntype] || tableRows.default;
  }

  getSystemFolders = () => {
    const DEFAULT_ENTITY = { creatorName: '-', type: 'System Folder', size: '-', updatedAt: '-', status: '-' };
    const folders = [
      {
        en: { ...DEFAULT_ENTITY, name: 'My Dataset' },
        isSelected: false,
        handleClick: () => null,
        handleDoubleClick: () => this.handleChangeLocation(LOCATIONS.DATASET)
      },
      {
        en: { ...DEFAULT_ENTITY, name: 'My Model' },
        isSelected: false,
        handleClick: () => null,
        handleDoubleClick: () => this.handleChangeLocation(LOCATIONS.MODEL)
      },
      {
        en: { ...DEFAULT_ENTITY, driveId: this.state.headers['V-DRIVEID'], name: 'Trash' },
        isSelected: false,
        handleClick: () => null,
        handleDoubleClick: () => this.handleChangeLocation(LOCATIONS.TRASH)
      }
    ];

    return folders;
  }

  renderTableRow = (en, isSelected, handleClick, handleDoubleClick) => {
    const icon = ENTITY_ICON[en.type] || ENTITY_ICON[en.entityType] || ENTITY_ICON[en.name];
    en.labelType = ENTITY_TYPE_LABEL[en.type] || ENTITY_TYPE_LABEL[en.entityType] || en.type;

    return (
      <React.Fragment key={en.id}>
        <tr key={en.id} onContextMenu={(evt) => this.renderContextMenu(evt, en)} onClick={(evt) => handleClick(evt, en)} className={ isSelected && 'is-active' } onDoubleClick={handleDoubleClick ? () => handleDoubleClick(en) : null }>
          <td style={{ width: '25.84%' }}><div className={`table-icon ${isSelected ? 'icon-selected' : '' }`}>{this.renderIcon(icon)} &nbsp;&nbsp; {en.name}</div></td>
          <td style={{ width: '15.94%' }}><div> {en.creatorName} </div></td>
          <td style={{ width: '15.94%' }}>{ENTITY_TYPE_LABEL[en.type] || ENTITY_TYPE_LABEL[en.entityType] || en.type}</td>
          <td style={{ width: '7.9%' }}>{en.size}</td>
          <td style={{ width: '15.94%' }}>{en.updatedAt}</td>
          <td style={{ width: '18.34%' }}>{en.status || '-'}</td>
        </tr>
      </React.Fragment>
    );
  };

  /* SET NYPES TO ENTITY */
  setNtype = (fileType, entityType = '') => {
    const ntypes = {
      [FILE_TYPES.ITEM]: this.setNtypeItem(entityType),
      [FILE_TYPES.COLLECTION]: NTYPES.FOLDER,
      [FILE_TYPES.MODEL]: NTYPES.ASSET,
      [FILE_TYPES.DATASET]: NTYPES.ASSET
    };

    return ntypes[fileType] || '';
  }

  setNtypeItem = (entityType = '') => {
    const ntypes = {
      [ENTITY_TYPES.DEVICE_SENSOR]: NTYPES.SENSOR,
      [ENTITY_TYPES.DEVICE_GROUP_SENSOR]: NTYPES.SENSORGROUP,
      default: NTYPES.DATASOURCE
    };

    return ntypes[entityType] || ntypes.default;
  }
  /* --- SET NYPES TO ENTITY */

  /* Size and Status. Based on Ntypes */
  getSizeAndStatus = (en) => {
    const sizes = {
      [NTYPES.DATASOURCE]: this.setDatasourceSizeStatus(en),
      [NTYPES.SENSOR]: { size: '-', status: this.setSensorStatus(en) },
      [NTYPES.ASSET]: { size: en.size, status: en.status },
      default: { size: '-', status: '-' }
    };

    return sizes[en.ntype] || sizes.default;
  }

  setDatasourceSizeStatus = (en) => {
    const { connectorsData } = this.props.list;
    let size = '-';
    let status = '-';

    if (connectorsData.length > 0) {
      const currDatasource = connectorsData.find((con) => con.connectorId === en.id);

      if (currDatasource && currDatasource !== null && typeof currDatasource.scheduledJob !== 'undefined'
          && currDatasource.scheduledJob !== null
          && typeof currDatasource.scheduledJob.lastRunStatus !== 'undefined') {
        status = `${currDatasource.scheduledJob.lastRunStatus}`.replace(/_/g, ' ');
      }

      if (currDatasource && currDatasource !== null && typeof currDatasource.dataIntegrationMeta !== 'undefined'
          && currDatasource.dataIntegrationMeta !== null && typeof currDatasource.dataIntegrationMeta.size !== 'undefined'
          && currDatasource.dataIntegrationMeta.size !== null) {
        en.origSize = currDatasource.dataIntegrationMeta.size;
        size = filesize(currDatasource.dataIntegrationMeta.size);
      }
    }
    return { size, status };
  }

  setSensorStatus = (en) => {
    const { sensors } = this.props.list;
    let status = '-';

    if (sensors.length > 0) {
      const currSensor = sensors.find((sensor) => sensor.id === en.id);
      if (currSensor && currSensor !== 'null' && currSensor.status) {
        status = `${currSensor.status}`.replace(/_/g, ' ');
      }
    }

    return status;
  }
  /* --- Size and Status*/

  renderEntity = () => {
    const { entity: realEntity } = this.props.list;
    const { filteredAsset, thead, location, search: { inFilteredResult } } = this.state;
    const isFreeType = location === '';
    const isDataset = location === LOCATIONS.DATASET;
    const isModel = location === LOCATIONS.MODEL;
    const entity = (isDataset || isModel) ? filteredAsset : realEntity;
    const inRoot = this.state.headers['V-PATH'] === '' && isFreeType;
    const noPath = typeof this.props.path === 'undefined' || !this.props.path || this.props.path === null;
    const isRenderSystemFolder = !inFilteredResult && inRoot && noPath;
    const systemFolders = this.getSystemFolders();

    return (
      <React.Fragment>
        <table className="table is-fullwidth is-selectable is-standard tbl-set-width">
          <thead className="has-text-gray">
            <tr>
              {
                thead.map((th, idx) => {
                  return (
                    <th key={idx} onClick={th.isSortAble ? (() => this.handleSort(th.origName)) : null} className="table-header" style={{ width: th.width }}>
                      <div className="thead-icon">
                        {th.name}
                        { this.state.sort.activeField === th.origName && this.state.sort.isAsc && <ArrowDropUpFullIcon /> }
                        { this.state.sort.activeField === th.origName && !this.state.sort.isAsc && <ArrowDropDownFullIcon /> }
                      </div>
                    </th>
                  );
                })
              }
            </tr>
            <tr className="table-content">
              <td colSpan="6">
                <div style={{
                  width: '100%',
                  maxHeight: 'calc(100vh - 313px)',
                  overflow: 'auto'
                }}>
                  <table className="table is-fullwidth is-selectable is-standard tbl-set-width">
                    <tbody>
                      {
                        isRenderSystemFolder && systemFolders && systemFolders.length > 0 &&
                        systemFolders.map((params) => {
                          const { en, isSelected, handleClick, handleDoubleClick } = params;
                          return this.renderTableRow(en, isSelected, handleClick, handleDoubleClick);
                        })
                      }

                      {
                        entity && entity.length > 0 && entity.map((en, idx) => {
                          en.ntype = this.setNtype(en.type, en.entityType);
                          en.idx = idx;

                          const { size, status } = this.getSizeAndStatus(en);
                          en.size = size;
                          en.status = status;

                          const { isSelected, handleClick, handleDoubleClick } = this.getTableRowsParams(en);
                          return this.renderTableRow(en, isSelected, handleClick, handleDoubleClick);
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </thead>
        </table>
      </React.Fragment>
    );
  }

  renderFooter = () => {
    const { selected } = this.state;
    if (selected) {
      const selectedEntity = Object.values(selected)
        .filter((select) => select.length > 0)
        .map((select) => {
          const types = select.reduce((carry, en) => {
            const key = ENTITY_TYPE_LABEL[en.type] || ENTITY_TYPE_LABEL[en.entityType] || en.type || '';
            carry[key] = !carry[key] ? 1 : carry[key] + 1;
            return carry;
          }, {});

          return Object.entries(types).map(([key, value]) => `${value} ${`${key}${value > 1 ? 's' : ''}`}`).join(', ');
        });
      return selectedEntity.join(', ') || '';
    }
    return '';
  }

  renderContextMenu = (evt, en) => {
    evt.preventDefault();
    this.handleSelectList(evt, en);
    let { position: { left, top } } = this.state;

    const screenY = (window.outerHeight - evt.screenY) < 300 ? evt.screenY - 400 : evt.screenY - 280;
    const screenX = (window.outerWidth - evt.screenX) < 700 ? evt.screenX - 450 : evt.screenX - 120;
    top = Math.ceil(screenY / 16);
    left = Math.ceil(screenX / 16);

    this.setState({ position: { left, top } });
    this.toggleShow('menubarRight');
  }

  getBreadcrumbList = () => {
    if (typeof window !== 'undefined' && typeof window.localStorage && window.localStorage.getItem('MYDATA.breadcrumb')) {
      return JSON.parse(window.localStorage.getItem('MYDATA.breadcrumb'));
    }
    return [];
  }

  renderMouseLeave = () => {
    this.toggleShow('menubar');
    document.getElementById('mouse-leave').style.display = 'none';
  }

  render() {
    const { show, location, actionPermission } = this.state;
    const isTrash = location === LOCATIONS.TRASH;
    const notAbleToaddNewData = location === LOCATIONS.MODEL || location === LOCATIONS.DATASET || isTrash;
    const isSensorGroup = location === LOCATIONS.SENSOR_GROUP;
    const permissionAddNew = actionPermission.addNewData;
    console.log('DEFAULTTTTT =====>', DEFAULT_STATE)

    return (
      <SidebarContentLayout
        title="My Data"
        handleAddNewData={notAbleToaddNewData || !permissionAddNew ? null : this.handleAddNewData}
        addButtonTitle="Add New Data"
        pathname= {myData}
        handleSearchChange={this.handleSearchChange}
        search={this.state.search.list || ''}
        handleSearchList={this.handleSearchList}
        handleBreadcrumbChange={this.handleBreadcrumbChange}
        breadcrumbList={this.getBreadcrumbList()}
      >
        <StyleBulma helper section column hero button table form />
        <StyleCustom base helper button mainContent table form />
        <StyleMyData breadcrumb topAction infoDrawer entityTable selectType />

        { show.menubar &&
          <div style={{ position: 'absolute' }} onMouseLeave={this.renderMouseLeave} id="mouse-leave">
            <MenuBar handleChangeMenu={this.handleChangeMenu} isSensorGroup={isSensorGroup} actionPermission={actionPermission} />
          </div>
        }
        { show.menubarRight &&
          <div style={{ display: 'inline', position: 'absolute', left: `${this.state.position.left}rem`, top: `${this.state.position.top}rem` }} id="menuBar">
            <MenuBarRight handleChangeMenu={this.handleRightMenu} menuList={this.state.menuList} />
          </div>
        }
        { show.newFolder && this.renderNewFolder() }
        { show.newSensorGroup && this.renderNewSensorGroup() }
        { show.assetDetail && this.renderAssetDetail() }
        { show.confirmationModal && this.renderConfirmationModal() }
        <div className="hero-body">
          <div className="columns m0">
            <div className="column main-content-body">
              <div className="columns m0 fit-table">
                <div className="column main-content-body">
                  <div className="columns mt0 fit-table">
                    <div className="column main-content-body-left">
                      {this.state.show.entityContent && this.renderEntity()}
                    </div>
                    { !notAbleToaddNewData && show.infoDrawer && this.renderInfoDrawer() }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <div className="columns m0">
            <div className="column main-content-foot vertical-center">
              {this.renderFooter()}
            </div>
          </div>
        </div>
      </SidebarContentLayout>
    );
  }
}
