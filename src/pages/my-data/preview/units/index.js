import React from 'react'
// import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import {
  Input, Table,
} from 'volantis-ui'
import { ArrowDropdownIcon, ArrowDropupIcon } from 'volantis-icon'
import LayoutPreview from 'PageLayouts/layout-preview'
import data from './_.data-sample'

// component
import method from './lifecycle'

const Preview = () => {
  const [selectedHeader, setSelectedHeader] = React.useState(0)
  const [isAscendingSort, setIsAscendingSort] = React.useState(true)

  function onHeaderClick(indexHeader) {
    setSelectedHeader(indexHeader)
    if (selectedHeader !== indexHeader) {
      setIsAscendingSort(true)
    } else setIsAscendingSort(!isAscendingSort)
  }

  return (
    <>
      <LayoutPreview>
        <div className="table-preview-ds">
          <Table hasNumber tableHeight="calc(100vh - 189px)">
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                {
              Object.keys(data[0]).map((dataheader, indexHeader) => (
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
              Object.keys(data[0]).map((dataheader, indexHeader) => (
                <Table.Th
                  colWidth="200px"
                  key={`th2-${indexHeader}`}
                >
                  <Input
                    name={dataheader}
                    type="text"
                    placeholder="Search"
                    value=""
                    onChange={() => null}
                  />
                </Table.Th>
              ))
            }
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {
            data.map((dt, index) => (
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
          </Table>
        </div>
      </LayoutPreview>
    </>
  )
}

Preview.propTypes = {
}

Preview.defaultProps = {
}

export default lifecycle(method)(Preview)
