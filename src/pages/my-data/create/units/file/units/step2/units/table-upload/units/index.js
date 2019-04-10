import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
} from 'volantis-ui'

// masih belum ada componentnya
import ProgressBar from 'GlobalComponent/progress-indicator'
import {
  Cols,
} from 'Pages/my-data/create/units/style'
import {
  TableWrapper,
} from 'Pages/my-data/create/units/file/units/step2/units/style'

const TableUpload = props => {
  const {
    file, percentage,
  } = props

  const status = percentage === 100 ? 'Success Upload' : (<ProgressBar progress={percentage} max={100} />)

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
                <td key="td-status">{status}</td>
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
