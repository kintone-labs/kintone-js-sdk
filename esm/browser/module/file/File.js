function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * kintone api - js client
 */
import { Connection } from '../connection/Connection';
/**
 * File module
 */

import FileModel from '../../../base/model/file/FileModels';
export var File =
/*#__PURE__*/
function () {
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
      throw new Error("".concat(connection) + "not an instance of kintoneConnection");
    }

    this.connection = connection;
  }
  /**
     * Download file from kintone
     * @param {Object} params
     * @param {String} params.fileKey
     * @return {Promise}
     */


  _createClass(File, [{
    key: "download",
    value: function download(_ref2) {
      var fileKey = _ref2.fileKey;

      if (window.kintone !== undefined) {
        this.connection.setHeader({
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
      var fileName = _ref3.fileName,
          fileBlob = _ref3.fileBlob;
      return this.connection.upload(fileName, fileBlob);
    }
  }]);

  return File;
}();