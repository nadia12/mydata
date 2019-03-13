import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  TuneIcon,
  UsageIcon,
  UsersIcon
} from 'volantis-icon'
import { Tab } from 'volantis-ui'

import { LayoutContentSidebar } from '../../../page-layouts'
import List from './list'
import Overview from './tab-overview'
import { BulmaStyledTheme, Columns, Column } from '../../../assets/css/bulma'

const sidebarProps = {
  title: 'API Management',
  handleAddNewData: () => {},
  handleSearchChange: () => {},
  handleSearchList: () => {},
  renderTopAction: () => {},
  handleBreadcrumbChange: () => {},
  search: '',
  pathname: 'api-management',
  breadcrumbList: [],
  isSearchAble: false,
  isAddAble: true,
  addButtonTitle: 'Add New App'
}

const ApiManagement = ({ detail, getDatasetList }) => {
  useEffect(() => {
    getDatasetList()
  }, [])

  return (
    <LayoutContentSidebar {...sidebarProps}>
      <BulmaStyledTheme>
        <Columns>
          <Column className="is-2 is-offset-1">
            <List />
          </Column>
          <Column>
            {
              !!detail.name && (
              <div className="column p0 pt16px">
                <Tab defaultId={1}>
                  <Tab.Pane title="Overview" Icon={TuneIcon} id={1} size={18}>
                    <Overview />
                  </Tab.Pane>
                  <Tab.Pane title="Users" Icon={UsersIcon} id={2} size={18}>
                    Users
                  </Tab.Pane>
                  <Tab.Pane title="Usage" Icon={UsageIcon} id={3} size={18}>
                    Usage
                  </Tab.Pane>
                </Tab>
              </div>
            )
          }
          {
            !!!detail.name && (
              <div className="column vh-centering">
                <p>Select any app to view the details</p>
              </div>
            )
          }
          </Column>
        </Columns>
      </BulmaStyledTheme>
    </LayoutContentSidebar>
  )
} 

ApiManagement.defaultProps = {
  getDatasetList: () => {},
  detail: {}
}
ApiManagement.propTypes = {
  getDatasetList: PropTypes.func,
  detail: PropTypes.object
}

export default ApiManagement
