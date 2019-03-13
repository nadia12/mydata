import { connect } from 'react-redux'
import MyData from './units'
import MY_DATA from '../../dummy-data/my-data'

console.log('MYDATA =========>', MY_DATA)

const mapStateToProps = ({ asset, listMyData }) => ({
  asset, list: JSON.parse(JSON.stringify(MY_DATA))
});

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
