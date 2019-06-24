import React, { useState } from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import {
  AddCircleIcon,
  RemoveCircleIcon,
} from 'volantis-icon'
import { Input } from 'volantis-ui'
import PlaceholderLoader from 'GlobalComponent/placeholder-loader/units'
import PreviewBoxStyle from './style'

// component\
import method from './lifecycle'

const ImagePreview = ({ infoData }) => {
  const [width, setWidth] = useState(100)

  return (

    <>
      <PreviewBoxStyle>
        <PreviewBoxStyle.ImageBox>
          <div className="vertical-center">
            <img
              src="data:image/png;base64,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"
              alt="image_preview"
              style={{
                width: `${width}%`,
              }}
            />
          </div>
          {!infoData.id && <PlaceholderLoader width="960px" height="450px" />}
        </PreviewBoxStyle.ImageBox>

        <PreviewBoxStyle.ControlBox className="vertical-center">
          <AddCircleIcon onClick={() => setWidth(width + 1)} />
          <Input
            value={width}
            onChange={e => setWidth(e.target.value)}
          />
          <span>%</span>
          <RemoveCircleIcon onClick={() => setWidth(width - 1)} />
          {!infoData.id && (
            <>
              <PlaceholderLoader width="30px" height="30px" className="mr16px" />
              <PlaceholderLoader width="50px" height="30px" className="mr16px" />
              <PlaceholderLoader width="30px" height="30px" />
            </>
          )}
        </PreviewBoxStyle.ControlBox>
      </PreviewBoxStyle>
    </>
  )
}

ImagePreview.propTypes = {
  infoData: PropTypes.object,
}

ImagePreview.defaultProps = {
  infoData: {},
}

export default lifecycle(method)(ImagePreview)
