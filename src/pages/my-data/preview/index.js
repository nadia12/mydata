import React from 'react'
import {
  connect,
} from 'react-redux'
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
import { SET_ICON } from './constant'
import TabularPreview from './units/tabular-preview'
import ImagePreview from './units/image-preview'
import VideoPreview from './units/video-preview'

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
    const previewComponent = {
      'Image File': <ImagePreview />,
      'Video File': <VideoPreview />,
      tabular: <TabularPreview />,
    }

    return previewComponent[uiEntityType] || previewComponent.tabular
  },
  resetState: () => dispatch(resetState()),
  handleSelectAction: val => dispatch(handleSelectAction(val, props.linkTo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
