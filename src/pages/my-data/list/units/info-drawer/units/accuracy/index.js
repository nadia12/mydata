import { connect } from 'react-redux'
import Accuracy from './units'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  asset: _mydataList.selected.asset[0],
  metricPerformance: _mydataList.assetDetail.mp,
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Accuracy)
