import { connect } from 'react-redux'

import StepTwoFile from 'Pages/my-data/create/units/file/units/step2/units'

const mapStateToProps = ({ volantisConstant }) => ({
  authCookie: volantisConstant.cookie.auth,
})

export default connect(mapStateToProps, null)(StepTwoFile)
