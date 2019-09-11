function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * GetAppRequest model
 */
var GetAppRequest =
/*#__PURE__*/
function () {
  /**
     * @param {String} appID
     */
  function GetAppRequest(appID) {
    _classCallCheck(this, GetAppRequest);

    this.appID = appID;
  }
  /**
   * Get apps
   * @return {Array}
   */


  _createClass(GetAppRequest, [{
    key: "getAppID",
    value: function getAppID() {
      return this.appID;
    }
    /**
       * @param {Number} appID
       * @return {this}
       */

  }, {
    key: "setAppID",
    value: function setAppID(appID) {
      this.appID = appID;
      return this;
    }
    /**
       * Get JSON struct of this model
       * @return {JSON}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        id: this.appID
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

  return GetAppRequest;
}();

export default GetAppRequest;