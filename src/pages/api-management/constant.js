/*
  Location: api-management > constants
*/

export const CONFIRMATION_CONTENT = {
  addNew: {
    title: 'Error saving App configuration',
    subtitle: 'There is error in saving your configuration! Try again later',
    secondaryButton: 'OK'
  },
  disabledApp: {
    title: 'Disable this app',
    subtitle: 'You cannot undo this action',
    secondaryButton: 'Cancel',
    primaryButton: 'Disable app'
  },
  changeUrlDatasource: {
    title: 'Save changes?',
    subtitle: 'You just changed the source dataset and/or callback URL. The app might not be working well',
    secondaryButton: 'Cancel',
    primaryButton: 'Save changes'
  },
  default: {
    title: '',
    subtitle: '',
    show: false
  }
}

export const DEFAULT_MODAL = {
  addNew: false,
  disabledApp: false,
  changeUrlDatasource: false
}
