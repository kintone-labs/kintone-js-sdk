import UpdateGeneralSettingsRequest from "./app/UpdateGeneralSettingsRequest";
import GetGeneralSettingsRequest from "./app/GetGeneralSettingsRequest";
import UpdateViewsRequest from "./app/UpdateViewsRequest";
import GetViewsRequest from "./app/GetViewsRequest";
import GetAppDeployStatusRequest from "./app/GetAppDeployStatusRequest";
import DeployAppSettingsRequest from "./app/DeployAppSettingsRequest";
import AddPreviewAppRequest from "./app/AddPreviewAppRequest";
import UpdateFormLayoutRequest from "./form/UpdateFormLayoutRequest";
import GetFormLayoutsRequest from "./form/GetFormLayoutRequest";
import DeleteFormFieldsRequest from "./form/DeleteFormFieldsRequest";
import UpdateFormFieldsRequest from "./form/UpdateFormFieldsRequest";
import AddFormFieldsRequest from "./form/AddFormFieldsRequest";
import GetFormFieldsRequest from "./form/GetFormFieldsRequest";
import GetAppsRequest from "./app/GetAppsRequest";
import GetAppRequest from "./app/GetAppRequest";
/**
 * kintone api - nodejs client
 * App models
 */

const AppModels = {
  GetAppRequest,
  GetAppsRequest,
  GetFormFieldsRequest,
  AddFormFieldsRequest,
  UpdateFormFieldsRequest,
  DeleteFormFieldsRequest,
  GetFormLayoutsRequest,
  UpdateFormLayoutRequest,
  AddPreviewAppRequest,
  DeployAppSettingsRequest,
  GetAppDeployStatusRequest,
  GetViewsRequest,
  UpdateViewsRequest,
  GetGeneralSettingsRequest,
  UpdateGeneralSettingsRequest
};
export default AppModels;
