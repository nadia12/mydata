import {
  connect
} from 'react-redux'

import StepOneFile from 'Pages/my-data/create/units/file/units/step1/units'

const mapStateToProps = state => ({
  fields: state._mydataCreate.data.step0
})

export default connect(mapStateToProps, null)(StepOneFile)
