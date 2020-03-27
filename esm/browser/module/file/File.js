import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import common from '../../../base/utils/Common';
import { Connection } from '../connection/Connection';
import FileModel from '../../../base/model/file/FileModels';
import { KintoneAPIException } from '../../../base/main';
/**
 * File module
 */

export var File = /*#__PURE__*/function () {
  /**
     * The constructor for this module
     * @param {Object} params
     * @param {Connection} params.connection
     */
  function File() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        conn = _ref.connection;

    _classCallCheck(this, File);

    var connection = conn;

    if (!connection) {
      connection = new Connection();
    }

    if (!(connection instanceof Connection)) {
      throw new KintoneAPIException("".concat(connection, " is not an instance of Connection"));
    }

    this.connection = connection;
  }
  /**
   * check required arguments
   *
   * @param {Object} params
   * @returns {Promise<Boolean>}
   */


  _createClass(File, [{
    key: "_validateRequiredArgs",
    value: function _validateRequiredArgs(params) {
      return new Promise(function (resolve, reject) {
        try {
          common.validateRequiredArgs(params);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }
    /**
     * Download file from kintone
     * @param {Object} params
     * @param {String} params.fileKey
     * @return {Promise}
     */

  }, {
    key: "download",
    value: function download(_ref2) {
      var fileKey = _ref2.fileKey;

      if (window.kintone !== undefined) {
        this.connection._setLocalHeaders({
          key: 'X-Requested-With',
          value: 'XMLHttpRequest'
        });
      }

      var dataRequest = new FileModel.GetFileRequest(fileKey);
      return this.connection.download(dataRequest.toJSON());
    }
    /**
     * Upload file from local to kintone environment
     * @param {Object} params
     * @param {String} params.fileName
     * @param {Blob} params.fileBlob
     * @return {Promise}
     */

  }, {
    key: "upload",
    value: function upload(_ref3) {
      var _this = this;

      var fileName = _ref3.fileName,
          fileBlob = _ref3.fileBlob;
      return this._validateRequiredArgs({
        fileName: fileName,
        fileBlob: fileBlob
      }).then(function () {
        return _this.connection.upload(fileName, fileBlob);
      });
    }
  }]);

  return File;
}();