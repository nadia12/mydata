import React from 'react'
// import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import PreviewBoxStyle from './style'

// component
import method from './lifecycle'

const VideoPreview = () => (

  <>
    <PreviewBoxStyle>
      <PreviewBoxStyle.VideoBox>
        <video
          width="960"
          height="480"
          controls
        >
          <track kind="captions" />
          <source src="https://www.w3schools.com/tags/movie.mp4" />
        </video>
      </PreviewBoxStyle.VideoBox>
    </PreviewBoxStyle>
  </>
)

VideoPreview.propTypes = {
}

VideoPreview.defaultProps = {
}

export default lifecycle(method)(VideoPreview)
