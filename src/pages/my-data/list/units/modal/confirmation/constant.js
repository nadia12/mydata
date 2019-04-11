export const CONFIRMATION_CONTENT = {
  addNew: {
    title: 'Error saving App configuration',
    subtitle: 'There is error in saving your configuration! Try again later',
    secondaryButton: 'OK',
  },
  disabledApp: {
    title: 'Disable this app',
    subtitle: 'You cannot undo this action',
    secondaryButton: 'Cancel',
    primaryButton: 'Disable app',
  },
  changeUrlDatasource: {
    title: 'Save changes?',
    subtitle: 'You just changed the source dataset and/or callback URL. The app might not be working well',
    secondaryButton: 'Cancel',
    primaryButton: 'Save changes',
  },
  addToPipeline: {
    title: 'Are you sure you want to create pipeline using these selected data sources?',
    subTitle: 'If you select sensor/sensor group that haven\'t received any data after mapping, it won\'t be added to your pipeline. The rest of selected items are good to go.',
    confirmText: 'Add To Pipeline',
    hasSubmit: true,
  },
  addToPipelineEmpty: {
    title: 'Your datasource is error!',
    subTitle: 'Datasource with error status could not be proceed to pipeline.',
    cancelText: 'OK',
  },
  default: {
    title: '',
    subtitle: '',
    show: false,
  },
}

