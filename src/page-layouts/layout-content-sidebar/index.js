import { connect } from 'react-redux'
import LayoutContentSidebar from './units'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  handleChangeBreadCrumb: ({ redirect = ''}) => {
    if (!!window.location && !!window.location.href) {
      window.location.href = redirect
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContentSidebar)
