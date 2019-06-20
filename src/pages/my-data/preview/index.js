import {
  connect,
} from 'react-redux'
import Preview from './units'
import {
  getInfoEntity,
  toogleShowInfo,
} from './function'
import { SET_ICON } from './constant'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  previewData: _mydataPreview.preview.data,
  infoData: _mydataPreview.info.data,
  errorPreview: _mydataPreview.preview.errorMessage,
  show: _mydataPreview.show,
  setIcon: SET_ICON,
})

const mapDispatchToProps = dispatch => ({
  getInfoEntity: id => dispatch(getInfoEntity(id)),
  toogleShowInfo: () => dispatch(toogleShowInfo()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
