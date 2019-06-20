import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Column,
  Title,
  Select,
  Label,
} from 'volantis-ui'
import {
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
    infoAction,
    linkToList,
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
                  <ArrowBackwardIcon color={COLORS.gold} className="arrow-back pr16px" onClick={() => linkToList()} />
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
                  <button type="button" className="ml8px" onClick={() => infoAction.action()}>
                    <ShowHidePannelIcon color={!!infoAction.show ? COLORS.gold : COLORS.grey} />
                  </button>
                </div>
              </Column>
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
  infoAction: PropTypes.object,
  linkToList: PropTypes.func,
}

PreviewLayout.defaultProps = {
  children: null,
  title: 'waiting...',
  icon: null,
  totalRows: 0,
  isShowAction: true,
  infoAction: { show: false, action: () => {} },
  linkToList: () => {},
}

export default PreviewLayout
