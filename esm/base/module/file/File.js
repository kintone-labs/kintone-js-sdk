import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import FileModel from "../../model/file/FileModels";
import Connection from "../../connection/Connection";
/**
 * File module
 */

var File =
/*#__PURE__*/
function () {
  /**
   * The constructor for this module
   * @param {Object} params
   * @param {Connection} params.connection
   */
  function File() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        connection = _ref.connection;

    _classCallCheck(this, File);

    if (!(connection instanceof Connection)) {
      throw new Error("".concat(connection, " not an instance of Connection"));
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
      var dataRequest = new FileModel.GetFileRequest(fileKey);
      return this.connection.download(dataRequest.toJSON());
    }
    /**
     * upload file to kintone
     * @param {Object} params
     * @param {String} params.fileName
     * @param {String} params.fileContent
     * @return {Promise}
     */

  }, {
    key: "upload",
    value: function upload(_ref3) {
      var fileName = _ref3.fileName,
          fileContent = _ref3.fileContent;
      return this.connection.upload(fileName, fileContent);
    }
  }]);

  return File;
}();

export default File;