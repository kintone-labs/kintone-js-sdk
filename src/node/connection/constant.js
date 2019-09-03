/**
 * kintone api - nodejs client
 * Connection constants
 */

const constant = function() {
  return {
    BASE: {
      SCHEMA: 'https',
      PROXY: 'proxy',
      BASE_URL: '/k/v1/{API_NAME}.json',
      BASE_GUEST_URL: '/k/guest/{GUEST_SPACE_ID}/v1/{API_NAME}.json',
      PREFIX_API_NAME: '{API_NAME}',
      PREFIX_GUESTSPACEID: '{GUEST_SPACE_ID}',
      USER_AGENT: 'User-Agent',
      USER_AGENT_BASE_VALUE: '{name}/{version}',
      HTTPS_AGENT: 'httpsAgent',
      X_HTTP_METHOD_OVERRIDE: 'X-HTTP-Method-Override',
      LIMIT_REQUEST_URI_CHARACTER: 4096
    }
  };
};

export default constant();
