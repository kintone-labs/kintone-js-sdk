function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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