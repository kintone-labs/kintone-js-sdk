function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * GetFormFieldsRequest model
 */
var GetFormFieldsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} appID
     * @param {String} lang
     */
  function GetFormFieldsRequest(appID, lang) {
    _classCallCheck(this, GetFormFieldsRequest);

    this.appID = appID;
    this.lang = lang;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(GetFormFieldsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        app: this.appID
      };

      if (this.lang) {
        data.lang = this.lang;
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

  return GetFormFieldsRequest;
}();

export default GetFormFieldsRequest;