export const initialState = {
  email: '',
  password: '',
  isValidEmail: false,
  isEmailTouched: false,
  showModal: false,
  errorMessage: {
    title: '',
    subtitle: '',
  },
  isSubmitting: false,
}

export const actionType = {
  setEmail: 'SET_EMAIL',
  setPassword: 'SET_PASSWORD',
  setEmailKeyPress: 'SET_EMAIL_KEYPRESS',
  setShowModal: 'SET_SHOW_MODAL',
  setErrorMessage: 'SET_ERROR_MESSAGE',
  setIsSubmitting: 'SET_IS_SUBMITTING',
}

export function reducer(state, action) {
  switch (action.type) {
    case actionType.setEmail:
      return {
        ...state,
        email: action.payload,
      }
    case actionType.setPassword:
      return {
        ...state,
        password: action.payload,
      }
    case actionType.setEmailKeyPress:
      return {
        ...state,
        isValidEmail: action.isValidEmail,
        isEmailTouched: true,
      }
    case actionType.setShowModal:
      return {
        ...state,
        showModal: !state.showModal,
      }
    case actionType.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      }
    case actionType.setIsSubmitting:
      return {
        ...state,
        isSubmitting: !state.isSubmitting,
      }
    default:
      return state
  }
}
