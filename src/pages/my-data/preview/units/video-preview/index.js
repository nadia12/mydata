import {
  connect,
} from 'react-redux'
import VideoPreview from './units'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  infoData: _mydataPreview.info.data,
})

const mapDispatchToProps = () => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoPreview)
