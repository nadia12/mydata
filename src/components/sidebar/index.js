import React from 'react'
import { connect } from 'react-redux'
import Sidebar from './units'
import { 
  ExplorerIcon,
  LicenseIcon,
  MarketplaceIcon,
  MlStudioIcon,
  SystemStatusIcon,
  UserManagementIcon,
  LogoutIcon,
  AssetIcon 
} from 'volantis-icon'

const mapStateToProps = state => ({
  sidebarItems: {
    section1: {
      license: {
        alt: 'license',
        logo: (props) => (<LicenseIcon {...props} />),
        href: '/'
      },
      userManagement: {
        alt: 'User Management',
        logo: (props) => (<UserManagementIcon {...props} />),
        href: '/'
      },
      systemStatus: {
        alt: 'System Status',
        logo: (props) => (<SystemStatusIcon {...props} />),
        href: '/'
      },
      myData: {
        alt: 'My Data',
        logo: (props) => (<LicenseIcon {...props} />),
        href: '/my-data'
      },
      marketplace: {
        alt: 'marketplace',
        logo: (props) => (<MarketplaceIcon {...props} />),
        href: '/'
      },
      mlStudio: {
        alt: 'ML Studio',
        logo: (props) => (<MlStudioIcon {...props} />),
        href: '/'
      },
      apiManagement: {
        alt: 'Api Management',
        logo: (props) => (<AssetIcon {...props} />),
        href: '/'
      },
      explorer: {
        alt: 'explorer',
        logo: (props) => (<ExplorerIcon {...props} />),
        href: '/'
      },
      marketplace: {
        alt: 'logout',
        logo: (props) => (<LogoutIcon {...props} />),
        href: '/'
      }
    }
  },
  pathname: '/my-data'
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
