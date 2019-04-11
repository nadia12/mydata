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
// import MenuBar from 'Pages/my-data/list/units/menu-bar'
import {
  MainContentStyle,
} from 'PageLayouts/layout-content-sidebar/units/style'

const LayoutContentSidebar = props => (
  <>
    {/* ==== Styling=== */}
    <GlobalStyles />
    <Helper />
    {/* ==== Styling=== */}

    <Sidebar />

    <MainContentStyle hasFooter={props.hasFooter}>
      <MainContentStyle.Head>
        <MainContentStyle.HeadBox>
          <Columns>
            <Breadcrumb>
              {
                props.breadcrumbList.map((breadcrumb, idx) => {
                  if (!breadcrumb || !breadcrumb.title) return

                  return (
                    <Breadcrumb.List
                      key={idx}
                      title={breadcrumb.title}
                      onClick={() => props.handleChangeBreadCrumb(breadcrumb.link || '')}
                    />
                  )
                })
              }
            </Breadcrumb>
          </Columns>

          <Columns className="mt48px">
            <Column className="p0">
              {
                props.isAddAble && props.handleAddNewData && (
                  <Button
                    label="Add New Data"
                    icon={AddIcon}
                    type="outlined"
                    onClick={props.handleAddNewData}
                  />
                )
              }
            </Column>
            <Column className="display-flex has-flex-right is-one-quarter p0">
              { props.isSearchAble && (
                <Input
                  className="input is-standard is-gray-light is-search-top-table"
                  type="text"
                  placeholder="Search"
                  onChange={e => props.handleSearchChange(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') props.handleSearchList()
                  }}
                  value={props.search}
                  Icon={props => <SearchIcon {...props} />}
                />
              )}
            </Column>
          </Columns>

        </MainContentStyle.HeadBox>
      </MainContentStyle.Head>

      <MainContentStyle.Body>
        {props.children}
      </MainContentStyle.Body>

      { props.hasFooter && (
        <MainContentStyle.Footer>
          <Columns className="m0">
            <Column className="main-content-foot vertical-center">
              {/* {props.renderFooter()} */}
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
  isSearchAble: true,
  handleSearchList: null,
  handleSearchChange: null,
  handleMouseLeave: null,
  handleAddNewData: null,
  handleChangeBreadCrumb: null,
  search: '',
  isAddAble: true,
  hasFooter: true,
  breadcrumbList: [],
}

LayoutContentSidebar.propTypes = {
  children: PropTypes.any,
  isSearchAble: PropTypes.bool,
  handleSearchList: PropTypes.func,
  handleSearchChange: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  handleAddNewData: PropTypes.func,
  search: PropTypes.string,
  handleChangeBreadCrumb: PropTypes.string,
  hasFooter: PropTypes,
  isAddAble: PropTypes.bool,
  breadcrumbList: PropTypes.array,
}

export default LayoutContentSidebar
