import {
  connect,
} from 'react-redux'

import {
  setUserInfo,
  setAuthCookie,
  setType,
  setInput,
  setModalErrorCreate,
  postDatasource,
  setBackStep,
  setNextStep,
  setBackStepTypeFile,
  setFiles,
  postUpload,
} from 'Pages/my-data/create/function'
import Create from './units'

const mapStateToProps = state => {
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
  } = state._mydataCreate

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
  }
}

const mapDispatchToProps = dispatch => ({
  setUserInfo: ({ userInfo }) => dispatch(setUserInfo({ userInfo })),
  setAuthCookie: ({ authCookie }) => dispatch(setAuthCookie({ authCookie })),
  setType: ({ type }) => dispatch(setType({ type })),
  handleChangeInput: ({
    key = '', value = '', replacer = '', valueReplacer = '',
  }) => dispatch(setInput({
    key, value, replacer, valueReplacer,
  })),
  handleAddDatasource: () => dispatch(postDatasource((res, err) => {
    if (err) {
      return dispatch(setModalErrorCreate())
    }
    if (!err && !!window) {
      // success redirect my-data
      window.location.href = '/my-data'
    }
  })),
  handleToggleModalError: () => dispatch(setModalErrorCreate()),
  handleNextStep: () => dispatch(setNextStep()),
  handleBackStepTypeFile: ({ step = 0 }) => {
    if (step === 0 && !!window) {
      window.location.href = '/my-data'
    } else if (!!window && window.document.getElementById('child-scroll')) {
      window.document.getElementById('child-scroll').scrollTop = 0
    }

    return dispatch(setBackStepTypeFile())
  },
  handleChangeFileInput: accepted => dispatch(setFiles({ accepted })),
  handleBackStep: ({ step = 0 }) => {
    if (step === 0 && !!window) {
      window.location.href = '/my-data'
    } else if (!!window && window.document.getElementById('child-scroll')) {
      window.document.getElementById('child-scroll').scrollTop = 0
    }

    return dispatch(setBackStep())
  },
  handleOnUpload: ({ files, authCookie }) => {
    if (files[0] && files[0].name) {
      dispatch(postUpload({ files, authCookie }))
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
