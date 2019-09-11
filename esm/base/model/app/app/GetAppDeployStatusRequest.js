function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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