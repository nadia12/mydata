import { connect } from 'react-redux'

import StepTwoFile from 'Pages/my-data/create/units/file/units/step2/units'

const mapStateToProps = ({ volantisMydata: { _mydataCreate } }) => ({
  authCookie: _mydataCreate.authCookie,
})

export default connect(mapStateToProps, null)(StepTwoFile)
