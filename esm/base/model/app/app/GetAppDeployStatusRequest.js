import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetAppDeployStatusRequest model
 */
var GetAppDeployStatusRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Array} apps
     */
  function GetAppDeployStatusRequest(apps) {
    _classCallCheck(this, GetAppDeployStatusRequest);

    this.apps = apps;
  }
  /**
   * Get apps
   * @return {Array}
   */


  _createClass(GetAppDeployStatusRequest, [{
    key: "getApps",
    value: function getApps() {
      return this.apps;
    }
    /**
       * @param {Array} apps
       * @return {this}
       */

  }, {
    key: "setApps",
    value: function setApps(apps) {
      this.apps = apps;
      return this;
    }
    /**
       * Get JSON struct of this model
       * @return {JSON}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = {
        apps: this.apps
      };
      return data;
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

  return GetAppDeployStatusRequest;
}();

export default GetAppDeployStatusRequest;