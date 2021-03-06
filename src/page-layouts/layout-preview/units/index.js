import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Column,
  Tooltip,
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

import PlaceholderLoader from 'GlobalComponent/placeholder-loader'
import {
  MainContentStyle,
} from './style'

const PreviewLayout = props => {
  function labelComponent(props) {
    return (
      <Label>
        <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
          <PipelineIcon color="#fff" className="mr8px" />
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
    selectAction,
    isShowFooterText,
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
                  {!!title ? (
                    <>
                      {icon}

                      <Tooltip
                        position="top"
                        showWhenOverflow
                        component={title || ''}
                        container={title || ''}
                        containerWidth="45rem"
                      />
                    </>
                  ) : (
                    <>
                      <PlaceholderLoader width="24px" height="25px" className="mr8px" />
                      <PlaceholderLoader width="17vw" height="25px" />
                    </>
                  )}
                </div>
              </Column>
              {isShowAction && (
              <Column xs={3}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Select
                    name="name"
                    isSearchable
                    value={selectAction.value}
                    options={selectAction.options}
                    onChange={(_, selected) => selectAction.action(selected.value)}
                    placeholder="Select Action"
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

          <Row className={`m0 main-content-foot flex-end ${isShowFooterText ? 'p13px' : 'p22px'}`}>
            {isShowFooterText && `Showing ${totalRows} rows`}
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
  isShowFooterText: PropTypes.bool,
  infoAction: PropTypes.object,
  linkToList: PropTypes.func,
  selectAction: PropTypes.object,
}

PreviewLayout.defaultProps = {
  children: null,
  title: '',
  icon: null,
  totalRows: 0,
  isShowAction: false,
  isShowFooterText: false,
  infoAction: { show: false, action: () => {} },
  linkToList: () => {},
  selectAction: { value: '', action: () => {}, options: [] },
}

export default PreviewLayout
