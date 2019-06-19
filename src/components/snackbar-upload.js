import React from 'react'
import PropTypes from 'prop-types'
// import rem from 'polished/lib/helpers/rem'
import styled from 'styled-components'
import {
  Table,
  Button,
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
height: 200px;
margin-left: -125px;
color: #fff;
text-align: center;
background-color: #313440;
border: 1px solid #1b1c21;
border-radius: 8px;
padding: 1em;
position: fixed;
z-index: 10;
left: 50%;
bottom: 2em;
font-size: 12px;
.status-file {
  display: flex;
  flex-direction: row;
  width: 264px;
  height: 64px;
  border-radius: 4px;
}
`

const SnackbarUpload = props => {
  const { files, percentage } = props

  console.log('SnackbarUpload ===> ', props)

  const isHundredPercent = (percentage > 1 && percentage < 100)
  const data = {
    [false]: {
      button: <Button icon={props => <PlayCircleIcon {...props} width="24" />} size="compact" theme="no-border" />,
    },
    [true]: {
      button: <Button icon={props => <CloseIcon {...props} width="24" />} size="compact" theme="no-border" />,
    },
  }

  return (
    <>
      {/* <SnackbarStyled isShow>
        <Table>
          <thead>
            <tr>
              <td>
                {`${files.length} uploads complete`}
              </td>
              <td>
                <CloseIcon {...props} width="24" />
              </td>
            </tr>
          </thead>
          <tbody>
            { !!files && files.length > 0 && files.map((file, idx) => (
              <tr key={idx}>
                <td>{file.type || ''}</td>
                <td>{file.name || ''}</td>
                <td>
                  {<ProgressBar progress={percentage} max={100} />}
                  {data[isHundredPercent].button}
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </SnackbarStyled> */}
      <SnackbarStyled isShow>
        <p className="status-upload">{`${files.length} uploads complete`}</p>
        { !!files && files.length > 0 && files.map((file, idx) => (
          <div className="status-file" key={idx}>
            <p className="name">{file.name || ''}</p>
            <p className="progress-bar">
              {<ProgressBar progress={percentage} max={100} />}
              {data[isHundredPercent].button}
            </p>
          </div>
        ))
            }
      </SnackbarStyled>
    </>
  )
}

SnackbarUpload.propTypes = {
  isShow: PropTypes.bool,
  files: PropTypes.object,
  percentage: PropTypes.number,
}

SnackbarUpload.defaultProps = {
  isShow: false,
  percentage: 0,
  files: [],
}

export default SnackbarUpload
