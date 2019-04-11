import { connect } from 'react-redux'
import Detail from './units'

const mapStateToProps = state => ({
  selected: state._mydataList.selected,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
