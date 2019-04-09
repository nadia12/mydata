import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import {
  ModalConfirmation
} from 'volantis-ui'
import {
  WarningIcon
} from 'volantis-icon'

import CreateLayout from 'PageLayouts/layout-create/units'
import StepOneSql from 'Pages/my-data/create/units/database/units/step1/units'
import StepTwoSql from 'Pages/my-data/create/units/database/units/step2/units'
import StepThreeSql from 'Pages/my-data/create/units/database/units/step3/units'

import {
  // TITLE,
  CREATE_TYPE
} from 'Pages/my-data/create/constant'
import method from './lifecycle'

const Create = ({
  type,
  // services,
  data,
  title,
  // name,
  layout,
  // apiUrl,
  rules,
  // step,
  // token,
  maxStep,
  // show,
  // files,
  hideStep,
  handleAddDatasource,
  handleNextStep,
  handleBackStep,
  // headers,
  // getSensorProperties,
  // renderContent,
  handleChangeInput,
  fields,
  showModalConfirmation,
  handleToggleModalError,
  modalData
}) => {
  const contentProps = {
    handleChangeInput,
    step: layout.step || 0,
    fields,
    data,
    rules
  }

  return (
    <>
      <CreateLayout
        title={title}
        type={type}
        hideStep={hideStep}
        maxStep={maxStep}
        {...layout}
        handleAdd={handleAddDatasource}
        handleNextStep={handleNextStep}
        handleBackStep={() => handleBackStep({ step: layout.step })}
      >
        {
          showModalConfirmation && (
            <ModalConfirmation
              isShow
              {...modalData}
              Icon={() => <WarningIcon width="64" height="64" color="#ffd77b" />}
              onClickSecondary={handleToggleModalError}
              onClickPrimary={handleAddDatasource}
              // onClickPrimary={type === CREATE_TYPE.device ? this.handleCreateSensor : this.handleAddDatasource}
              reverseBtn
              noBorderSecondaryBtn
            />
          )
        }
        <div className="column content-body">
          { type === CREATE_TYPE.sql && layout.step === 0 && (<StepOneSql {...contentProps} />) }
          { type === CREATE_TYPE.sql && layout.step === 1 && (<StepTwoSql {...contentProps} />) }
          { type === CREATE_TYPE.sql && layout.step === 2 && (<StepThreeSql {...contentProps} />) }
          {/* {this.state.show.errorModal && this.props.createConnector.errorMsg !== '' && this.renderModalError() } */}
          {/* { type !== '' && renderContent(type, layout.step) } */}
        </div>
      </CreateLayout>
    </>
  )
}

Create.propTypes = {
  showModalConfirmation: PropTypes.bool,
  loadingProps: PropTypes.object,
  modalData: PropTypes.object,
  type: PropTypes.string,
  handleAddDatasource: PropTypes.func,
  handleBackStep: PropTypes.func,
  handleToggleModalError: PropTypes.func,
  handleNextStep: PropTypes.func,
  getSampleDataSql: PropTypes.func,
  getSampleTable: PropTypes.func,
  getSensorProperties: PropTypes.func,
  createSensor: PropTypes.func,
  resetConnector: PropTypes.func,
  getFilePath: PropTypes.func,
  handleChangeInput: PropTypes.func,
  addDataSource: PropTypes.func,
  addDataSourceItem: PropTypes.func,
  createConnector: PropTypes.object,
  services: PropTypes.object,
  layout: PropTypes.object,
  data: PropTypes.object,
  apiUrl: PropTypes.string,
  rules: PropTypes.array,
  title: PropTypes.string,
  token: PropTypes.string,
  maxStep: PropTypes.number,
  show: PropTypes.object,
  files: PropTypes.object,
  hideStep: PropTypes.string,
  name: PropTypes.string,
  headers: PropTypes.object,
  fields: PropTypes.object
}

Create.defaultProps = {
  loadingProps: {
    showLoading: false,
    textLoading: ''
  },
  handleToggleModalError: () => {},
  handleBackStep: () => {},
  handleAddDatasource: () => {},
  handleChangeInput: () => {},
  handleNextStep: () => {},
  getSampleDataSql: () => {},
  getSampleTable: () => {},
  getSensorProperties: () => {},
  createSensor: () => {},
  resetConnector: () => {},
  getFilePath: () => {},
  addDataSource: () => {},
  addDataSourceItem: () => {},
  createConnector: () => {},
  services: {},
  modalData: {},
  fields: {},
  showModalConfirmation: false,
  type: '',
  layout: {},
  data: {},
  apiUrl: '',
  rules: [],
  title: '',
  token: '',
  maxStep: 0,
  show: {},
  files: {},
  hideStep: '',
  name: '',
  headers: {}
}

export default lifecycle(method)(Create)
