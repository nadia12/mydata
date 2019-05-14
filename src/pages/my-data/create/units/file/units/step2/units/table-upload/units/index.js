import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  Button,
} from 'volantis-ui'

import {
  PlayCircleIcon,
  PauseCircleIcon,
} from 'volantis-icon'
import ProgressBar from 'GlobalComponent/progress-bar'
import {
  Cols,
} from 'GlobalComponent/cols/units'
import {
  TableWrapper,
  DivStyled,
} from 'Pages/my-data/create/units/file/units/step2/units/style'

const TableUpload = props => {
  const {
    file, percentage, online, handleOnUpload, allowNext,
  } = props

  const finishedUpload = percentage === 100
  const isHundredPercent = (percentage > 1 && percentage < 100) && online

  const data = {
    [false]: {
      button: <Button icon={props => <PlayCircleIcon {...props} width="24" />} size="compact" theme="no-border" onClick={() => handleOnUpload()} disabled={!allowNext} />,
    },
    [true]: {
      button: <Button icon={props => <PauseCircleIcon {...props} width="24" />} size="compact" theme="no-border" />,
    },
  }

  return (
    <>
      <Cols padding={24}>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <td>Filename</td>
                <td>Type</td>
                <td />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td key="td-filename">{file.name || ''}</td>
                <td key="td-filetype">{file.type || ''}</td>
                <td key="td-status">
                  <DivStyled>
                    { finishedUpload ? 'Success Upload' : <ProgressBar progress={percentage} max={100} /> }
                    {data[isHundredPercent].button}
                  </DivStyled>
                </td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </Cols>
    </>
  )
}

TableUpload.defaultProps = {
  percentage: 0,
  file: [],
  online: true,
  handleOnUpload: () => {},
  allowNext: false,
}
TableUpload.propTypes = {
  file: PropTypes.array,
  percentage: PropTypes.number,
  online: PropTypes.bool,
  handleOnUpload: PropTypes.func,
  allowNext: PropTypes.func,
}

export default TableUpload
