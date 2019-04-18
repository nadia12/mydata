import React from 'react'
import PropTypes from 'prop-types'
import {
  Breadcrumb,
  Input,
  Button,
  Row,
  Column,
} from 'volantis-ui'
import {
  SearchIcon,
  AddIcon,
} from 'volantis-icon'
import {
  GlobalStyles,
  Helper,
} from 'Asset/css/main'
import Sidebar from 'GlobalComponent/sidebar'
import {
  MainContentStyle,
} from 'PageLayouts/layout-content-sidebar/units/style'

const LayoutContentSidebar = ({
  children,
  hasFooter,
  searchAction,
  addAction,
  trashAction,
  breadcrumbList,
  footerText,
}) => (
  <>
    {/* ==== Styling=== */}
    <GlobalStyles />
    <Helper />
    {/* ==== Styling=== */}
    <Sidebar />

    <MainContentStyle hasFooter={hasFooter}>
      <MainContentStyle.Head>
        <MainContentStyle.HeadBox>
          <Breadcrumb>
            <>
              {
                breadcrumbList.map(breadcrumb => (
                  <Breadcrumb.List
                    key={breadcrumb.title}
                    title={breadcrumb.title}
                    onClick={breadcrumb.onClick}
                  />
                ))
              }
            </>
          </Breadcrumb>

          <Row className="mt48px">
            <Column xs={9}>
              {
                addAction.isActive && (
                  <Button
                    label="Add New Data"
                    icon={AddIcon}
                    theme="outlined"
                    onClick={addAction.action}
                  />
                )
              }
            </Column>
            <Column xs={3}>
              { searchAction.isActive && (
                <Input
                  className="input is-standard is-gray-light is-search-top-table"
                  name="search"
                  theme="text"
                  placeholder="Search"
                  onChange={e => searchAction.onChange(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') searchAction.onEnter()
                  }}
                  value={searchAction.value}
                  Icon={props => <SearchIcon {...props} />}
                />
              )}
            </Column>
          </Row>
        </MainContentStyle.HeadBox>
      </MainContentStyle.Head>

      <MainContentStyle.Body>
        {children}
      </MainContentStyle.Body>

      { hasFooter && (
        <MainContentStyle.Footer>
          <Row className="m0 main-content-foot">
            {
              trashAction.isActive && (
                <Button
                  className="trash-bin"
                  label={trashAction.title}
                  theme="no-border"
                  onClick={trashAction.action}
                  icon={() => trashAction.icon}
                />
              )
            }
            <Column className="vertical-center"><>{footerText}</></Column>
          </Row>
        </MainContentStyle.Footer>
      )
      }
    </MainContentStyle>
  </>
)

LayoutContentSidebar.defaultProps = {
  children: null,
  hasFooter: true,
  breadcrumbList: [],
  footerText: '',
  searchAction: {
    isActive: false,
    onChange: () => {},
    onEnter: () => {},
    value: '',
  },
  addAction: {
    isActive: true,
    action: () => {},
    title: 'Add New Data',
  },
  trashAction: {
    isActive: true,
    action: () => {},
    title: 'Trash Bin',
  },
}

LayoutContentSidebar.propTypes = {
  children: PropTypes.any,
  hasFooter: PropTypes.bool,
  searchAction: PropTypes.object,
  addAction: PropTypes.object,
  trashAction: PropTypes.object,
  breadcrumbList: PropTypes.array,
  footerText: PropTypes.string,
}

export default LayoutContentSidebar
