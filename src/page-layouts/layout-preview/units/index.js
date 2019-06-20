import React from 'react'
import PropTypes from 'prop-types'
import {
  // Input,
  Row,
  Column,
  Title,
  Select,
  Label,
} from 'volantis-ui'
import {
  // SearchIcon,
  ArrowBackwardIcon,
  PipelineIcon,
  ShowHidePannelIcon,
} from 'volantis-icon'
import {
  GlobalStyles,
  Helper,
} from 'Asset/css/main'
import COLORS from 'Asset/css/mydata-colors'

import {
  MainContentStyle,
} from './style'

const PreviewLayout = props => {
  function labelComponent(props) {
    return (
      <Label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <PipelineIcon />
          {props.children}
        </div>
      </Label>
    )
  }

  const {
    children, title, icon,
    totalRows, isShowAction,
  } = props

  return (
    <>
      {/* ==== Styling=== */}
      <GlobalStyles />
      <Helper />
      {/* ==== Styling=== */}

      <MainContentStyle>
        <MainContentStyle.Head>
          <MainContentStyle.HeadBox>
            <Row>
              <Column xs={9}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowBackwardIcon color={COLORS.gold} className="arrow-back pr16px" />
                  {icon}
                  <Title size="big">{ title }</Title>
                </div>
              </Column>
              {isShowAction && (
              <Column xs={3}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Select
                    name="name"
                    isSearchable
                    value="Open With Pipeline"
                    options={[{ label: 'Open With Pipeline', value: 'Open With Pipeline' }]}
                    onChange={() => {}}
                    placeholder="select your name..."
                    labelComponent={labelComponent}
                  />
                  <button type="button" className="ml8px">
                    <ShowHidePannelIcon />
                  </button>
                </div>
              </Column>
              /* <Column xs={4}>
                  <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Input
                        className="input is-standard is-gray-light is-search-top-table"
                        name="search"
                        theme="default"
                        placeholder="Search"
                        onChange={() => {}}
                        onKeyPress={() => {}}
                        value=""
                        icon={props => <SearchIcon {...props} />}
                      />
                      <FileXlsIcon className="pl5px" />
                    </div>
                  </>
                </Column> */
              )}
            </Row>
          </MainContentStyle.HeadBox>
        </MainContentStyle.Head>

        <MainContentStyle.Body>
          {children}
        </MainContentStyle.Body>

        <MainContentStyle.Footer>
          <Row className="m0 main-content-foot flex-end">
            {`Total ${totalRows} rows`}
          </Row>
        </MainContentStyle.Footer>

      </MainContentStyle>
    </>
  )
}

PreviewLayout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  icon: PropTypes.any,
  totalRows: PropTypes.number,
  isShowAction: PropTypes.bool,
}

PreviewLayout.defaultProps = {
  children: null,
  title: 'waiting...',
  icon: null,
  totalRows: 0,
  isShowAction: true,
}

export default PreviewLayout
