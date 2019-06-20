import React from 'react'
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
import TabularPreview from './units/tabular-preview'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  previewData: _mydataPreview.preview.data,
  infoData: _mydataPreview.info.data,
  isErrorPreview: !!_mydataPreview.preview.errorMessage,
  show: _mydataPreview.show,
  setIcon: SET_ICON,
})

const mapDispatchToProps = (dispatch, props) => ({
  getInfoEntity: id => dispatch(getInfoEntity(id)),
  toogleShowInfo: () => dispatch(toogleShowInfo()),
  linkToMyDataRoot: () => dispatch(linkToMyDataRoot(props.linkTo)),
  renderPreview: (uiEntityType = '') => {
    const previewComponent = {
      'Image File': <TabularPreview />,
      'Video File': <TabularPreview />,
      tabular: <TabularPreview />,
    }

    return previewComponent[uiEntityType] || previewComponent.tabular
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
