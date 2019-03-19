import { connect } from 'react-redux'
import List from './units'
import { getEntityList, setEntities } from './units/functions'
const mapStateToProps = state => {
  return {
    entities: state._mydataList.entities,
    connectorsData: state._mydataList.connectorsData,
    sensors: state._mydataList.sensors
}};

const mapDispatchToProps = dispatch => ({
  // getEntityList: () => dispatch(getEntityList(undefined, undefined, undefined, (res, err) => {
  //   dispatch(setEntities(res, err))
  // })),
  getEntityList: () => dispatch(getEntityList(undefined, undefined, undefined))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
