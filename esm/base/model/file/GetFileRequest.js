import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetFileRequest model
 */
var GetFileRequest =
/*#__PURE__*/
function () {
  /**
     * @param {String} fileKey
     */
  function GetFileRequest(fileKey) {
    _classCallCheck(this, GetFileRequest);

    this.fileKey = fileKey;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(GetFileRequest, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        fileKey: this.fileKey
      };
    }
    /**
       * Convert this model to JSON string
       * @return {String}
       */

  }, {
    key: "toJSONString",
    value: function toJSONString() {
      return JSON.stringify(this.toJSON());
    }
  }]);

  return GetFileRequest;
}();

export default GetFileRequest;