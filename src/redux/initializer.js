export const createReducer = (initialState, fnMap) => (
  (state = initialState, { type, payload }) => {
    const handle = fnMap[type]

    return handle ? handle(state, payload) : state
  }
)
