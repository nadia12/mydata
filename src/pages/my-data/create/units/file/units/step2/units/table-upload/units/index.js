import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  Button,
  Column,
} from 'volantis-ui'

import {
  PlayCircleIcon,
  PauseCircleIcon,
} from 'volantis-icon'
import ProgressBar from 'GlobalComponent/progress-bar'
import {
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
    default: {
      button: <Button icon={props => <PlayCircleIcon {...props} width="24" />} size="compact" theme="no-border" onClick={() => handleOnUpload()} disabled={!allowNext} />,
    },
  }

  return (
    <>
      <Column className="pb175em width96">
        <Table>
          <Table.Tbody>
            <Table.Tr key="thead-1" className="has-text-gold font-12">
              <Table.Td position="center">Filename</Table.Td>
              <Table.Td position="center">Type</Table.Td>
              <Table.Td />
            </Table.Tr>
            <Table.Tr key="tbody-2" className="font-12">
              <Table.Td position="center">{file.name || ''}</Table.Td>
              <Table.Td position="center">{file.type || ''}</Table.Td>
              <Table.Td position="center">
                <DivStyled>
                  { (finishedUpload ? 'Success Upload' : <ProgressBar progress={percentage} max={100} />) || '' }
                  {data[isHundredPercent].button || data.default.button}
                </DivStyled>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Column>
    </>
  )
}

TableUpload.defaultProps = {
  percentage: 0,
  file: {},
  online: true,
  handleOnUpload: () => {},
  allowNext: false,
}
TableUpload.propTypes = {
  file: PropTypes.object,
  percentage: PropTypes.number,
  online: PropTypes.bool,
  handleOnUpload: PropTypes.func,
  allowNext: PropTypes.bool,
}

export default TableUpload
