import { connect } from 'react-redux'
import MyData from './units'
import MY_DATA from '../../dummy-data/my-data'

<<<<<<< HEAD
console.log('MYDATA =========>', MY_DATA)

const mapStateToProps = ({ asset, listMyData }) => ({
  asset, list: JSON.parse(JSON.stringify(MY_DATA))
});
=======
const mapStateToProps = state => ({
  // count: state._mydata.count
})
>>>>>>> 09dcf1573484a1b4e0b300e5c518162310012911

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
