import React from 'react'
import { Breadcrumb, Input, Button } from 'volantis-ui'
import { SearchIcon, AddIcon } from 'volantis-icon'
import { GlobalStyles, Helper } from '../../../assets/css/main.js'
import Sidebar from '../../../components/sidebar'
import { MainContent } from './style'
import { Columns, Column } from '../../../assets/css/bulma'


const LayoutContentSidebar = props => (
  <>
    {/* ==== Styling=== */}
    <GlobalStyles />
    <Helper />
    {/* ==== Styling=== */}

    <Sidebar />

    <MainContent hasFooter={props.hasFooter}>
      <MainContent.Head>
        <MainContent.HeadBox>
          <Columns>
            <Breadcrumb>
              <Breadcrumb.List title="Breadcrumb1" onClick={() => {window.location='https://volantisiq.com'}} />
              <Breadcrumb.List title="Breadcrumb2" />
              <Breadcrumb.List title="Breadcrumb3" />
            </Breadcrumb>
          </Columns>

          <Columns className="mt48px">
            <Column className="p0">
              {
                props.isAddAble && props.handleAddNewData && (
                  <Button
                    name="Add New Data"
                    icon={AddIcon}
                    type="outlined"
                  />
                )
              }
            </Column>
            <Column className="has-flex-right is-one-quarter p0">
              {props.isSearchAble  && (
                <Input
                  className="input is-standard is-gray-light is-search-top-table"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => props.handleSearchChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' ? props.handleSearchList() : null }
                  value={props.search}
                  Icon={(props) => <SearchIcon {...props} />}
                />
              )}
            </Column>
          </Columns>
        </MainContent.HeadBox>
      </MainContent.Head>
      
      <MainContent.Body>
        {props.children}
      </MainContent.Body>

      { props.hasFooter &&
        <MainContent.Footer>
          <Columns className="m0">
            <Column className="main-content-foot vertical-center">
              {/* {props.renderFooter()} */}
            </Column>
          </Columns>
        </MainContent.Footer>
      }
      

    </MainContent>
  </>
)

LayoutContentSidebar.defaultProps = {
  children: null,
  isSearchAble: true,
  handleSearchList: null,
  handleSearchChange: null,
  search: '',
  isAddAble: true,
  hasFooter: true,
  handleAddNewData: true,
}

LayoutContentSidebar.propTypes = {
  children: PropTypes.any,
  isSearchAble: PropTypes.bool,
  handleSearchList: PropTypes.func,
  handleSearchChange: PropTypes.func,
  search: PropTypes.string,
  hasFooter: PropTypes,
  isAddAble: PropTypes.bool,
  handleAddNewData: PropTypes.func,
}

export default LayoutContentSidebar