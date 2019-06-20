import React from 'react'
import PropTypes from 'prop-types'
import rem from 'polished/lib/helpers/rem'
// import rem from 'polished/lib/helpers/rem'
import styled from 'styled-components'
import {
  Button,
  Tooltip,
} from 'volantis-ui'
import {
  PlayCircleIcon,
  CloseIcon,
} from 'volantis-icon'
import ProgressBar from 'GlobalComponent/progress-bar'
// import { DivStyled } from 'GlobalComponent/divs/units'

const SnackbarStyled = styled.div`
display: flex;
flex-direction: column;
visibility: ${props => (props.isShow ? 'visible' : 'hidden')};
min-width: 280px;
height: 120px;
margin-left: -125px;
color: #fff;
text-align: center;
background-color: #313440;
border: 1px solid #1b1c21;
border-radius: 8px;
padding: 1em;
position: fixed;
z-index: 10;
left: 83%;
bottom: 10%;
font-size: 12px;
align-items: flex-start;

.status-file {
  width: 276px;
  height: 64px;
  border-radius: 4px;
  background-color: #262831;
}

.update-progress {
  display: flex;
  flex-direction: row;
  height: -50px;
  justify-content: space-around;
}

.progress-bar {
  margin: auto;
}
`
const DivStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: -10px;
  margin-bottom: 10px;
`

const SnackbarUpload = props => {
  const { files, percentage } = props

  // const isHundredPercent = (percentage > 1 && percentage < 100)
  // const data = {
  //   [false]: {
  //     button: <Button icon={props => <PlayCircleIcon {...props} width="24" />} size="compact" theme="no-border" />,
  //   },
  //   [true]: {
  //     button: <Button icon={props => <CloseIcon {...props} width="24" />} size="compact" theme="no-border" />,
  //   },
  // }

  return (
    <>
      <SnackbarStyled isShow>
        <DivStyled>
          <p className="has-text-gray has-text-14">
            {`${files.length} upload complete`}
          </p>
          <CloseIcon color="#262831" onClick={() => props.closeUpload()} isHover hoverColor="#466dc4" />
        </DivStyled>

        { !!files && files.length > 0 && files.map((file, idx) => (
          <div className="status-file" key={idx}>
            <div className="update-progress">

              <p className="name">
                {
                  <Tooltip
                    position="top"
                    showWhenOverflow
                    component={file.name || ''}
                    container={file.name || ''}
                    containerWidth="10rem"
                  />
                }
              </p>
              <p>{`${Math.floor(percentage)}%`}</p>
            </div>
            <p className="progress-bar">
              {<ProgressBar progress={percentage} max={100} />}
            </p>
          </div>
        ))
            }
      </SnackbarStyled>
    </>
  )
}

SnackbarUpload.propTypes = {
  closeUpload: PropTypes.func,
  isShow: PropTypes.bool,
  files: PropTypes.object,
  percentage: PropTypes.number,
}

SnackbarUpload.defaultProps = {
  isShow: false,
  percentage: 0,
  files: [],
  closeUpload: () => {},
}

export default SnackbarUpload
