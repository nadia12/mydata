fetchFunctionDoc = async (state, props) => {
    const { selected: { asset } } = state;
    await props.getFunctionDoc({ assetId: asset[0].id, componentType: `${asset.type}`.toUpperCase() });
    let accuracy = 0;
    if (asset[0].type === 'Model') accuracy = await props.getAccuracy({ asset: asset[0] });
    this.setState((prevState) => ({ ...prevState, accuracy }));
    this.toggleShow('assetDetail');
  }

  fetchEntityList = async (state, props) => {
    const location = JSON.parse(window.localStorage.getItem('MYDATA.location'));
    const req = {
      driveId: state.headers['V-DRIVEID'],
      entityId: location.entityId
    };
    this.setState(({ show }) => ({
      show: { ...show, entityContent: false },
      selected: { sensorgroup: [], sensor: [], datasource: [], folder: [], asset: [] }
    }));
    await props.getEntityList(req);
  }

export {
  fetchFunctionDoc,
  fetchEntityList
}

