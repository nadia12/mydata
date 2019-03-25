const componentDidMount = (props) => {
  props.getEntityList()
}

const componentDidUpdate = (props, prevProps) => { 
  // const { activeField } = prevState.sort;

  const didFetchEntityList = !!props._mydataList.entities && prevProps._mydataList.entities !== props._mydataList.entities;
 
  if (didFetchEntityList) {
    const { entities } = props._mydataList;
    // this.handleSort(activeField);
    const connectorIds = entities.map((et) => (et.id));
    props.postConnectorData(connectorIds);
  }

}
  
export default {
  componentDidMount,
  componentDidUpdate
}