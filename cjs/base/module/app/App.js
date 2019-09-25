"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Common = _interopRequireDefault(require("../../utils/Common"));

var _AppModels = _interopRequireDefault(require("../../model/app/AppModels"));

var _Connection = _interopRequireDefault(require("../../connection/Connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * App module
 */
var App =
/*#__PURE__*/
function () {
  /**
   * The constructor for this module 
   * @param {Connection} connection
   */
  function App() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        connection = _ref.connection;

    _classCallCheck(this, App);

    if (!(connection instanceof _Connection.default)) {
      throw new Error("".concat(connection, " not an instance of Connection"));
    }

    this.connection = connection;
  }
  /**
   * @param {String} method
   * @param {String} url
   * @param {RecordModel} model
   * @return {Promise} Promise
   */


  _createClass(App, [{
    key: "sendRequest",
    value: function sendRequest(method, url, model) {
      return _Common.default.sendRequest(method, url, model, this.connection);
    }
    /**
     * Get single app details
     * @param {Object} params
     * @param {Number} params.id
     * @return {Promise} Promise
     */

  }, {
    key: "getApp",
    value: function getApp() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          id = _ref2.id;

      var dataRequest = new _AppModels.default.GetAppRequest(id);
      return this.sendRequest('GET', 'app', dataRequest);
    }
    /**
     * Get multiple apps details
     * @param {Object} params
     * @param {Number} params.offset
     * @param {Number} params.limit
     * @return {Promise} Promise
     */

  }, {
    key: "getApps",
    value: function getApps() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          offset = _ref3.offset,
          limit = _ref3.limit;

      var dataRequest = new _AppModels.default.GetAppsRequest(offset, limit);
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

  }, {
    key: "getAppsByCodes",
    value: function getAppsByCodes() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          codes = _ref4.codes,
          offset = _ref4.offset,
          limit = _ref4.limit;

      var dataRequest = new _AppModels.default.GetAppsRequest(offset, limit);
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

  }, {
    key: "getAppsByName",
    value: function getAppsByName() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          name = _ref5.name,
          offset = _ref5.offset,
          limit = _ref5.limit;

      var dataRequest = new _AppModels.default.GetAppsRequest(offset, limit);
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

  }, {
    key: "getAppsByIDs",
    value: function getAppsByIDs() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          ids = _ref6.ids,
          offset = _ref6.offset,
          limit = _ref6.limit;

      var dataRequest = new _AppModels.default.GetAppsRequest(offset, limit);
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

  }, {
    key: "getAppsBySpaceIDs",
    value: function getAppsBySpaceIDs() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          spaceIds = _ref7.spaceIds,
          offset = _ref7.offset,
          limit = _ref7.limit;

      var dataRequest = new _AppModels.default.GetAppsRequest(offset, limit);
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

  }, {
    key: "getFormLayout",
    value: function getFormLayout() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref8.app,
          isPreview = _ref8.isPreview;

      var dataRequest = new _AppModels.default.GetFormLayoutsRequest(app);
      var apiName = isPreview === true ? 'APP_LAYOUT_PREVIEW' : 'APP_LAYOUT';
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

  }, {
    key: "updateFormLayout",
    value: function updateFormLayout(_ref9) {
      var app = _ref9.app,
          layout = _ref9.layout,
          revision = _ref9.revision;
      var dataRequest = new _AppModels.default.UpdateFormLayoutRequest(app, layout, revision);
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

  }, {
    key: "getFormFields",
    value: function getFormFields() {
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref10.app,
          lang = _ref10.lang,
          isPreview = _ref10.isPreview;

      var dataRequest = new _AppModels.default.GetFormFieldsRequest(app, lang);
      var apiName = isPreview === true ? 'APP_FIELDS_PREVIEW' : 'APP_FIELDS';
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

  }, {
    key: "addFormFields",
    value: function addFormFields() {
      var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref11.app,
          fields = _ref11.fields,
          revision = _ref11.revision;

      var dataRequest = new _AppModels.default.AddFormFieldsRequest(app, fields, revision);
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

  }, {
    key: "updateFormFields",
    value: function updateFormFields(_ref12) {
      var app = _ref12.app,
          fields = _ref12.fields,
          revision = _ref12.revision;
      var dataRequest = new _AppModels.default.UpdateFormFieldsRequest(app, fields, revision);
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

  }, {
    key: "deleteFormFields",
    value: function deleteFormFields() {
      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref13.app,
          fields = _ref13.fields,
          revision = _ref13.revision;

      var dataRequest = new _AppModels.default.DeleteFormFieldsRequest(app, fields, revision);
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

  }, {
    key: "addPreviewApp",
    value: function addPreviewApp() {
      var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          name = _ref14.name,
          space = _ref14.space,
          thread = _ref14.thread;

      var dataRequest = new _AppModels.default.AddPreviewAppRequest(name, space, thread);
      return this.sendRequest('POST', 'APP_PREVIEW', dataRequest);
    }
    /**
     * Deploy App Settings
     * @param {Object} params
     * @param {Array<{AddPreviewAppResponse}>} params.apps
     * @param {Boolean} params.revert
     * @returns {Promise} Promise
     */

  }, {
    key: "deployAppSettings",
    value: function deployAppSettings() {
      var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          apps = _ref15.apps,
          revert = _ref15.revert;

      var dataRequest = new _AppModels.default.DeployAppSettingsRequest(apps, revert);
      return this.sendRequest('POST', 'APP_DEPLOY_PREVIEW', dataRequest);
    }
    /**
     * Get App Deploy Status
     * @param {Object} params
     * @param {Array} params.apps
     * @returns {Promise} Promise
     */

  }, {
    key: "getAppDeployStatus",
    value: function getAppDeployStatus() {
      var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          apps = _ref16.apps;

      var dataRequest = new _AppModels.default.GetAppDeployStatusRequest(apps);
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

  }, {
    key: "getViews",
    value: function getViews() {
      var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref17.app,
          lang = _ref17.lang,
          isPreview = _ref17.isPreview;

      var dataRequest = new _AppModels.default.GetViewsRequest(app, lang);
      var apiName = isPreview ? 'APP_VIEWS_PREVIEW' : 'APP_VIEWS';
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

  }, {
    key: "updateViews",
    value: function updateViews() {
      var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref18.app,
          views = _ref18.views,
          revision = _ref18.revision;

      var dataRequest = new _AppModels.default.UpdateViewsRequest(app, views, revision);
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

  }, {
    key: "getGeneralSettings",
    value: function getGeneralSettings() {
      var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref19.app,
          lang = _ref19.lang,
          isPreview = _ref19.isPreview;

      var dataRequest = new _AppModels.default.GetGeneralSettingsRequest(app, lang);
      var apiName = isPreview ? 'APP_SETTINGS_PREVIEW' : 'APP_SETTINGS';
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

  }, {
    key: "updateGeneralSettings",
    value: function updateGeneralSettings() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var dataRequest = new _AppModels.default.UpdateGeneralSettingsRequest(params);
      return this.sendRequest('PUT', 'APP_SETTINGS_PREVIEW', dataRequest);
    }
  }]);

  return App;
}();

var _default = App;
exports.default = _default;