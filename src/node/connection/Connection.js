const CONNECTION_CONST = require('./constant');

const packageFile = require('../../../package.json');
const BaseConnection = require('../../base/main').Connection;

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
}
module.exports = Connection;