import React from 'react'
// import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'

// import {
//   Row, Column,
// } from 'volantis-ui'

import {
  AddCircleIcon,
  RemoveCircleIcon,
} from 'volantis-icon'

// component
import method from './lifecycle'

const ImagePreview = () => (
  <>
    <div
      style={{
        background: '#1b1c21', height: 'calc(100vh - 189px)', overflow: 'auto', display: 'grid', width: '100%',
      }}
    >
      <div
        xs={12}
        className="vertical-center preview-image"
        style={{
          width: '100%',
        }}
      >
        <img
          // src="http://addcar.com.br/assets/img/preview.png"
          src="https://3.bp.blogspot.com/-o7ZZcvQPbjc/WmlAVhTTWZI/AAAAAAAAJ80/py1YT7BLT5UaI9Uo5w6c4ElUxhLrVYqmQCLcBGAs/s1600/Logo-Menu.png"
          alt="preview"
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
      </div>

      <div
        xs={12}
        className="vertical-center"
        style={{ padding: '32px' }}
      >
        <AddCircleIcon />
        <span style={{ color: '#fff', fontSize: '20px', padding: '0 16px' }}>100%</span>
        <RemoveCircleIcon />
      </div>
    </div>
  </>
)

ImagePreview.propTypes = {
}

ImagePreview.defaultProps = {
}

export default lifecycle(method)(ImagePreview)
