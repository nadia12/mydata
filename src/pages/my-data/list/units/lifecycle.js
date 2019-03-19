const componentDidMount = (props) => {
  props.getEntityList()
}

const componentDidUpdate = (prevProps, prevState) => { 
  console.log('==========> componentDidUpdate', prevProps, prevState)
  // const { activeField } = prevState.sort;
    // const didFetchEntityList = prevProps.list.getEntityListState !== this.props.list.getEntityListState && this.props.list.getEntityListState === stateStatus.success;

}
  
export default {
  componentDidMount,
  componentDidUpdate
}