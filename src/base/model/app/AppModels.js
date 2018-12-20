/**
 * kintone api - nodejs client
 * App models
 */

const AppModels = {
  GetAppRequest: require('./app/GetAppRequest'),
  GetAppsRequest: require('./app/GetAppsRequest'),
  GetFormFieldsRequest: require('./form/GetFormFieldsRequest'),
  AddFormFieldsRequest: require('./form/AddFormFieldsRequest'),
  UpdateFormFieldsRequest: require('./form/UpdateFormFieldsRequest'),
  DeleteFormFieldsRequest: require('./form/DeleteFormFieldsRequest'),
  GetFormLayoutsRequest: require('./form/GetFormLayoutRequest'),
  UpdateFormLayoutRequest: require('./form/UpdateFormLayoutRequest'),
  AddPreviewAppRequest: require('./app/AddPreviewAppRequest'),
  DeployAppSettingsRequest: require('./app/DeployAppSettingsRequest'),
  GetAppDeployStatusRequest: require('./app/GetAppDeployStatusRequest'),
  GetViewsRequest: require('./app/GetViewsRequest'),
  UpdateViewsRequest: require('./app/UpdateViewsRequest'),
  GetGeneralSettingsRequest: require('./app/GetGeneralSettingsRequest'),
  UpdateGeneralSettingsRequest: require('./app/UpdateGeneralSettingsRequest')
};
module.exports = AppModels;
