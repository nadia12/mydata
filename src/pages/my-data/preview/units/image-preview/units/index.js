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
import { NoDataBoxStyle } from '../../style'
import method from './lifecycle'

const ImagePreview = ({
  infoData, urlPreview, setErrorMediaPreview, errorMedia,
}) => {
  const [width, setWidth] = useState(100)

  const addWidth = () => {
    if (width < 100) return setWidth(width + 10)
  }

  const substractWidth = () => {
    if (width > 0) return setWidth(width - 10)
  }

  return (
    <>
      <PreviewBoxStyle>
        <PreviewBoxStyle.ImageBox>
          { !errorMedia ? (
            <div className="vertical-center">
              <img
                src={urlPreview()}
                alt="image_preview"
                onError={() => setErrorMediaPreview('Image')}
                style={{
                  width: `${width}%`,
                }}
              />
            </div>
          )
            : <NoDataBoxStyle> No Data </NoDataBoxStyle> }
        </PreviewBoxStyle.ImageBox>

        <PreviewBoxStyle.ControlBox className="vertical-center">
          { !errorMedia && (
          <>
            <AddCircleIcon onClick={() => addWidth()} />
            <Input
              value={width}
              onChange={e => setWidth(e.target.value)}
            />
            <span>%</span>
            <RemoveCircleIcon onClick={() => substractWidth()} />
          </>
          )}
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
  urlPreview: PropTypes.func,
  setErrorMediaPreview: PropTypes.func,
  errorMedia: PropTypes.string,
}

ImagePreview.defaultProps = {
  infoData: {},
  urlPreview: () => {},
  setErrorMediaPreview: () => {},
  errorMedia: null,
}

export default lifecycle(method)(ImagePreview)
