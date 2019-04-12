import React from 'react'
import PropTypes from 'prop-types'
import {
  Breadcrumb,
  Input,
  Button,
} from 'volantis-ui'
import {
  SearchIcon,
  AddIcon,
} from 'volantis-icon'
import {
  Columns,
  Column,
} from 'Asset/css/bulma'
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
  handleChangeBreadCrumb,
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
          <Columns>
            <Breadcrumb>
              {
                breadcrumbList.map((breadcrumb, idx) => {
                  if (!breadcrumb || !breadcrumb.title) return

                  return (
                    <Breadcrumb.List
                      key={idx}
                      title={breadcrumb.title}
                      onClick={() => handleChangeBreadCrumb(breadcrumb.link || '')}
                    />
                  )
                })
              }
            </Breadcrumb>
          </Columns>

          <Columns className="mt48px">
            <Column className="p0">
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
            <Column className="display-flex has-flex-right is-one-quarter p0">
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
          </Columns>

        </MainContentStyle.HeadBox>
      </MainContentStyle.Head>

      <MainContentStyle.Body>
        {children}
      </MainContentStyle.Body>

      { hasFooter && (
        <MainContentStyle.Footer>
          <Columns className="m0">
            <Column className="main-content-foot vertical-center">
              {footerText}
            </Column>
          </Columns>
        </MainContentStyle.Footer>
      )
      }

    </MainContentStyle>
  </>
)

LayoutContentSidebar.defaultProps = {
  children: null,
  hasFooter: true,
  handleChangeBreadCrumb: () => {},
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
  handleChangeBreadCrumb: PropTypes.string,
  hasFooter: PropTypes,
  searchAction: PropTypes.object,
  addAction: PropTypes.object,
  breadcrumbList: PropTypes.array,
  footerText: PropTypes.string,
}

export default LayoutContentSidebar
