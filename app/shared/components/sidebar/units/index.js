import React from 'react'
import PropTypes from 'prop-types'

import {
  Sidebar, ModalConfirmation,
} from 'volantis-ui'
import {
  VolantisIcon,
  UsersIcon,
  MyDataIcon,
  DashboardIcon,
  ModelIcon,
  DatabaseIcon,
  ExitIcon,
} from 'volantis-icon'

import {
  routes,
} from '../../../config/constants'

const LeftSidebar = props => {
  const [modalLogout, setModalLogout] = React.useState(false)
  const { mlStudioUrl, handleChangeLocation, location: { pathname } } = props

  return (
    <Sidebar>
      <Sidebar.Div>
        <Sidebar.Logo icon={() => <VolantisIcon color="#ffd77b" width="48px" height="48px" />} />
        <Sidebar.Item
          icon={UsersIcon}
          onClick={() => handleChangeLocation('userManagement')}
          selected={pathname === routes.userManagement.root}
        />
        <Sidebar.Item
          icon={MyDataIcon}
          onClick={() => handleChangeLocation('myData')}
          selected={pathname === routes.myData.root}
        />
        <Sidebar.Item
          icon={DashboardIcon}
          onClick={() => handleChangeLocation('xplorer')}
          selected={pathname === routes.xplorer.root}
        />
        <Sidebar.Item
          icon={ModelIcon}
          onClick={() => { window.location.href = mlStudioUrl }}
          selected={pathname === mlStudioUrl}
        />
        <Sidebar.Item
          icon={DatabaseIcon}
          onClick={() => handleChangeLocation('apiManagement')}
          selected={pathname === routes.apiManagement.root}
        />
      </Sidebar.Div>
      <Sidebar.Div>
        <Sidebar.Item icon={ExitIcon} onClick={() => setModalLogout(true)} />
      </Sidebar.Div>
      <ModalConfirmation
        isShow={modalLogout}
        onClose={() => setModalLogout(false)}
        icon={() => <ExitIcon width="64" height="64" color="#ffd77b" />}
        title="Are you sure you want to logout now?"
        subtitle="You will need to log in to access Volantis IQ"
        primaryButton="Logout"
        secondaryButton="Cancel"
        onClickPrimary={props.logout}
        onClickSecondary={() => setModalLogout(false)}
        reverseBtn
        noBorderSecondaryBtn
      />
    </Sidebar>
  )
}

LeftSidebar.propTypes = {
  location: PropTypes.object.isRequired,
  mlStudioUrl: PropTypes.string.isRequired,
  handleChangeLocation: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default LeftSidebar
