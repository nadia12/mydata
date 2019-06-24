import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import PlaceholderLoader from 'GlobalComponent/placeholder-loader/units'
import PreviewBoxStyle from './style'

// component
import method from './lifecycle'

const VideoPreview = ({ infoData }) => (

  <>
    <PreviewBoxStyle>
      <PreviewBoxStyle.VideoBox>
        {!!infoData.id && (
          <video
            width="960"
            height="480"
            controls
          >
            <track kind="captions" />
            <source src="https://www.w3schools.com/tags/movie.mp4" />
          </video>
        )}
        {!infoData.id && <PlaceholderLoader width="960px" height="480px" />}
      </PreviewBoxStyle.VideoBox>
    </PreviewBoxStyle>
  </>
)

VideoPreview.propTypes = {
  infoData: PropTypes.object,
}

VideoPreview.defaultProps = {
  infoData: {},
}

export default lifecycle(method)(VideoPreview)
