"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Common = _interopRequireDefault(require("../../utils/Common"));

var _AppModels = _interopRequireDefault(require("../../model/app/AppModels"));

var _Connection = _interopRequireDefault(require("../../connection/Connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * App module
 */
class App {
  /**
   * The constructor for this module 
   * @param {Connection} connection
   */
  constructor({
    connection
  } = {}) {
    if (!(connection instanceof _Connection.default)) {
      throw new Error(`${connection} not an instance of Connection`);
    }

    this.connection = connection;
  }
  /**
   * @param {String} method
   * @param {String} url
   * @param {RecordModel} model
   * @return {Promise} Promise
   */


  sendRequest(method, url, model) {
    return _Common.default.sendRequest(method, url, model, this.connection);
  }
  /**
   * Get single app details
   * @param {Object} params
   * @param {Number} params.id
   * @return {Promise} Promise
   */


  getApp({
    id
  } = {}) {
    const dataRequest = new _AppModels.default.GetAppRequest(id);
    return this.sendRequest('GET', 'app', dataRequest);
  }
  /**
   * Get multiple apps details
   * @param {Object} params
   * @param {Number} params.offset
   * @param {Number} params.limit
   * @return {Promise} Promise
   */


  getApps({
    offset,
    limit
  } = {}) {
    const dataRequest = new _AppModels.default.GetAppsRequest(offset, limit);
    return this.sendRequest('GET', 'apps', dataRequest);
  }
  /**
   * Get multiple apps details
   * @param {Object} params
   * @param {Array<String>} params.codes
   * @param {Number} params.offset
   * @param {Number} params.limit
   * @return {Promise} Promise
   */


  getAppsByCodes({
    codes,
    offset,
    limit
  } = {}) {
    const dataRequest = new _AppModels.default.GetAppsRequest(offset, limit);
    dataRequest.setAppCodes(codes);
    return this.sendRequest('GET', 'apps', dataRequest);
  }
  /**
   * Get multiple apps details
   * @param {Object} params
   * @param {String} params.name
   * @param {Number} params.offset
   * @param {Number} params.limit
   * @return {Promise} Promise
   */


  getAppsByName({
    name,
    offset,
    limit
  } = {}) {
    const dataRequest = new _AppModels.default.GetAppsRequest(offset, limit);
    dataRequest.setAppName(name);
    return this.sendRequest('GET', 'apps', dataRequest);
  }
  /**
   * Get multiple apps details
   * @param {Object} params
   * @param {Array<Number>} params.ids
   * @param {Number} params.offset
   * @param {Number} params.limit
    * @return {Promise} Promise
   */


  getAppsByIDs({
    ids,
    offset,
    limit
  } = {}) {
    const dataRequest = new _AppModels.default.GetAppsRequest(offset, limit);
    dataRequest.setAppIDs(ids);
    return this.sendRequest('GET', 'apps', dataRequest);
  }
  /**
   * Get multiple apps details
   * @param {Object} params
   * @param {Array<String>} params.spaceIds
   * @param {Number} params.offset
   * @param {Number} params.limit
   * @return {Promise} Promise
   */


  getAppsBySpaceIDs({
    spaceIds,
    offset,
    limit
  } = {}) {
    const dataRequest = new _AppModels.default.GetAppsRequest(offset, limit);
    dataRequest.setAppSpaceIDs(spaceIds);
    return this.sendRequest('GET', 'apps', dataRequest);
  }
  /**
   * Get app's form fields details
   * @param {Object} params
   * @param {Number} params.app
   * @param {Boolean} params.isPreview
   * @return {Promise} Promise
   */


  getFormLayout({
    app,
    isPreview
  } = {}) {
    const dataRequest = new _AppModels.default.GetFormLayoutsRequest(app);
    const apiName = isPreview === true ? 'APP_LAYOUT_PREVIEW' : 'APP_LAYOUT';
    return this.sendRequest('GET', apiName, dataRequest);
  }
  /**
   * Update app's form fields details
   * @param {Object} params
   * @param {Number} params.app
   * @param {Array<{ItemLayout}>} params.layout
   * @param {Number} params.revision
   * @return {Promise} Promise
   */


  updateFormLayout({
    app,
    layout,
    revision
  }) {
    const dataRequest = new _AppModels.default.UpdateFormLayoutRequest(app, layout, revision);
    return this.sendRequest('PUT', 'APP_LAYOUT_PREVIEW', dataRequest);
  }
  /**
   * Get app's form fields details
   * @param {Object} params
   * @param {Number} params.app
   * @param {String} params.lang
   * @param {Boolean} params.isPreview
   * @return {Promise} Promise
   */


  getFormFields({
    app,
    lang,
    isPreview
  } = {}) {
    const dataRequest = new _AppModels.default.GetFormFieldsRequest(app, lang);
    const apiName = isPreview === true ? 'APP_FIELDS_PREVIEW' : 'APP_FIELDS';
    return this.sendRequest('GET', apiName, dataRequest);
  }
  /**
   * Add form fields
   * @param {Object} params
   * @param {Number} params.app
   * @param {Object} params.fields
   * @param {Number} params.revision
   * @returns {Promise} Promise
   */


  addFormFields({
    app,
    fields,
    revision
  } = {}) {
    const dataRequest = new _AppModels.default.AddFormFieldsRequest(app, fields, revision);
    return this.sendRequest('POST', 'APP_FIELDS_PREVIEW', dataRequest);
  }
  /**
   * Update form fields
   * @param {Object} params
   * @param {Number} params.app
   * @param {Object} params.fields
   * @param {Number} params.revision
   * @returns {Promise} Promise
   */


  updateFormFields({
    app,
    fields,
    revision
  }) {
    const dataRequest = new _AppModels.default.UpdateFormFieldsRequest(app, fields, revision);
    return this.sendRequest('PUT', 'APP_FIELDS_PREVIEW', dataRequest);
  }
  /**
   * Delete form fields
   * @param {Object} params
   * @param {Number} params.app
   * @param {Object} params.fields
   * @param {Number} params.revision
   * @returns {Promise} Promise
   */


  deleteFormFields({
    app,
    fields,
    revision
  } = {}) {
    const dataRequest = new _AppModels.default.DeleteFormFieldsRequest(app, fields, revision);
    return this.sendRequest('DELETE', 'APP_FIELDS_PREVIEW', dataRequest);
  }
  /**
   * Add form fields
   * @param {Object} params
   * @param {String} params.name
   * @param {Number} params.space
   * @param {Number} params.thread
   * @returns {Promise} Promise
   */


  addPreviewApp({
    name,
    space,
    thread
  } = {}) {
    const dataRequest = new _AppModels.default.AddPreviewAppRequest(name, space, thread);
    return this.sendRequest('POST', 'APP_PREVIEW', dataRequest);
  }
  /**
   * Deploy App Settings
   * @param {Object} params
   * @param {Array<{AddPreviewAppResponse}>} params.apps
   * @param {Boolean} params.revert
   * @returns {Promise} Promise
   */


  deployAppSettings({
    apps,
    revert
  } = {}) {
    const dataRequest = new _AppModels.default.DeployAppSettingsRequest(apps, revert);
    return this.sendRequest('POST', 'APP_DEPLOY_PREVIEW', dataRequest);
  }
  /**
   * Get App Deploy Status
   * @param {Object} params
   * @param {Array} params.apps
   * @returns {Promise} Promise
   */


  getAppDeployStatus({
    apps
  } = {}) {
    const dataRequest = new _AppModels.default.GetAppDeployStatusRequest(apps);
    return this.sendRequest('GET', 'APP_DEPLOY_PREVIEW', dataRequest);
  }
  /**
   * Get Views
   * @param {Object} params
   * @param {Number} params.app
   * @param {String} params.lang
   * @param {Boolean} params.isPreview
   * @returns {Promise} Promise
   */


  getViews({
    app,
    lang,
    isPreview
  } = {}) {
    const dataRequest = new _AppModels.default.GetViewsRequest(app, lang);
    const apiName = isPreview ? 'APP_VIEWS_PREVIEW' : 'APP_VIEWS';
    return this.sendRequest('GET', apiName, dataRequest);
  }
  /**
   * Update Views
   * @param {Object} params
   * @param {Number} params.app
   * @param {Object} params.views
   * @param {Number} params.revision
   * @returns {Promise} Promise
   */


  updateViews({
    app,
    views,
    revision
  } = {}) {
    const dataRequest = new _AppModels.default.UpdateViewsRequest(app, views, revision);
    return this.sendRequest('PUT', 'APP_VIEWS_PREVIEW', dataRequest);
  }
  /**
   * Get Views
   * @param {Object} params
   * @param {Number} params.app
   * @param {String} params.lang
   * @param {Boolean} params.isPreview
   * @returns {Promise} Promise
   */


  getGeneralSettings({
    app,
    lang,
    isPreview
  } = {}) {
    const dataRequest = new _AppModels.default.GetGeneralSettingsRequest(app, lang);
    const apiName = isPreview ? 'APP_SETTINGS_PREVIEW' : 'APP_SETTINGS';
    return this.sendRequest('GET', apiName, dataRequest);
  }
  /**
   * Get Views
   * @param {Object} params
   * @param {Number} params.app
   * @param {String} params.name
   * @param {String} params.description
   * @param {Icon} params.icon
   * @param {String} params.theme
   * @param {Boolean} params.revision
   * @returns {Promise} Promise
   */


  updateGeneralSettings(params = {}) {
    const dataRequest = new _AppModels.default.UpdateGeneralSettingsRequest(params);
    return this.sendRequest('PUT', 'APP_SETTINGS_PREVIEW', dataRequest);
  }

}

var _default = App;
exports.default = _default;