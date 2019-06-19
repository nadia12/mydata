import {
  connect,
} from 'react-redux'

import {
  getTableList,
} from 'Pages/my-data/create/reducer'

// import { linkToMyDataRoot } from './function'
import { createDataSourceConfig } from 'Helpers/create-connector'
import StepThreeDatabase from './units'

const mapStateToProps = ({ volantisMyData }) => {
  const optionsData = volantisMyData._mydataCreate.tableList.map(key => Object.assign({ label: key, value: key }))

  return {
    tableList: optionsData,
  }
}

const mapDispatchToProps = dispatch => ({
  getTableList: ({
    type, step0, step1, step2,
  }) => {
    const payload = createDataSourceConfig({
      type, step0, step1, step2,
    })

    return dispatch(getTableList(payload))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StepThreeDatabase)
