"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * UpdateGeneralSettingsRequest model
 */
var UpdateGeneralSettingsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} app
     * @param {GeneralSettings } generalSettings
     * @param {Integer} revision
     */
  function UpdateGeneralSettingsRequest() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UpdateGeneralSettingsRequest);

    this.params = params;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(UpdateGeneralSettingsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      return this.params;
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

  return UpdateGeneralSettingsRequest;
}();

var _default = UpdateGeneralSettingsRequest;
exports.default = _default;