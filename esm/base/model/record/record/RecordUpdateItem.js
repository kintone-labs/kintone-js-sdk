function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import RecordUpdateKey from "./RecordUpdateKey";
/**
 * RecordUpdateItem model
 */

var RecordUpdateItem =
/*#__PURE__*/
function () {
  /**
     * constructor
     */
  function RecordUpdateItem() {
    _classCallCheck(this, RecordUpdateItem);

    this.id = null;
    this.revision = null;
    this.updateKey = null;
    this.record = null;
  }
  /**
     * set ID of record to update
     * @param {String} id
     * @return {this}
     */


  _createClass(RecordUpdateItem, [{
    key: "setID",
    value: function setID(id) {
      this.id = id;
      return this;
    }
    /**
       * set revision of record to update
       * @param {String} revision
       * @return {this}
       */

  }, {
    key: "setRevision",
    value: function setRevision(revision) {
      this.revision = revision;
      return this;
    }
    /**
       * set updateKey to update record
       * @param {String} field
       * @param {String} value
       * @return {this}
       */

  }, {
    key: "setUpdateKey",
    value: function setUpdateKey(field, value) {
      this.updateKey = new RecordUpdateKey(field, value);
      return this;
    }
    /**
       * set record data to update
       * @param {String} record
       * @return {this}
       */

  }, {
    key: "setRecord",
    value: function setRecord(record) {
      this.record = record;
      return this;
    }
    /**
       * Get JSON struct of this model
       * @return {Object}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var updateKeyPriv = this.updateKey;
      var data = {
        revision: this.revision || null,
        record: this.record
      };

      if (updateKeyPriv) {
        data.updateKey = updateKeyPriv.toJSON();
      } else {
        data.id = this.id;
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

  return RecordUpdateItem;
}();

export default RecordUpdateItem;