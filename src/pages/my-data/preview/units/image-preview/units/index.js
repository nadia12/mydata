import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import {
  AddCircleIcon,
  RemoveCircleIcon,
} from 'volantis-icon'
import { Input } from 'volantis-ui'
import PreviewBoxStyle from './style'

// component
import method from './lifecycle'

const ImagePreview = () => {
  const [width, setWidth] = useState(100)

  return (

    <>
      <PreviewBoxStyle>
        <PreviewBoxStyle.ImageBox>
          <img
            src="https://3.bp.blogspot.com/-o7ZZcvQPbjc/WmlAVhTTWZI/AAAAAAAAJ80/py1YT7BLT5UaI9Uo5w6c4ElUxhLrVYqmQCLcBGAs/s1600/Logo-Menu.png"
            alt="preview"
            style={{
              width: `${width}%`,
            }}
          />
        </PreviewBoxStyle.ImageBox>

        <PreviewBoxStyle.ControlBox className="vertical-center">
          <AddCircleIcon onClick={() => setWidth(width + 1)} />
          <Input
            value={width}
            onChange={e => setWidth(e.target.value)}
          />
          <span>%</span>
          <RemoveCircleIcon onClick={() => setWidth(width - 1)} />
        </PreviewBoxStyle.ControlBox>
      </PreviewBoxStyle>
    </>
  )
}

ImagePreview.propTypes = {
}

ImagePreview.defaultProps = {
}

export default lifecycle(method)(ImagePreview)
