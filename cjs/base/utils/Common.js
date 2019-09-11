"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _KintoneAPIException = _interopRequireDefault(require("../exception/KintoneAPIException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * kintone api - nodejs client
 * Common function
 */
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
        throw new _KintoneAPIException.default(err);
      });
    }
  }]);

  return Common;
}();

var _default = new Common();

exports.default = _default;