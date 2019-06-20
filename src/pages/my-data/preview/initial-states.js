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
  show: {
    info: false,
  },
  selectAction: {
    value: '',
    options: [{ label: 'Open With Pipeline', value: 'openPipeline' }],
  },
}

export const initialStates = {
  ...DEFAULT_STATE,
}
