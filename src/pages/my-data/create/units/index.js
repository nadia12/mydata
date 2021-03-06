import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import {
  ModalConfirmation,
} from 'volantis-ui'
import {
  WarningIcon,
} from 'volantis-icon'
import Alert from 'GlobalComponent/alert'
import CreateLayout from 'PageLayouts/layout-create/units'
import StepOneSql from 'Pages/my-data/create/units/database/units/step1/units'
import StepTwoSql from 'Pages/my-data/create/units/database/units/step2/units'
import StepThreeSql from 'Pages/my-data/create/units/database/units/step3'
import StepFourSql from 'Pages/my-data/create/units/database/units/step4/units'
// import StepOneFile from 'Pages/my-data/create/units/file/units/step1/units'
import StepTwoFile from 'Pages/my-data/create/units/file/units/step2'
import {
  CREATE_TYPE,
} from 'Config/constants'
import method from './lifecycle'

const Create = ({
  type,
  data,
  title,
  layout,
  rules,
  maxStep,
  hideStep,
  handleAddDatasource,
  handleNextStep,
  handleBackStep,
  uploadUrl,
  handleChangeInput,
  fields,
  showModalConfirmation,
  handleToggleModalError,
  modalData,
  files,
  filePath,
  authCookie,
  fileSize,
  filesData,
  handleChangeFileInput,
  handleBackStepTypeFileLocal,
  errorToast,
  errorMessage,
  handleCloseToast,
  handleOnUpload,
  getTableList,
}) => {
  const contentProps = {
    handleChangeInput,
    handleNextStep,
    step: layout.step || 0,
    fields,
    data,
    rules,
    getTableList,
  }

  const defaultUploadProps = {
    files,
    filePath,
    fileSize,
    filesData,
    uploadUrl,
    authCookie,
    handleChangeFileInput,
    isBack: layout.isBack,
    allowNext: layout.allowNext,
  }

  const uploadLocalProps = {
    ...defaultUploadProps,
    handleOnUpload,
  }

  const failedUpload = modalData.type === 'failedUploadData'

  const modalProps = {
    onClickPrimary: failedUpload ? handleToggleModalError : handleAddDatasource,
    onClickSecondary: handleToggleModalError,
  }

  return (
    <>
      {
        errorToast && (
          <Alert
            isShow
            type="error"
            onClose={handleCloseToast}
          >
            {errorMessage}
          </Alert>
        )
      }
      <CreateLayout
        title={title}
        type={type}
        hideStep={hideStep}
        maxStep={maxStep}
        {...layout}
        handleAdd={handleAddDatasource}
        handleNextStep={handleNextStep}
        handleBackStep={type === CREATE_TYPE.fileLocal ? handleBackStepTypeFileLocal : handleBackStep}
      >
        {
          showModalConfirmation && (
            <ModalConfirmation
              isShow
              {...modalData}
              icon={() => <WarningIcon width="64" height="64" color="#ffd77b" />}
              {...modalProps}
              reverseBtn
              noBorderSecondaryBtn
            />
          )
        }
        <div className="column content-body">
          { type === CREATE_TYPE.sql && layout.step === 0 && (<StepOneSql {...contentProps} />) }
          { type === CREATE_TYPE.sql && layout.step === 1 && (<StepTwoSql {...contentProps} />) }
          { type === CREATE_TYPE.sql && layout.step === 2 && (<StepThreeSql {...contentProps} />)}
          { type === CREATE_TYPE.sql && layout.step === 3 && (<StepFourSql {...contentProps} />) }
          { type === CREATE_TYPE.fileUrl && layout.step === 0 && (<StepTwoFile {...contentProps} {...defaultUploadProps} />) }
          { type === CREATE_TYPE.fileLocal && layout.step === 0 && (<StepTwoFile {...contentProps} {...uploadLocalProps} />) }
        </div>
      </CreateLayout>
    </>
  )
}

Create.propTypes = {
  showModalConfirmation: PropTypes.bool,
  errorToast: PropTypes.bool,
  filesData: PropTypes.object,
  modalData: PropTypes.object,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  handleAddDatasource: PropTypes.func,
  handleBackStep: PropTypes.func,
  handleToggleModalError: PropTypes.func,
  handleNextStep: PropTypes.func,
  getSensorProperties: PropTypes.func,
  createSensor: PropTypes.func,
  resetConnector: PropTypes.func,
  handleChangeInput: PropTypes.func,
  tableList: PropTypes.object,
  addDataSource: PropTypes.func,
  addDataSourceItem: PropTypes.func,
  handleChangeFileInput: PropTypes.func,
  createConnector: PropTypes.object,
  layout: PropTypes.object,
  data: PropTypes.object,
  rules: PropTypes.object,
  title: PropTypes.string,
  token: PropTypes.string,
  maxStep: PropTypes.number,
  show: PropTypes.object,
  files: PropTypes.object,
  hideStep: PropTypes.bool,
  uploadUrl: PropTypes.string,
  authCookie: PropTypes.string,
  name: PropTypes.string,
  headers: PropTypes.object,
  fields: PropTypes.object,
  filePath: PropTypes.string,
  fileSize: PropTypes.number,
  handleFileChange: PropTypes.func,
  handleBackStepTypeFileLocal: PropTypes.func,
  handleCloseToast: PropTypes.func,
  handleOnUpload: PropTypes.func,
  getTableList: PropTypes.func,
}

Create.defaultProps = {
  filesData: {},
  handleOnUpload: () => {},
  handleToggleModalError: () => {},
  handleCloseToast: () => {},
  handleBackStepTypeFileLocal: () => {},
  handleBackStep: () => {},
  handleAddDatasource: () => {},
  handleChangeInput: () => {},
  handleChangeFileInput: () => {},
  handleNextStep: () => {},
  getSensorProperties: () => {},
  createSensor: () => {},
  resetConnector: () => {},
  addDataSource: () => {},
  addDataSourceItem: () => {},
  getTableList: () => {},
  tableList: {},
  createConnector: {},
  modalData: {},
  fields: {},
  showModalConfirmation: false,
  errorToast: false,
  errorMessage: '',
  type: '',
  layout: {},
  data: {},
  rules: {},
  title: '',
  token: '',
  uploadUrl: '',
  maxStep: 0,
  show: {},
  files: {},
  filePath: '',
  fileSize: 0,
  handleFileChange: () => {},
  hideStep: false,
  name: '',
  headers: {},
  authCookie: '',
}

export default lifecycle(method)(Create)
