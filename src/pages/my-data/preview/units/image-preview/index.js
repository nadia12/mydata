import {
  connect,
} from 'react-redux'
import ImagePreview from './units'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  infoData: _mydataPreview.info.data,
})

const mapDispatchToProps = () => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview)
