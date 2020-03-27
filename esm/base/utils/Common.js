import "core-js/modules/es.array.for-each";
import "core-js/modules/es.object.keys";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import KintoneAPIException from '../exception/KintoneAPIException';
/**
 * Common function
 */

var Common = /*#__PURE__*/function () {
  function Common() {
    _classCallCheck(this, Common);
  }

  _createClass(Common, [{
    key: "sendRequest",

    /**
     * @param {String} method
     * @param {String} url
     * @param {RecordModel} model
     * @param {Connection} connection
     * @return {Promise} Promise
     */
    value: function sendRequest(method, url, model, connection) {
      var body = model.toJSON ? model.toJSON() : model;
      return connection.request(method, url, body).then(function (result) {
        return result;
      }).catch(function (err) {
        throw new KintoneAPIException(err.message, err);
      });
    }
    /**
     * check required arguments
     *
     * @param {Object} params
     * @returns {Boolean}
     */

  }, {
    key: "validateRequiredArgs",
    value: function validateRequiredArgs(params) {
      Object.keys(params).forEach(function (key) {
        if (params[key] === undefined || params[key] === null) {
          throw new KintoneAPIException("".concat(key, " is a required argument."));
        }
      });
      return true;
    }
  }]);

  return Common;
}();

export default new Common();