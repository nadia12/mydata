import { currentUser } from 'Helpers/context';

export const getPermission = () => {
  const permission = currentUser().default_roles;

  const actionPermission = {
    addToPipeline: (((permission || {}).dataset || {}).create) || false,
    viewDataset: (((permission || {}).dataset || {}).read) || false,
    updateDataset: (((permission || {}).dataset || {}).update) || false,
    removeDataset: (((permission || {}).dataset || {}).delete) || false,
    createModel: (((permission || {}).model || {}).create) || false,
    viewModel: (((permission || {}).model || {}).read) || false,
    updateModel: (((permission || {}).model || {}).update) || false,
    removeModel: (((permission || {}).model || {}).delete) || false,
    createDatabase: (((permission || {}).database || {}).create) || false,
    createFile: (((permission || {}).file || {}).create) || false,
    createFolder: (((permission || {}).folder || {}).create) || false,
    createIot: (((permission || {}).iot || {}).create) || false,
    createUser: (((permission || {}).user || {}).create) || false,
    viewUser: (((permission || {}).user || {}).read) || false,
    removeDatabase: (((permission || {}).database || {}).delete) || false,
    removeUser: (((permission || {}).user || {}).delete) || false,
    removeFolder: (((permission || {}).folder || {}).delete) || false,
    removeIot: (((permission || {}).iot || {}).delete) || false,
    updateDashboard: (((permission || {}).xplorer_dashboard || {}).update) || false,
    deleteDashboard: (((permission || {}).xplorer_dashboard || {}).delete) || false,
    createDashboard: (((permission || {}).xplorer_dashboard || {}).create) || false,
    viewPretrainedModel: true,
    createApp: true
  };
  actionPermission.addNewData = actionPermission.createFile || actionPermission.createDatabase || actionPermission.createFolder || actionPermission.createIot;
  return actionPermission;
};
