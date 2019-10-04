import KintoneAPIException from '../exception/KintoneAPIException';
/**
 * kintone api - nodejs client
 * Common function
 */

class Common {
  /**
   * @param {String} method
   * @param {String} url
   * @param {RecordModel} model
   * @param {Connection} connection
   * @return {Promise} Promise
   */
  sendRequest(method, url, model, connection) {
    const body = model.toJSON ? model.toJSON() : model;
    return connection.request(method, url, body)
      .then((result) => {
        return result;
      }).catch((err) => {
        throw new KintoneAPIException(err);
      });
  }

  /**
   * check required arguments
   *
   * @param {Object} params
   * @returns {Boolean}
   */
  validateRequiredArgs(params) {
    Object.keys(params).forEach((key) => {
      if (params[key] === undefined || params[key] === null) {
        throw new KintoneAPIException(`${key} is a required argument.`);
      }
    });
    return true;
  }
}

export default new Common();
