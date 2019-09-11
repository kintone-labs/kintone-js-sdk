"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * GetGeneralSettingsRequest model
 */
var GetGeneralSettingsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} app
     * @param {String} lang
     */
  function GetGeneralSettingsRequest(app, lang) {
    _classCallCheck(this, GetGeneralSettingsRequest);

    this.app = app;
    this.lang = lang;
  }
  /**
   * Get JSON struct of this model
   * @return {JSON}
   */


  _createClass(GetGeneralSettingsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        app: this.app,
        lang: this.lang
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

  return GetGeneralSettingsRequest;
}();

var _default = GetGeneralSettingsRequest;
exports.default = _default;