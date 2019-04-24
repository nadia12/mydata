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
  setBackStepTypeFile,
  postCheckSqlCredential,
  setFiles,
  resetFields,
  postUpload,
  setToastClose,
} from 'Pages/my-data/create/function'
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
  handleAddDatasource: myDataUrl => dispatch(postDatasource((res, err) => {
    if (err) {
      return dispatch(setModalErrorCreate())
    }
    if (!err) {
      // success redirect my-data
      props.linkTo(myDataUrl)
    }
  })),
  handleToggleModalError: () => dispatch(setModalErrorCreate()),
  handleNextStep: () => dispatch((dispatch, getState) => {
    const {
      type,
      layout: { step },
    } = getState().volantisMyData._mydataCreate

    if (type === CREATE_TYPE.sql && step === 1) {
      return dispatch(postCheckSqlCredential((res, err) => {
        if (!err) return dispatch(setNextStep())
      }))
    }

    return dispatch(setNextStep())
  }),
  handleBackStepTypeFile: ({ step = 0, myDataUrl }) => {
    if (step === 0) {
      props.linkTo(myDataUrl)
    } else if (typeof window !== 'undefined' && window !== null && window.document.getElementById('child-scroll')) {
      window.document.getElementById('child-scroll').scrollTop = 0
    }

    return dispatch(setBackStepTypeFile())
  },
  handleChangeFileInput: accepted => dispatch(setFiles({ accepted })),
  handleBackStep: ({ step = 0, myDataUrl }) => {
    if (step === 0) {
      props.linkTo(myDataUrl)
    } else if (typeof window !== 'undefined' && window !== null && window.document.getElementById('child-scroll')) {
      window.document.getElementById('child-scroll').scrollTop = 0
    }

    return dispatch(setBackStep())
  },
  handleOnUpload: ({ files, authCookie, uploadUrl }) => {
    if (files[0] && files[0].name) {
      return dispatch(postUpload({ files, authCookie, uploadUrl }))
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
