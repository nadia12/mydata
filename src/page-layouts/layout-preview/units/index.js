import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  Row,
  Column,
  Title,
  Select,
  Label,
} from 'volantis-ui'
import {
  SearchIcon,
  ArrowDroprightIcon,
  FileXlsIcon,
  PipelineIcon,
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
              <Column xs={6}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowDroprightIcon color={COLORS.gold} className="pr16px" />
                  <FileXlsIcon color={COLORS.gold} className="pr5px" />
                  <Title size="big">H5 / Primary</Title>
                </div>
              </Column>
              <Column xs={2} className="pr0">
                <>
                  <Select
                    name="name"
                    isSearchable
                    value="Open With Pipeline"
                    options={[{ label: 'Open With Pipeline', value: 'Open With Pipeline' }]}
                    onChange={() => {}}
                    placeholder="select your name..."
                    labelComponent={labelComponent}
                  />
                </>
              </Column>
              <Column xs={4}>
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
              </Column>
            </Row>
          </MainContentStyle.HeadBox>
        </MainContentStyle.Head>

        <MainContentStyle.Body>
          {props.children}
        </MainContentStyle.Body>

        <MainContentStyle.Footer>
          <Row className="m0 main-content-foot flex-end">
            Total 400 rows
          </Row>
        </MainContentStyle.Footer>

      </MainContentStyle>
    </>
  )
}

PreviewLayout.propTypes = {
  children: PropTypes.any,
}

PreviewLayout.defaultProps = {
  children: null,
}

export default PreviewLayout
