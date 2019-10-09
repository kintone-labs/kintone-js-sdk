import "core-js/modules/es.function.name";
import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * AddPreviewAppRequest model
 */
var AddPreviewAppRequest =
/*#__PURE__*/
function () {
  /**
     * constructor for AddPreviewAppRequest
     * @param {String} name
     * @param {Number} space
     * @param {Number} thread
     */
  function AddPreviewAppRequest(name, space, thread) {
    _classCallCheck(this, AddPreviewAppRequest);

    this.name = name;
    this.space = space;
    this.thread = thread;
  }
  /**
     * Get app name
     * @return {String}
     */


  _createClass(AddPreviewAppRequest, [{
    key: "getAppName",
    value: function getAppName() {
      return this.name;
    }
    /**
       * Set app name
       * @param {String} name
       * @return {this} AddPreviewAppRequest
       */

  }, {
    key: "setAppName",
    value: function setAppName(name) {
      this.name = name;
      return this;
    }
    /**
       * Get space of app
       * @return {String}
       */

  }, {
    key: "getSpace",
    value: function getSpace() {
      return this.space;
    }
    /**
       * Set space of app
       * @param {Number} space
       * @return {this} AddPreviewAppRequest
       */

  }, {
    key: "setSpace",
    value: function setSpace(space) {
      this.space = space;
      return this;
    }
    /**
       * Get thread
       * @return {String}
       */

  }, {
    key: "getThread",
    value: function getThread() {
      return this.thread;
    }
    /**
       * Set Thread of app
       * @param {Number} thread
       * @return {this} AddPreviewAppRequest
       */

  }, {
    key: "setThread",
    value: function setThread(thread) {
      this.thread = thread;
      return this;
    }
    /**
       * Get JSON struct of this model
       * @return {JSON}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        name: this.getAppName(),
        space: this.getSpace(),
        thread: this.getThread()
      };
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

  return AddPreviewAppRequest;
}();

export default AddPreviewAppRequest;