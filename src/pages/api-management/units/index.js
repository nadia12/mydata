/*
  location: api-management > units > index.js
*/
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  TuneIcon,
  UsageIcon,
  UsersIcon
} from 'volantis-icon'
import { Tab, ModalConfirmation } from 'volantis-ui'
import { WarningIcon } from 'volantis-icon'
import lifecycle from 'react-pure-lifecycle'

import { LayoutContentSidebar } from '../../../page-layouts'
import List from './list'
import Overview from './tab-overview'
import { CONFIRMATION_CONTENT } from '../constant'
import method from './lifecycle'

import { BulmaStyledTheme, Columns, Column } from '../../../assets/css/bulma'

const sidebarProps = {
  // title: 'API Management',
  handleAddNewData: () => {},
  handleSearchChange: () => {},
  handleSearchList: () => {},
  renderTopAction: () => {},
  handleBreadcrumbChange: null,
  search: '',
  pathname: '/api-management',
  isSearchAble: false,
  isAddAble: true,
  addButtonTitle: 'Add New App',
  show: true,
  breadcrumbList: [{ title: 'API Management', link: '/api-management' }]
}

const ApiManagement = ({
  authCookie, fields, showModal,
  handleToggleModal
}) => {
  const currModal = Object.entries(showModal).find(([key, value]) => value)

  return (
    <LayoutContentSidebar {...sidebarProps}>
      <BulmaStyledTheme>
        <Columns>
          <Column className="is-2 is-offset-1">
            <List />
          </Column>
          {
            !!currModal && currModal !== '' && (
              <ModalConfirmation 
                isShow={true}
                {...CONFIRMATION_CONTENT[currModal]}
                onClose={() => setIsShow(false)} 
                Icon={() => <WarningIcon width="64" height="64" color="#ffd77b" />}
                // onClickPrimary={handleClickPrimary}
                onClickSecondary={handleToggleModal({ key: currModal })}
                reverseBtn
                noBorderSecondaryBtn
              />
            )
          }
          <Column>
            {
              !!fields.id && (
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
            !!!fields.id && (
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
  fields: {},
  showModal: {},
  handleToggleModal: () => {}
}
ApiManagement.propTypes = {
  fields: PropTypes.object,
  showModal: PropTypes.object,
  handleToggleModal: PropTypes.func
}

export default lifecycle(method)(ApiManagement)
