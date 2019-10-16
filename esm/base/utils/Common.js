import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * kintone api - nodejs client
 * Common function
 */
import KintoneAPIException from '../exception/KintoneAPIException';

var Common =
/*#__PURE__*/
function () {
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
        throw new KintoneAPIException(err);
      });
    }
  }]);

  return Common;
}();

export default new Common();