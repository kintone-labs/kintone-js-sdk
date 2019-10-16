import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetRecordRequest model
 */
var GetRecordRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} appID
     * @param {Integer} recordID
     */
  function GetRecordRequest(appID, recordID) {
    _classCallCheck(this, GetRecordRequest);

    this.app = appID;
    this.id = recordID;
  }
  /**
     * @return {Integer}
     */


  _createClass(GetRecordRequest, [{
    key: "getRecordID",
    value: function getRecordID() {
      return this.id;
    }
    /**
       * @return {Integer}
       */

  }, {
    key: "getAppID",
    value: function getAppID() {
      return this.app;
    }
    /**
       * @return {Object}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        app: this.getAppID(),
        id: this.getRecordID()
      };
    }
    /**
       * @return {String}
       */

  }, {
    key: "toJSONString",
    value: function toJSONString() {
      return JSON.stringify(this.toJSON());
    }
  }]);

  return GetRecordRequest;
}();

export default GetRecordRequest;