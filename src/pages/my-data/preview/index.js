import React from 'react'
import {
  connect,
} from 'react-redux'
import Spinner from 'Asset/images/spinner'
import Preview from './units'
import {
  getInfoEntity,
  toogleShowInfo,
  linkToMyDataRoot,
  handleSelectAction,
} from './function'
import {
  resetState,
} from './reducer'
import { SET_ICON, TABULAR_TYPES } from './constant'
import TabularPreview from './units/tabular-preview'
import ImagePreview from './units/image-preview'
import VideoPreview from './units/video-preview'
import { NoDataBoxStyle } from './units/style'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  previewData: _mydataPreview.preview.data,
  infoData: _mydataPreview.info.data,
  isErrorPreview: !!_mydataPreview.preview.errorMessage,
  show: _mydataPreview.show,
  selectAction: _mydataPreview.selectAction,
  setIcon: SET_ICON,
})

const mapDispatchToProps = (dispatch, props) => ({
  getInfoEntity: id => dispatch(getInfoEntity(id)),
  toogleShowInfo: () => dispatch(toogleShowInfo()),
  linkToMyDataRoot: () => dispatch(linkToMyDataRoot(props.linkTo)),
  renderPreview: (uiEntityType = '') => {
    const type = TABULAR_TYPES.includes(uiEntityType) ? 'Tabular' : uiEntityType

    const previewComponent = {
      'Image File': <ImagePreview />,
      'Video File': <VideoPreview />,
      Tabular: <TabularPreview />,
      default: <NoDataBoxStyle><Spinner /></NoDataBoxStyle>,
    }

    return previewComponent[type] || previewComponent.default
  },
  resetState: () => dispatch(resetState()),
  handleSelectAction: val => dispatch(handleSelectAction(val, props.linkTo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
