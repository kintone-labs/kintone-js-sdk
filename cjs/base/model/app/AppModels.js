"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateGeneralSettingsRequest = _interopRequireDefault(require("./app/UpdateGeneralSettingsRequest"));

var _GetGeneralSettingsRequest = _interopRequireDefault(require("./app/GetGeneralSettingsRequest"));

var _UpdateViewsRequest = _interopRequireDefault(require("./app/UpdateViewsRequest"));

var _GetViewsRequest = _interopRequireDefault(require("./app/GetViewsRequest"));

var _GetAppDeployStatusRequest = _interopRequireDefault(require("./app/GetAppDeployStatusRequest"));

var _DeployAppSettingsRequest = _interopRequireDefault(require("./app/DeployAppSettingsRequest"));

var _AddPreviewAppRequest = _interopRequireDefault(require("./app/AddPreviewAppRequest"));

var _UpdateFormLayoutRequest = _interopRequireDefault(require("./form/UpdateFormLayoutRequest"));

var _GetFormLayoutRequest = _interopRequireDefault(require("./form/GetFormLayoutRequest"));

var _DeleteFormFieldsRequest = _interopRequireDefault(require("./form/DeleteFormFieldsRequest"));

var _UpdateFormFieldsRequest = _interopRequireDefault(require("./form/UpdateFormFieldsRequest"));

var _AddFormFieldsRequest = _interopRequireDefault(require("./form/AddFormFieldsRequest"));

var _GetFormFieldsRequest = _interopRequireDefault(require("./form/GetFormFieldsRequest"));

var _GetAppsRequest = _interopRequireDefault(require("./app/GetAppsRequest"));

var _GetAppRequest = _interopRequireDefault(require("./app/GetAppRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * kintone api - nodejs client
 * App models
 */
var AppModels = {
  GetAppRequest: _GetAppRequest.default,
  GetAppsRequest: _GetAppsRequest.default,
  GetFormFieldsRequest: _GetFormFieldsRequest.default,
  AddFormFieldsRequest: _AddFormFieldsRequest.default,
  UpdateFormFieldsRequest: _UpdateFormFieldsRequest.default,
  DeleteFormFieldsRequest: _DeleteFormFieldsRequest.default,
  GetFormLayoutsRequest: _GetFormLayoutRequest.default,
  UpdateFormLayoutRequest: _UpdateFormLayoutRequest.default,
  AddPreviewAppRequest: _AddPreviewAppRequest.default,
  DeployAppSettingsRequest: _DeployAppSettingsRequest.default,
  GetAppDeployStatusRequest: _GetAppDeployStatusRequest.default,
  GetViewsRequest: _GetViewsRequest.default,
  UpdateViewsRequest: _UpdateViewsRequest.default,
  GetGeneralSettingsRequest: _GetGeneralSettingsRequest.default,
  UpdateGeneralSettingsRequest: _UpdateGeneralSettingsRequest.default
};
var _default = AppModels;
exports.default = _default;