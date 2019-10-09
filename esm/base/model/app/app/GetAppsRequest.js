import "core-js/modules/es.function.name";
import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetAppsRequest model
 */
var GetAppsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {String} offset
     * @param {String} limit
     */
  function GetAppsRequest(offset, limit) {
    _classCallCheck(this, GetAppsRequest);

    this.offset = offset;
    this.limit = limit;
  }
  /**
     * Set app ids
     * @param {Array} appIDs
     * @return {this}
     */


  _createClass(GetAppsRequest, [{
    key: "setAppIDs",
    value: function setAppIDs(appIDs) {
      this.appIDs = appIDs;
      return this;
    }
    /**
       * Set app codes
       * @param {Array} appCodes
       * @return {this}
       */

  }, {
    key: "setAppCodes",
    value: function setAppCodes(appCodes) {
      this.appCodes = appCodes;
      return this;
    }
    /**
       * Set app name
       * @param {Array} appName
       * @return {this}
       */

  }, {
    key: "setAppName",
    value: function setAppName(appName) {
      this.appName = appName;
      return this;
    }
    /**
       * Set app space ids
       * @param {Array} appSpaceIDs
       * @return {this}
       */

  }, {
    key: "setAppSpaceIDs",
    value: function setAppSpaceIDs(appSpaceIDs) {
      this.appSpaceIDs = appSpaceIDs;
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
        offset: this.offset,
        limit: this.limit
      };

      if (this.appIDs) {
        data.ids = this.appIDs;
      }

      if (this.appCodes) {
        data.codes = this.appCodes;
      }

      if (this.appName) {
        data.name = this.appName;
      }

      if (this.appSpaceIDs) {
        data.spaceIds = this.appSpaceIDs;
      }

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

  return GetAppsRequest;
}();

export default GetAppsRequest;