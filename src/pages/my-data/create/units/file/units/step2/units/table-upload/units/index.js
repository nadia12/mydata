import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  Button,
} from 'volantis-ui'

import { PlayCircleIcon } from 'volantis-icon'
import { DivStyled } from 'GlobalComponent/divs/units'
import ProgressBar from 'GlobalComponent/progress-bar'
import {
  Cols,
} from 'GlobalComponent/cols/units'
import {
  TableWrapper,
} from 'Pages/my-data/create/units/file/units/step2/units/style'

const TableUpload = props => {
  const {
    file, percentage,
  } = props

  const finishedUpload = percentage === 100

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
                    <Button
                      icon={props => <PlayCircleIcon {...props} width="18" />}
                      size="compact"
                      theme="no-border"
                    />
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
}
TableUpload.propTypes = {
  file: PropTypes.array,
  percentage: PropTypes.number,
}

export default TableUpload
