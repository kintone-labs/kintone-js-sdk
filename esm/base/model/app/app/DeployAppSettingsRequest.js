import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * DeployAppSettingsRequest model
 */
var DeployAppSettingsRequest =
/*#__PURE__*/
function () {
  /**
     * constructor for DeployAppSettingsRequest
     * @param {Array} apps
     * @param {Boolean} revert
     */
  function DeployAppSettingsRequest(apps, revert) {
    _classCallCheck(this, DeployAppSettingsRequest);

    this.apps = apps;
    this.revert = revert;
  }
  /**
     * Get apps
     * @return {Array}
     */


  _createClass(DeployAppSettingsRequest, [{
    key: "getApps",
    value: function getApps() {
      return this.apps;
    }
    /**
       * @param {Array} apps
       * @return {this} DeployAppSettingsRequest
       */

  }, {
    key: "setApps",
    value: function setApps(apps) {
      this.apps = apps;
      return this;
    }
    /**
       * Get reviert
       * @return {Boolean}
       */

  }, {
    key: "getRevert",
    value: function getRevert() {
      return this.revert;
    }
    /**
       * @param {Boolean} revert
       * @return {this} DeployAppSettingsRequest
       */

  }, {
    key: "setRevert",
    value: function setRevert(revert) {
      this.revert = revert;
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
        apps: this.getApps(),
        revert: this.getRevert()
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

  return DeployAppSettingsRequest;
}();

export default DeployAppSettingsRequest;