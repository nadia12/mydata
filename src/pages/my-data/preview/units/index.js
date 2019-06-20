import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import {
  Input, Table,
} from 'volantis-ui'
import { ArrowDropdownIcon, ArrowDropupIcon } from 'volantis-icon'
import LayoutPreview from 'PageLayouts/layout-preview'
import dummyData from './data-sample'
import { NoDataBoxStyle } from './style'

// component
import method from './lifecycle'

const Preview = ({
  tableHeaders,
  previewData: { result },
  errorPreview,
  isLoadingPreview,
  infoData,
  setIcon,
  searchColumns,
  handleColumnChangeInput,
  handleColumnEnter,
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

      <LayoutPreview
        title={infoData.name}
        icon={!!infoData.uiEntityType && setIcon(infoData.uiEntityType)}
        totalRows={result.length}
        isShowAction={!errorPreview.response}
      >
        <div className="table-preview-ds">
          {!errorPreview.response && (
            <Table tableHeight="calc(100vh - 189px)">
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
                        <Input
                          id={dataheader}
                          name={dataheader}
                          type="text"
                          placeholder="Search..."
                          value={searchColumns.dataheader}
                          onChange={e => handleColumnChangeInput({ key: dataheader, value: e.target.value })}
                          onKeyPress={e => {
                            if (e.key === 'Enter') handleColumnEnter()
                          }}
                        />
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
          )}
          {!!errorPreview.response && (
            <NoDataBoxStyle> Oops, something went wrong...</NoDataBoxStyle>
          )}
        </div>

      </LayoutPreview>
    </>
  )
}

Preview.propTypes = {
  tableHeaders: PropTypes.array,
  previewData: PropTypes.object,
  infoData: PropTypes.object,
  isLoadingPreview: PropTypes.bool,
  setIcon: PropTypes.func,
  handleColumnChangeInput: PropTypes.func,
  handleColumnEnter: PropTypes.func,
  searchColumns: PropTypes.object,
  errorPreview: PropTypes.object,
}

Preview.defaultProps = {
  tableHeaders: [],
  previewData: { result: [] },
  infoData: { name: '' },
  setIcon: () => {},
  handleColumnChangeInput: () => {},
  handleColumnEnter: () => {},
  searchColumns: {},
  isLoadingPreview: true,
  errorPreview: {},
}

export default lifecycle(method)(Preview)
