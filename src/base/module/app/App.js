const Connection = require('../../connection/Connection');
const AppModel = require('../../model/app/AppModels');
const common = require('../../utils/Common');

/**
 * App module
 */
class App {
  /**
   * The constructor for this module
   * @param {Connection} connection
   */
  constructor(connection) {
    if (!(connection instanceof Connection)) {
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
    return common.sendRequest(method, url, model, this.connection);
  }
  /**
   * Get single app details
   * @param {Number} appId
   * @return {Promise} Promise
   */
  getApp(appId) {
    const dataRequest =
            new AppModel.GetAppRequest(appId);
    return this.sendRequest('GET', 'app', dataRequest);
  }
  /**
   * Get multiple apps details
   * @param {Number} offset
   * @param {Number} limit
   * @return {Promise} Promise
   */
  getApps(offset, limit) {
    const dataRequest = new AppModel.GetAppsRequest(offset, limit);
    return this.sendRequest('GET', 'apps', dataRequest);
  }
  /**
   * Get multiple apps details
   * @param {Array<String>} codes
   * @param {Number} offset
   * @param {Number} limit
   * @return {Promise} Promise
   */
  getAppsByCodes(codes, offset, limit) {
    const dataRequest = new AppModel.GetAppsRequest(offset, limit);
    dataRequest.setAppCodes(codes);
    return this.sendRequest('GET', 'apps', dataRequest);
  }
  /**
   * Get multiple apps details
   * @param {String} name
   * @param {Number} offset
   * @param {Number} limit
   * @return {Promise} Promise
   */
  getAppsByName(name, offset, limit) {
    const dataRequest = new AppModel.GetAppsRequest(offset, limit);
    dataRequest.setAppName(name);
    return this.sendRequest('GET', 'apps', dataRequest);
  }
  /**
   * Get multiple apps details
   * @param {Array<Number>} ids
   * @param {Number} offset
   * @param {Number} limit
   * @return {Promise} Promise
   */
  getAppsByIDs(ids, offset, limit) {
    const dataRequest =
            new AppModel.GetAppsRequest(offset, limit);
    dataRequest.setAppIDs(ids);
    return this.sendRequest('GET', 'apps', dataRequest);
  }
  /**
   * Get multiple apps details
   * @param {Array<String>} spaceIds
   * @param {Number} offset
   * @param {Number} limit
   * @return {Promise} Promise
   */
  getAppsBySpaceIDs(spaceIds, offset, limit) {
    const dataRequest = new AppModel.GetAppsRequest(offset, limit);
    dataRequest.setAppSpaceIDs(spaceIds);
    return this.sendRequest('GET', 'apps', dataRequest);
  }
  /**
   * Get app's form fields details
   * @param {Number} app
   * @param {Boolean} isPreview
   * @return {Promise} Promise
   */
  getFormLayout(app, isPreview) {
    const dataRequest = new AppModel.GetFormLayoutsRequest(app);
    const apiName = isPreview === true ? 'APP_LAYOUT_PREVIEW' : 'APP_LAYOUT';
    return this.sendRequest('GET', apiName, dataRequest);
  }
  /**
   * Update app's form fields details
   * @param {Number} app
   * @param {Array<{ItemLayout}>} layout
   * @param {Number} revision
   * @return {Promise} Promise
   */
  updateFormLayout(app, layout, revision) {
    const dataRequest = new AppModel.UpdateFormLayoutRequest(app, layout, revision);
    return this.sendRequest('PUT', 'APP_LAYOUT_PREVIEW', dataRequest);
  }
  /**
   * Get app's form fields details
   * @param {Number} app
   * @param {String} lang
   * @param {Boolean} isPreview
   * @return {Promise} Promise
   */
  getFormFields(app, lang, isPreview) {
    const dataRequest = new AppModel.GetFormFieldsRequest(app, lang);
    const apiName = isPreview === true ? 'APP_FIELDS_PREVIEW' : 'APP_FIELDS';
    return this.sendRequest('GET', apiName, dataRequest);
  }
  /**
   * Add form fields
   * @param {Number} app
   * @param {Object} fields
   * @param {Number} revision
   * @returns {Promise} Promise
   */
  addFormFields(app, fields, revision) {
    const dataRequest = new AppModel.AddFormFieldsRequest(app, fields, revision);
    return this.sendRequest('POST', 'APP_FIELDS_PREVIEW', dataRequest);
  }

  /**
   * Update form fields
   * @param {Number} app
   * @param {Object} fields
   * @param {Number} revision
   * @returns {Promise} Promise
   */
  updateFormFields(app, fields, revision) {
    const dataRequest = new AppModel.UpdateFormFieldsRequest(app, fields, revision);
    return this.sendRequest('PUT', 'APP_FIELDS_PREVIEW', dataRequest);
  }

  /**
   * Delete form fields
   * @param {Number} app
   * @param {Object} fields
   * @param {Number} revision
   * @returns {Promise} Promise
   */
  deleteFormFields(app, fields, revision) {
    const dataRequest = new AppModel.DeleteFormFieldsRequest(app, fields, revision);
    return this.sendRequest('DELETE', 'APP_FIELDS_PREVIEW', dataRequest);
  }

  /**
   * Add form fields
   * @param {String} name
   * @param {Number} space
   * @param {Number} thread
   * @returns {Promise} Promise
   */
  addPreviewApp(name, space, thread) {
    const dataRequest = new AppModel.AddPreviewAppRequest(name, space, thread);
    return this.sendRequest('POST', 'APP_PREVIEW', dataRequest);
  }

  /**
   * Deploy App Settings
   * @param {Array<{AddPreviewAppResponse}>} apps
   * @param {Boolean} revert
   * @returns {Promise} Promise
   */
  deployAppSettings(apps, revert) {
    const dataRequest = new AppModel.DeployAppSettingsRequest(apps, revert);
    return this.sendRequest('POST', 'APP_DEPLOY_PREVIEW', dataRequest);
  }

  /**
   * Get App Deploy Status
   * @param {Array} apps
   * @returns {Promise} Promise
   */
  getAppDeployStatus(apps) {
    const dataRequest = new AppModel.GetAppDeployStatusRequest(apps);
    return this.sendRequest('GET', 'APP_DEPLOY_PREVIEW', dataRequest);
  }

  /**
   * Get Views
   * @param {Number} app
   * @param {String} lang
   * @param {Boolean} isPreview
   * @returns {Promise} Promise
   */
  getViews(app, lang, isPreview) {
    const dataRequest = new AppModel.GetViewsRequest(app, lang);
    const apiName = isPreview ? 'APP_VIEWS_PREVIEW' : 'APP_VIEWS';
    return this.sendRequest('GET', apiName, dataRequest);
  }

  /**
   * Update Views
   * @param {Number} app
   * @param {Object} views
   * @param {Number} revision
   * @returns {Promise} Promise
   */
  updateViews(app, views, revision) {
    const dataRequest = new AppModel.UpdateViewsRequest(app, views, revision);
    return this.sendRequest('PUT', 'APP_VIEWS_PREVIEW', dataRequest);
  }

  /**
   * Get Views
   * @param {Number} app
   * @param {String} lang
   * @param {Boolean} isPreview
   * @returns {Promise} Promise
   */
  getGeneralSettings(app, lang, isPreview) {
    const dataRequest = new AppModel.GetGeneralSettingsRequest(app, lang);
    const apiName = isPreview ? 'APP_SETTINGS_PREVIEW' : 'APP_SETTINGS';
    return this.sendRequest('GET', apiName, dataRequest);
  }

  /**
   * Get Views
   * @param {Number} app
   * @param {{GeneralSettings}} generalSettings
   * @param {Boolean} revision
   * @returns {Promise} Promise
   */
  updateGeneralSettings(app, generalSettings, revision) {
    const dataRequest = new AppModel.UpdateGeneralSettingsRequest(app, generalSettings, revision);
    return this.sendRequest('PUT', 'APP_SETTINGS_PREVIEW', dataRequest);
  }
}
module.exports = App;
