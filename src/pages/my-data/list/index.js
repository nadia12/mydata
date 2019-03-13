import { connect } from 'react-redux'
import MyData from './units'
import MY_DATA from '../../dummy-data/my-data'

const mapStateToProps = ({ asset, listMyData }) => ({
  asset, list: JSON.parse(JSON.stringify(MY_DATA))
});

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
