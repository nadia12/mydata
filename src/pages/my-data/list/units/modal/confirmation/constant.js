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
    subtitle: 'If you select sensor/sensor group that haven\'t received any data after mapping, it won\'t be added to your pipeline. The rest of selected items are good to go.',
    confirmText: 'Add To Pipeline',
    hasSubmit: true,
  },
  addToPipelineEmpty: {
    title: 'Your datasource is error!',
    subtitle: 'Datasource with error status could not be proceed to pipeline.',
    primaryButton: 'OK',
  },
  moveToTrash: {
    title: 'Cant move to trash',
    subtitle: 'This entity cannot be moved, only items with ERROR or SUCCESS status will be moved',
<<<<<<< HEAD
    primaryButton: 'I Understand',
=======
    primaryButton: 'I understand',
>>>>>>> bacfd46dd119fd920a308c35607fdff3872064ef
  },
  default: {
    title: '',
    subtitle: '',
    show: false,
  },
}

