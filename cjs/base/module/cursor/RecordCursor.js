"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _KintoneAPIException = _interopRequireDefault(require("../../model/exception/KintoneAPIException"));

var _CursorModels = _interopRequireDefault(require("../../model/cursor/CursorModels"));

var _Common = _interopRequireDefault(require("../../utils/Common"));

var _Connection = _interopRequireDefault(require("../../connection/Connection"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * RecordCursor module
 */
var RecordCursor =
/*#__PURE__*/
function () {
  /**
   * The constructor for RecordCursor module
   * @param {Object} params
   * @param {Connection} params.connection
   */
  function RecordCursor() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        connection = _ref.connection;

    _classCallCheck(this, RecordCursor);

    if (!(connection instanceof _Connection.default)) {
      throw new Error("".concat(connection, " not an instance of Connection"));
    }

    this.connection = connection;
    Promise.resolve().finally();
  }
  /**
   * @param {Object} params
   * @param {String} params.method
   * @param {String} params.url
   * @param {RecordModel} params.model
   * @return {Promise} Promise
   */


  _createClass(RecordCursor, [{
    key: "sendRequest",
    value: function sendRequest(_ref2) {
      var method = _ref2.method,
          url = _ref2.url,
          model = _ref2.model;
      return _Common.default.sendRequest(method, url, model, this.connection);
    }
    /**
     * Create a new record cursor
     * @param {Object} params
     * @param {Integer} params.app
     * @param {Array<String>} fields
     * @param {String} params.query
     * @param {Integer} params.size
     * @return {Promise}
     */

  }, {
    key: "createCursor",
    value: function createCursor() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref3.app,
          fields = _ref3.fields,
          query = _ref3.query,
          size = _ref3.size;

      var createCursorRequest = new _CursorModels.default.CreateRecordCursorRequest({
        app: app,
        fields: fields,
        query: query,
        size: size
      });
      return this.sendRequest({
        method: 'POST',
        url: 'RECORD_CURSOR',
        model: createCursorRequest
      });
    }
    /**
     * Get 1 block of records
     * @param {Object} params
     * @param {String} params.id cursor id
     * @return {Promise}
     */

  }, {
    key: "getRecords",
    value: function getRecords(_ref4) {
      var id = _ref4.id;
      var getRecordCursorRequest = new _CursorModels.default.GetRecordCursorRequest(id);
      return this.sendRequest({
        method: 'GET',
        url: 'RECORD_CURSOR',
        model: getRecordCursorRequest
      });
    }
    /**
     * Get all records
     * @param {Object} params
     * @param {String} params.id cursor id
     * @return {Promise}
     */

  }, {
    key: "getAllRecords",
    value: function () {
      var _getAllRecords = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref5,
            id,
            next,
            allRecords,
            recordBlockResponse,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref5 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, id = _ref5.id;
                next = true;
                allRecords = [];

              case 3:
                if (!next) {
                  _context.next = 17;
                  break;
                }

                _context.prev = 4;
                _context.next = 7;
                return this.getRecords({
                  id: id
                });

              case 7:
                recordBlockResponse = _context.sent;

                if (!(recordBlockResponse instanceof _KintoneAPIException.default)) {
                  allRecords = allRecords.concat(recordBlockResponse.records);
                  next = recordBlockResponse.next;
                } else {
                  next = false;
                }

                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                next = false;
                throw _context.t0;

              case 15:
                _context.next = 3;
                break;

              case 17:
                return _context.abrupt("return", {
                  records: allRecords,
                  totalCount: allRecords.length
                });

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 11]]);
      }));

      function getAllRecords() {
        return _getAllRecords.apply(this, arguments);
      }

      return getAllRecords;
    }()
    /**
     * Delete cursor
     * @param {Object} params
     * @param {String} params.id
     * @return {Promise}
     */

  }, {
    key: "deleteCursor",
    value: function deleteCursor() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          id = _ref6.id;

      var deleteRecordCursorRequest = new _CursorModels.default.DeleteRecordCursorRequest(id);
      return this.sendRequest({
        method: 'DELETE',
        url: 'RECORD_CURSOR',
        model: deleteRecordCursorRequest
      });
    }
  }]);

  return RecordCursor;
}();

var _default = RecordCursor;
exports.default = _default;