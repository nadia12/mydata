import {
  connect,
} from 'react-redux'

import {
  CREATE_TYPE,
} from 'Config/constants'
import {
  setType,
  setInput,
  setModalErrorCreate,
  postDatasource,
  setBackStep,
  setNextStep,
  postCheckSqlCredential,
  setFiles,
  resetFields,
  tusUploadStart,
  setToastClose,
  setFileChange,
  setFileProperty,
  setLayout,
  tusConfiguration,
  linkToMyDataRoot,
} from 'Pages/my-data/create/function'

// import { linkToMyDataRoot } from './function'
import Create from './units'

const mapStateToProps = ({ volantisMyData: { _mydataCreate }, volantisConstant }) => {
  const {
    layout,
    title,
    maxStep,
    filePath,
    fileSize,
    type,
    data,
    rules,
    loadingText,
    isLoading,
    showModalConfirmation,
    modalData,
    files,
    filesData,
    show: {
      errorToast,
    },
    errorMessage,
  } = _mydataCreate

  const {
    cookie: { auth: authCookie },
    service: { host },
    routes: { myData: { root } },
  } = volantisConstant

  return {
    layout,
    allowNext: !!layout && !!layout.allowNext && layout.allowNext,
    title,
    maxStep,
    type,
    rules: rules[layout.step] || {},
    fields: data[`step${layout.step || 0}`] || [],
    data,
    loadingProps: {
      showLoading: isLoading,
      textLoading: loadingText,
    },
    showModalConfirmation,
    modalData,
    filePath,
    fileSize,
    files: {
      status: '',
      file: files[0],
    },
    filesData,
    authCookie,
    uploadUrl: `${host}/file/`,
    myDataUrl: root,
    errorToast,
    errorMessage,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  setType: ({ type }) => dispatch(setType({ type })),
  resetFields: () => dispatch(resetFields()),
  handleCloseToast: () => dispatch(setToastClose()),
  handleChangeInput: ({
    key = '', value = '', replacer = '', valueReplacer = '',
  }) => dispatch(setInput({
    key, value, replacer, valueReplacer,
  })),
  handleAddDatasource: () => dispatch((dispatch, getState) => {
    const {
      service: { host },
      cookie: { auth: authCookie },
    } = getState().volantisConstant
    const {
      type, files, filesData, layout,
    } = getState().volantisMyData._mydataCreate

    dispatch(setLayout({
      layout: {
        ...layout, allowNext: false,
      },
    }))

    if (type === 'filelocal') {
      if (filesData.status === 'SUCCESS') {
        // success redirect my-data
        dispatch(linkToMyDataRoot(props.linkTo))
      } else if (filesData.status === 'FAILED') {
        dispatch(tusUploadStart({ files, authCookie, uploadUrl: `${host}/file/` }))
      } else if (files[0] && files[0].name) {
        return dispatch(tusUploadStart({ files, authCookie, uploadUrl: `${host}/file/` }))
      }
    } else {
      return dispatch(postDatasource((res, err) => {
        if (err || !res) return dispatch(setModalErrorCreate())
        if (res) {
          // success redirect my-data
          return dispatch(linkToMyDataRoot(props.linkTo))
        }
      }))
    }
  }),
  handleToggleModalError: () => dispatch(setModalErrorCreate()),
  handleNextStep: () => dispatch((dispatch, getState) => {
    const {
      type,
      layout: { step },
    } = getState().volantisMyData._mydataCreate

    if (type === CREATE_TYPE.sql && step === 1) {
      return dispatch(postCheckSqlCredential((res, err) => {
        if (!err) return dispatch(setNextStep(res)) // response is tableName
      }))
    }

    return dispatch(setNextStep())
  }),
  handleBackStepTypeFileLocal: () => {
    dispatch(resetFields())
    dispatch(linkToMyDataRoot(props.linkTo))
  },

  handleChangeFileInput: accepted => {
    dispatch(setFiles({ accepted }))
    dispatch(setInput({ key: 'fileName', value: accepted[0].name }))
    dispatch(setFileProperty())
    dispatch(setFileChange({ showTableUpload: true }))
    dispatch(tusConfiguration())
  },
  handleBackStep: () => dispatch((dispatch, getState) => {
    const {
      volantisMyData: {
        _mydataCreate: {
          layout: { step },
        },
      },
    } = getState()
    if (step === 0) {
      dispatch(linkToMyDataRoot(props.linkTo))
    } else if (typeof window !== 'undefined' && window !== null && window.document.getElementById('child-scroll')) {
      window.document.getElementById('child-scroll').scrollTop = 0
    }

    return dispatch(setBackStep())
  }),
  handleOnUpload: () => dispatch((dispatch, getState) => {
    const {
      service: { host },
      cookie: { auth: authCookie },
    } = getState().volantisConstant

    const { files } = getState().volantisMyData._mydataCreate

    if (files[0] && files[0].name) {
      return dispatch(tusUploadStart({
        files, authCookie, uploadUrl: `${host}/file/`,
      }))
    }
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
