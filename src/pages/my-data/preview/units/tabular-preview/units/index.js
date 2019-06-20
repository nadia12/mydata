import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import {
  Table,
} from 'volantis-ui'
import { ArrowDropdownIcon, ArrowDropupIcon } from 'volantis-icon'
import dummyData from './data-sample'
import InputColumn from './input-column'

// component
import method from './lifecycle'

const TabularPreview = ({
  tableHeaders,
  previewData: { result },
  isLoadingPreview,
}) => {
  const [selectedHeader, setSelectedHeader] = React.useState(0)
  const [isAscendingSort, setIsAscendingSort] = React.useState(true)
  const fields = !isLoadingPreview ? result : dummyData

  function onHeaderClick(indexHeader) {
    setSelectedHeader(indexHeader)
    if (selectedHeader !== indexHeader) {
      setIsAscendingSort(true)
    } else setIsAscendingSort(!isAscendingSort)
  }

  return (
    <>
      <Table hasNumber tableHeight="calc(100vh - 189px)">
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            {
              tableHeaders.map((dataheader, indexHeader) => (
                <Table.Th
                  icon={selectedHeader === indexHeader ? isAscendingSort ? ArrowDropdownIcon : ArrowDropupIcon : null}
                  onClick={() => onHeaderClick(indexHeader)}
                  colWidth="200px"
                  key={`th1-${indexHeader}`}
                  type="-"
                >
                  {dataheader}
                </Table.Th>
              ))
            }
          </Table.Tr>
          <Table.Tr>
            <Table.Th />
            {
              tableHeaders.map((dataheader, indexHeader) => (
                <Table.Th
                  colWidth="200px"
                  key={`th2-${indexHeader}`}
                >
                  <InputColumn dataheader={dataheader} />
                </Table.Th>
              ))
            }
          </Table.Tr>
        </Table.Thead>
        {!!fields.length ? (
          <Table.Tbody>
            {
              fields.map((dt, index) => (
                <Table.Tr key={`tr-${index}`}>
                  <Table.Td position="center">{index + 1}</Table.Td>
                  {
                    Object.values(dt).map((val, indexChild) => (
                      <Table.Td
                        colWidth="200px"
                        key={`td-${indexChild}`}
                        tooltipPosition="bottom"
                      >
                        {val}
                      </Table.Td>
                    ))
                  }
                </Table.Tr>
              ))
            }
          </Table.Tbody>
        ) : <Table.Tbody />}
      </Table>
    </>
  )
}

TabularPreview.propTypes = {
  tableHeaders: PropTypes.array,
  previewData: PropTypes.object,
  isLoadingPreview: PropTypes.bool,
}

TabularPreview.defaultProps = {
  tableHeaders: [],
  previewData: { result: [] },
  isLoadingPreview: true,
}

export default lifecycle(method)(TabularPreview)
