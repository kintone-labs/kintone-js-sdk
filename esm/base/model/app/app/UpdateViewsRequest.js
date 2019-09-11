function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * UpdateViewsRequest model
 */
var UpdateViewsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} app
     * @param {HashTable<String, View>} views
     * @param {Integer} revision
     */
  function UpdateViewsRequest(app, views, revision) {
    _classCallCheck(this, UpdateViewsRequest);

    this.app = app;
    this.views = views;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(UpdateViewsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        app: this.app,
        views: this.views,
        revision: this.revision
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

  return UpdateViewsRequest;
}();

export default UpdateViewsRequest;