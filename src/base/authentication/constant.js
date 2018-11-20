/**
 * kintone api - nodejs client
 * Authentication constants
 */


const constant = function() {
  return {
    HEADER_KEY_AUTH_PASSWORD: 'X-Cybozu-Authorization',
    HEADER_KEY_AUTH_APITOKEN: 'X-Cybozu-API-Token',
    HEADER_KEY_AUTH_BASIC: 'Authorization',
  };
};

module.exports = constant();
