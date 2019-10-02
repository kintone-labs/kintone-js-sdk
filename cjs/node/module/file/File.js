"use strict";

/**
 * kintone api - nodejs client
 * File module
 */
'use-strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = require("../../../base/main");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * File module for NodeJS
 */
var File =
/*#__PURE__*/
function (_FileModule) {
  _inherits(File, _FileModule);

  /**
     * The constructor for this module
     * @param {Object} params
     * @param {Connection} params.connection
     */
  function File() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        connection = _ref.connection;

    _classCallCheck(this, File);

    if (!(connection instanceof _main.Connection)) {
      throw new Error("".concat(connection) + "not an instance of kintoneConnection");
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(File).call(this, {
      connection: connection
    }));
  }
  /**
     * Download file from kintone
     * @param {Object} params
     * @param {String} params.fileKey
     * @param {String} params.outPutFilePath
     * @return {Promise}
     */


  _createClass(File, [{
    key: "download",
    value: function download(_ref2) {
      var fileKey = _ref2.fileKey,
          outPutFilePath = _ref2.outPutFilePath;
      return _get(_getPrototypeOf(File.prototype), "download", this).call(this, {
        fileKey: fileKey
      }).then(function (fileContent) {
        try {
          var options = {
            encoding: 'utf16le'
          };

          _fs.default.writeFileSync(outPutFilePath, fileContent, options);
        } catch (err) {
          throw new _main.KintoneAPIException(err);
        }
      });
    }
    /**
       * Upload file from local to kintone environment
       * @param {Object} params
       * @param {String} params.filePath
       * @param {String} params.fileName
       * @param {String} params.fileContent
       * @return {Promise}
       */

  }, {
    key: "upload",
    value: function upload() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          filePath = _ref3.filePath,
          fileName = _ref3.fileName,
          fileContent = _ref3.fileContent;

      var validFilecontent = fileContent;
      var validFilename = fileName;

      if (filePath) {
        validFilecontent = _fs.default.createReadStream(filePath);
        validFilename = _path.default.basename(filePath);
      }

      return _get(_getPrototypeOf(File.prototype), "upload", this).call(this, {
        fileName: validFilename,
        fileContent: validFilecontent
      });
    }
  }]);

  return File;
}(_main.File);

var _default = File;
exports.default = _default;