import {
  connect,
} from 'react-redux'
import {
  getUrlId,
} from 'Config/lib/url-helper'
import VideoPreview from './units'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  infoData: _mydataPreview.info.data,
})

const mapDispatchToProps = dispatch => ({
  urlPreview: () => dispatch((dispatch, getState) => {
    const {
      service: { host },
    } = getState().volantisConstant

    return `${host}/v2/query/file/video/${getUrlId()}`
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoPreview)
