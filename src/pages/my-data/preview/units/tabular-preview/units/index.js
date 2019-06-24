import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import {
  Table,
} from 'volantis-ui'
import PlaceholderLoader from 'GlobalComponent/placeholder-loader/units'
import dummyData from './data-sample'
import InputColumn from './input-column'

// component
import method from './lifecycle'

const TabularPreview = ({
  previewData: { result },
  isLoadingPreview,
  tableHeaders,
}) => {
  const fields = !isLoadingPreview ? result : dummyData(tableHeaders.length)

  return (
    <>
      <Table hasNumber tableHeight="calc(100vh - 189px)">
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            {
            tableHeaders.map((dataheader, indexHeader) => (
              <Table.Th
                colWidth="200px"
                key={`th1-${indexHeader}`}
                type="-"
              >
                {
                  dataheader !== 'loading' ? dataheader : <PlaceholderLoader width="12.2vw" />
                }
              </Table.Th>
            ))
          }
          </Table.Tr>
          {(tableHeaders[0] !== 'loading') ? (
            <Table.Tr>
              <Table.Th />
              {
              tableHeaders.map((dataheader, indexHeader) => (
                <Table.Th
                  colWidth="200px"
                  key={`th2-${indexHeader}`}
                >
                  {
                    dataheader !== 'loading' ? <InputColumn dataheader={dataheader} /> : <PlaceholderLoader width="12.2vw" />
                  }
                </Table.Th>
              ))
            }
            </Table.Tr>
          ) : <Table.Tr />}
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
                        {
                          !isLoadingPreview ? val : <PlaceholderLoader width="12.2vw" />
                        }
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
  previewData: PropTypes.object,
  isLoadingPreview: PropTypes.bool,
  tableHeaders: PropTypes.array,
}

TabularPreview.defaultProps = {
  previewData: { result: [] },
  isLoadingPreview: true,
  tableHeaders: [],
}

export default lifecycle(method)(TabularPreview)
