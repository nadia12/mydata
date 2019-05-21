export const actionTypes = {
  setIsAuthenticated: 'SET_IS_AUTHENTICATED',
}

const initialState = {
  isAuthenticated: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setIsAuthenticated:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      }
    default:
      return state
  }
}
