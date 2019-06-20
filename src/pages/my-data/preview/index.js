import {
  connect,
} from 'react-redux'
import Preview from './units'
import {
  getInfoEntity,
  toogleShowInfo,
  linkToMyDataRoot,
} from './function'
import { SET_ICON } from './constant'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  previewData: _mydataPreview.preview.data,
  infoData: _mydataPreview.info.data,
  errorPreview: _mydataPreview.preview.errorMessage,
  show: _mydataPreview.show,
  setIcon: SET_ICON,
})

const mapDispatchToProps = (dispatch, props) => ({
  getInfoEntity: id => dispatch(getInfoEntity(id)),
  toogleShowInfo: () => dispatch(toogleShowInfo()),
  linkToMyDataRoot: () => dispatch(linkToMyDataRoot(props.linkTo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
