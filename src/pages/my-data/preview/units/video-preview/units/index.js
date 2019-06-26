import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import PlaceholderLoader from 'GlobalComponent/placeholder-loader/units'
import PreviewBoxStyle from './style'
import { NoDataBoxStyle } from '../../style'
import method from './lifecycle'

const VideoPreview = ({
  infoData, urlPreview, setErrorMediaPreview, errorMedia,
}) => (
  <>
    <PreviewBoxStyle>
      <PreviewBoxStyle.VideoBox>
        {!errorMedia ? (
          <video
            width="960"
            height="480"
            controls
          >
            <track kind="captions" />
            <source src={urlPreview()} onError={() => setErrorMediaPreview('Video')} />
          </video>
        ) : <NoDataBoxStyle>No Data</NoDataBoxStyle>}
        {!infoData.id && <PlaceholderLoader width="960px" height="480px" />}
      </PreviewBoxStyle.VideoBox>
    </PreviewBoxStyle>
  </>
)

VideoPreview.propTypes = {
  infoData: PropTypes.object,
  urlPreview: PropTypes.func,
  setErrorMediaPreview: PropTypes.func,
  errorMedia: PropTypes.string,
}

VideoPreview.defaultProps = {
  infoData: {},
  urlPreview: () => {},
  setErrorMediaPreview: () => {},
  errorMedia: null,
}

export default lifecycle(method)(VideoPreview)
