/**
 * kintone api - nodejs client
 * Authentication constants
 */
var constant = function constant() {
  return {
    HEADER_KEY_AUTH_PASSWORD: 'X-Cybozu-Authorization',
    HEADER_KEY_AUTH_APITOKEN: 'X-Cybozu-API-Token',
    HEADER_KEY_AUTH_BASIC: 'Authorization'
  };
};

export default constant();