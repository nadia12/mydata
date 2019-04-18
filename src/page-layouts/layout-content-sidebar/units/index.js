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
  DeleteIcon,
} from 'volantis-icon'
import COLORS from 'Asset/css/colors'
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
            {
              breadcrumbList.map(breadcrumb => (
                <Breadcrumb.List
                  key={breadcrumb.title}
                  title={breadcrumb.title}
                  onClick={breadcrumb.onClick}
                />
              ))
            }
          </Breadcrumb>

          <Row className="mt48px">
            <Column xs={9}>
              {
                addAction.isActive && (
                  <Button
                    label="Add New Data"
                    icon={AddIcon}
                    type="outlined"
                    onClick={addAction.action}
                  />
                )
              }
            </Column>
            <Column xs={3}>
              { searchAction.isActive && (
                <Input
                  className="input is-standard is-gray-light is-search-top-table"
                  type="text"
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
            <Column xs={2} className="trash-bin">
              <DeleteIcon color={COLORS.gold} />
              <span>Trash Bin</span>
            </Column>
            <Column xs={10} className="vertical-center">{footerText}</Column>
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
}

LayoutContentSidebar.propTypes = {
  children: PropTypes.any,
  hasFooter: PropTypes,
  searchAction: PropTypes.object,
  addAction: PropTypes.object,
  breadcrumbList: PropTypes.array,
  footerText: PropTypes.string,
}

export default LayoutContentSidebar
