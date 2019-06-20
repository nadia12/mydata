export const DEFAULT_STATE = {
  preview: {
    isLoading: true,
    errorMessage: null,
    tableHeaders: [
      'loading',
      'loading',
      'loading',
      'loading',
      'loading',
      'loading',
    ],
    data: {
      result: [],
    },
  },
  info: {
    data: { id: '' },
    isLoading: true,
    errorMessage: null,
  },
  searchColumns: {},
  show: {
    info: false,
  },
}

export const initialStates = {
  ...DEFAULT_STATE,
}
