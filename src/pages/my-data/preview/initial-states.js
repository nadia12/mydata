export const DEFAULT_STATE = {
  preview: {
    isLoading: true,
    errorMessage: '',
    tableHeaders: ['waiting...', 'waiting...', 'waiting...', 'waiting...', 'waiting...', 'waiting...'],
    data: {
      result: [],
    },
  },
  info: {
    data: {},
    isLoading: true,
    errorMessage: '',
  },
  searchColumns: {},
}

export const initialStates = {
  ...DEFAULT_STATE,
}
