/* eslint-disable node/no-extraneous-require */
const tunnel = require('tunnel');
const FormData = require('form-data');

const CONNECTION_CONST = require('./constant');
const packageFile = require('../../../package.json');
const BaseConnection = require('../../base/main').Connection;

const CONTENT_TYPE_KEY = 'Content-Type';

class Connection extends BaseConnection {
  /**
     * @param {String} domain
     * @param {Auth} auth
     * @param {Number} guestSpaceID
     */

  constructor(domain, auth, guestSpaceID) {
    super(domain, auth, guestSpaceID);
    this.domain = domain;
    this.guestSpaceID = parseInt(guestSpaceID, 10);

    this.headers = [];
    this.options = {};

    this.setAuth(auth);
    this.addRequestOption(CONNECTION_CONST.BASE.PROXY, false);

    // set default user-agent
    this.setHeader(
      CONNECTION_CONST.BASE.USER_AGENT,
      CONNECTION_CONST.BASE.USER_AGENT_BASE_VALUE
        .replace('{name}',
          packageFile.name || 'kintone-nodejs-sdk')
        .replace('{version}', packageFile.version || '(none)')
    );

  }

  /**
   * Set proxy for request
   * @param {String} proxyHost
   * @param {String} proxyPort
   * @param {String} proxyUsername
   * @param {String} proxyPassword
   * @return {this}
   */
  setProxy(proxyHost, proxyPort, proxyUsername, proxyPassword) {
    const proxy = {host: proxyHost, port: proxyPort};
    if (proxyUsername && proxyPassword) {
      proxy.proxyAuth = `${proxyUsername}:${proxyPassword}`;
    }
    const httpsAgent = tunnel.httpsOverHttp({ proxy });
    this.addRequestOption(CONNECTION_CONST.BASE.HTTPS_AGENT, httpsAgent);
    return this;
  }

  /**
   * upload file to kintone
   * @param {String} fileName
   * @param {String} fileContent
   * @return {Promise}
   */
  upload(fileName, fileContent) {
    const formData = new FormData();
    formData.append('file', fileContent, fileName);

    this.setHeader(CONTENT_TYPE_KEY, formData.getHeaders()['content-type']);
    return this.requestFile('POST', 'FILE', formData);
  }
}
module.exports = Connection;