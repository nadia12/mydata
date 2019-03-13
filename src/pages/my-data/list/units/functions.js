renderRightClickAction = (selected, state, props) => {
    const { actionPermission, location } = state;
    const { entity } = props.list;
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

  handleSelectList = (event, en, state, props) => {
    const isCtrl = event.metaKey || event.ctrlKey;
    const isShift = event.shiftKey;
    const { ntype, id, idx: enIdx } = en;
    const { list: { entity } } = props;
    const { lastSelected } = state;
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

      renderRightClickAction(newSelected, state, props);
      return {
        selected: newSelected,
        show: { ...prevState.show, menubarRight: false, infoDrawer: false },
        lastSelected: enIdx
      };
    });
  }


  export {
    handleSelectList
  }
