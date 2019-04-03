import React from 'react'
import { Breadcrumb, Input, Button } from 'volantis-ui'
import { SearchIcon, AddIcon } from 'volantis-icon'
import { GlobalStyles, Helper } from 'Asset/css/main.js'
import Sidebar from '../../../components/sidebar'
import { MainContentStyle } from './style'
import { Columns, Column } from 'Asset/css/bulma'


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
                props.breadcrumbList.map(breadcrumb => {
                  return <Breadcrumb.List title={breadcrumb.title} onClick={() => {window.location=`${breadcrumb.link}`}} />
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
                    name="Add New Data"
                    icon={AddIcon}
                    type="outlined"
                    onClick={props.handleAddNewData}
                  />
                )
              }
            </Column>
            <Column className="has-flex-right is-one-quarter p0">
              { props.isSearchAble  && 
                <Input
                  className="input is-standard is-gray-light is-search-top-table"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => props.handleSearchChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' ? props.handleSearchList() : null }
                  value={props.search}
                  Icon={(props) => <SearchIcon {...props} />}
                />
              }
            </Column>
          </Columns>

        </MainContentStyle.HeadBox>
      </MainContentStyle.Head>
      
      <MainContentStyle.Body>
        {props.children}
      </MainContentStyle.Body>

      { props.hasFooter &&
        <MainContentStyle.Footer>
          <Columns className="m0">
            <Column className="main-content-foot vertical-center">
              {/* {props.renderFooter()} */}
            </Column>
          </Columns>
        </MainContentStyle.Footer>
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
  hasFooter: PropTypes,
  isAddAble: PropTypes.bool,
  breadcrumbList: PropTypes.array,
}

export default LayoutContentSidebar