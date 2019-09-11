function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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