import {
  connect,
} from 'react-redux'
import {
  getUrlId,
} from 'Config/lib/url-helper'
import {
  setErrorMediaPreview,
} from 'MyData/preview/reducer'
import ImagePreview from './units'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  infoData: _mydataPreview.info.data,
  errorMedia: _mydataPreview.media.errorMessage,
})

const mapDispatchToProps = dispatch => ({
  urlPreview: () => dispatch((dispatch, getState) => {
    const {
      service: { host },
    } = getState().volantisConstant

    return `${host}/v2/query/file/image/${getUrlId()}`
  }),
  setErrorMediaPreview: type => dispatch(setErrorMediaPreview(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview)
