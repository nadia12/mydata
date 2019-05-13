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
import { DivStyled } from 'GlobalComponent/divs/units'

const SnackbarStyled = styled.div`
visibility: ${props => (props.isShow ? 'visible' : 'hidden')};
min-width: 250px;
margin-left: -125px;
background-color: yellow;
color: #fff;
text-align: center;
border-radius: 2px;
padding: 16px;
position: fixed;
z-index: 10;
left: 50%;
bottom: 30px;
`

const SnackbarUpload = props => {
  const { files, percentage } = props

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
      <SnackbarStyled isShow>
        <Table>
          <thead>
            <tr>
              <td>
                {`${files.length} uploads complete`}
              </td>
            </tr>
          </thead>
          <tbody>
            { !!files && files.length > 0 && Array.from(files).map((file, idx) => (
              <tr key={idx}>
                <td>{file.type || ''}</td>
                <td>{file.name || ''}</td>
                <td>
                  <DivStyled>
                    {<ProgressBar progress={percentage} max={100} />}
                    {data[isHundredPercent].button}
                  </DivStyled>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
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
