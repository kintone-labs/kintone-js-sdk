import _UpdateGeneralSettingsRequest from "./app/UpdateGeneralSettingsRequest";
import _GetGeneralSettingsRequest from "./app/GetGeneralSettingsRequest";
import _UpdateViewsRequest from "./app/UpdateViewsRequest";
import _GetViewsRequest from "./app/GetViewsRequest";
import _GetAppDeployStatusRequest from "./app/GetAppDeployStatusRequest";
import _DeployAppSettingsRequest from "./app/DeployAppSettingsRequest";
import _AddPreviewAppRequest from "./app/AddPreviewAppRequest";
import _UpdateFormLayoutRequest from "./form/UpdateFormLayoutRequest";
import _GetFormLayoutsRequest from "./form/GetFormLayoutRequest";
import _DeleteFormFieldsRequest from "./form/DeleteFormFieldsRequest";
import _UpdateFormFieldsRequest from "./form/UpdateFormFieldsRequest";
import _AddFormFieldsRequest from "./form/AddFormFieldsRequest";
import _GetFormFieldsRequest from "./form/GetFormFieldsRequest";
import _GetAppsRequest from "./app/GetAppsRequest";
import _GetAppRequest from "./app/GetAppRequest";
/**
 * kintone api - nodejs client
 * App models
 */

const GetAppRequest = _GetAppRequest;
const GetAppsRequest = _GetAppsRequest;
const GetFormFieldsRequest = _GetFormFieldsRequest;
const AddFormFieldsRequest = _AddFormFieldsRequest;
const UpdateFormFieldsRequest = _UpdateFormFieldsRequest;
const DeleteFormFieldsRequest = _DeleteFormFieldsRequest;
const GetFormLayoutsRequest = _GetFormLayoutsRequest;
const UpdateFormLayoutRequest = _UpdateFormLayoutRequest;
const AddPreviewAppRequest = _AddPreviewAppRequest;
const DeployAppSettingsRequest = _DeployAppSettingsRequest;
const GetAppDeployStatusRequest = _GetAppDeployStatusRequest;
const GetViewsRequest = _GetViewsRequest;
const UpdateViewsRequest = _UpdateViewsRequest;
const GetGeneralSettingsRequest = _GetGeneralSettingsRequest;
const UpdateGeneralSettingsRequest = _UpdateGeneralSettingsRequest;
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