import {KintoneAPIException, Connection as BaseConnection} from '../../base/main';

import CONNECTION_CONST from './constant';
import https from 'https';
import FormData from 'form-data';
import tls from 'tls';
import axios from 'axios';
import tunnel from 'tunnel';
/* eslint-disable node/no-extraneous-require */
const CONTENT_TYPE_KEY = 'Content-Type';
const FILE_RESPONSE_TYPE_KEY = 'responseType';
const FILE_RESPONSE_TYPE_VALUE = 'arraybuffer';

class Connection extends BaseConnection {
  /**
     * @param {Object} params
     * @param {String} params.domain
     * @param {Auth} params.auth
     * @param {Number} params.guestSpaceID
     */

  constructor({domain, auth, guestSpaceID} = {}) {
    super({domain, auth, guestSpaceID});
    this._validateRequiredArgs({domain, auth});
    this.setClientCert();
  }

  /**
   * Set certificate for request by data
   * @param {String} proxyHost
   * @param {String} proxyPort
   * @return {this}
   */
  setClientCert() {
    if (!this.auth.getClientCertData()) {
      return;
    }
    const httpsAgent = new https.Agent({
      pfx: this.auth.getClientCertData(),
      passphrase: this.auth.getPassWordCert()
    });
    this.addRequestOption({key: CONNECTION_CONST.BASE.HTTPS_AGENT, value: httpsAgent});
  }

  /**
   * Set http proxy for request
   * @param {Object} params
   * @param {String} params.proxyHost
   * @param {String} params.proxyPort
   * @param {String} params.proxyUsername
   * @param {String} params.proxyPassword
   * @return {this}
   */
  setProxy({proxyHost, proxyPort, proxyUsername, proxyPassword} = {proxyHost, proxyPort}) {
    this._validateRequiredArgs({proxyHost, proxyPort});
    const option = {
      proxy: {host: proxyHost, port: proxyPort}
    };
    if (proxyUsername && proxyPassword) {
      option.proxy.proxyAuth = `${proxyUsername}:${proxyPassword}`;
    }
    if (this.auth.getClientCertData()) {
      option.pfx = this.auth.getClientCertData();
      option.passphrase = this.auth.getPassWordCert();
    }
    const httpsAgent = tunnel.httpsOverHttp(option);
    this.addRequestOption({key: CONNECTION_CONST.BASE.HTTPS_AGENT, value: httpsAgent});
    return this;
  }

  /**
   * Set https proxy for request
   * @param {Object} params
   * @param {String} params.proxyHost
   * @param {String} params.proxyPort
   * @param {String} params.proxyUsername
   * @param {String} params.proxyPassword
   * @return {this}
   */
  setHttpsProxy({proxyHost, proxyPort, proxyUsername, proxyPassword} = {proxyHost, proxyPort}) {
    this._validateRequiredArgs({proxyHost, proxyPort});
    const option = {
      proxy: {host: proxyHost, port: proxyPort}
    };
    if (proxyUsername && proxyPassword) {
      option.proxy.proxyAuth = `${proxyUsername}:${proxyPassword}`;
    }
    if (this.auth.getClientCertData()) {
      option.pfx = this.auth.getClientCertData();
      option.passphrase = this.auth.getPassWordCert();
    }
    const httpsAgent = tunnel.httpsOverHttps(option);
    this.addRequestOption({key: CONNECTION_CONST.BASE.HTTPS_AGENT, value: httpsAgent});
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
    this._setLocalHeaders({key: CONTENT_TYPE_KEY, value: formData.getHeaders()['content-type']});
    return this.requestFile('POST', 'FILE', formData);
  }

  /**
   * Download file from kintone
   * @param {String} body
   * @return {Promise}
   */
  download(body) {
    return this.requestFile('GET', 'FILE', body);
  }

  /**
   * request to URL
   * @param {String} methodName
   * @param {String} restAPIName
   * @param {Object} body
   * @return {Promise}
   */
  request(methodName, restAPIName, body) {
    const requestOptions = this.getRequestOptions(methodName, restAPIName, body);

    return this._handleSecureContextError(requestOptions).then(() => {
    // Execute request
      return axios(requestOptions);
    }).then(response => {
      return response.data;
    }).catch(err => {
      throw new KintoneAPIException(err);
    });
  }
  /**
   * request to URL
   * @param {String} methodName
   * @param {String} restAPIName
   * @param {String} body
   * @return {Promise}
   */
  requestFile(methodName, restAPIName, body) {
    // Set Header
    const headersRequest = this.getRequestHeader();

    // Set request options
    const requestOptions = Object.assign({}, this.options);
    requestOptions.method = String(methodName).toUpperCase();
    requestOptions.url = this.getURL(restAPIName);
    requestOptions.headers = headersRequest;

    // set data to param if using GET method
    if (requestOptions.method === 'GET') {
      requestOptions.params = body;
      requestOptions[FILE_RESPONSE_TYPE_KEY] = FILE_RESPONSE_TYPE_VALUE;
    } else {
      requestOptions.data = body;
    }

    return this._handleSecureContextError(requestOptions).then(() => {
      // Execute request
      return axios(requestOptions);
    }).then(response => {
      return response.data;
    }).catch(err => {
      throw new KintoneAPIException(err.message, err);
    });
  }

  _handleSecureContextError(requestOptions) {
    if (requestOptions.hasOwnProperty(CONNECTION_CONST.BASE.HTTPS_AGENT)) {
      try {
        tls.createSecureContext(requestOptions.httpsAgent.options);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.resolve(true);
  }
}

export default Connection;
