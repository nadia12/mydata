export const DEFAULT_STATE = {
  preview: {
    isLoading: true,
    errorMessage: null,
    data: {
      result: [],
    },
    status: null,
  },
  tableHeaders: {
    isLoading: true,
    errorMessage: null,
    data: [
      { name: 'loading', type: null },
      { name: 'loading', type: null },
      { name: 'loading', type: null },
      { name: 'loading', type: null },
      { name: 'loading', type: null },
      { name: 'loading', type: null },
      { name: 'loading', type: null },
    ],
    status: null,
  },
  info: {
    data: { id: '' },
    isLoading: true,
    errorMessage: null,
  },
  show: {
    info: false,
  },
  selectAction: {
    value: '',
    options: [{ label: 'Open With Pipeline', value: 'openPipeline' }],
  },
  searchColumns: [],
}

export const initialStates = {
  ...DEFAULT_STATE,
}
