"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * DeleteRecordsRequest model
 */
var DeleteRecordsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {String} appID
     */
  function DeleteRecordsRequest(appID) {
    _classCallCheck(this, DeleteRecordsRequest);

    this.app = appID;
  }
  /**
     * set the ids to be deleted
     * @param {Array<Integer>} idsInput
     * @return {this}
     */


  _createClass(DeleteRecordsRequest, [{
    key: "setIDs",
    value: function setIDs(ids) {
      this.ids = ids;
      return this;
    }
    /**
       * set ids with revision
       * @param {HashTable<id, revision>} idsWithRevision
       * @return {this}
       */

  }, {
    key: "setIDsWithRevision",
    value: function setIDsWithRevision(idsWithRevision) {
      this.idsWithRevision = idsWithRevision;
      return this;
    }
    /**
       * Get JSON struct of this model
       * @return {JSON}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = {
        app: this.app
      };

      if (this.ids) {
        data.ids = this.ids;
      } else {
        var idsRequest = [];
        var revisions = [];
        var idsWithRevisionInput = this.idsWithRevision;

        for (var id in idsWithRevisionInput) {
          if (!idsWithRevisionInput.hasOwnProperty(id)) {
            continue;
          }

          idsRequest.push(id);
          revisions.push(idsWithRevisionInput[id]);
        }

        data.ids = idsRequest;
        data.revisions = revisions;
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

  return DeleteRecordsRequest;
}();

var _default = DeleteRecordsRequest;
exports.default = _default;