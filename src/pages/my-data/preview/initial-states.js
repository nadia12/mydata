export const DEFAULT_STATE = {
  preview: {
    isLoading: true,
    errorMessage: {},
    tableHeaders: ['waiting...', 'waiting...', 'waiting...', 'waiting...', 'waiting...', 'waiting...'],
    data: {
      result: [],
    },
  },
  info: {
    data: {},
    isLoading: true,
    errorMessage: {},
  },
  searchColumns: {},
  show: {
    info: false,
  },
}

export const initialStates = {
  ...DEFAULT_STATE,
}
