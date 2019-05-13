const componentDidMount = props => {
  if (!!props.asset.length && props.asset[0].uiEntityType === 'Model') props.getInfoAccuracy(props.asset[0].id)
}

export default {
  componentDidMount,
}
