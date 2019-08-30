/**
 * Constants
 */
const COMMON = require('./common.js');
const PACKAGE_FILE = require('../../package');
const URI = 'https://' + COMMON.DOMAIN;
const API_ROUTE = {
  RECORD: `/k/v1/record.json`,
  RECORD_GET: `/k/v1/record.json`,
  RECORD_GET_TEST: `/k/v1/test`,
  GUEST_RECORD: `/k/guest/${COMMON.GUEST_SPACEID}/v1/record.json`,
  RECORDS: `/k/v1/records.json`,
  GUEST_RECORDS: `/k/guest/${COMMON.GUEST_SPACEID}/v1/records.json`,
  APP: `/k/v1/app.json`,
  FILE: `/k/v1/file.json`,
  GUEST_APP: `/k/guest/${COMMON.GUEST_SPACEID}/v1/app.json`,
  APPS: `/k/v1/apps.json`,
  GUEST_APPS: `/k/guest/${COMMON.GUEST_SPACEID}/v1/apps.json`,
  BULK_REQUEST: `/k/v1/bulkRequest.json`,
  GUEST_BULK_REQUEST: `/k/guest/${COMMON.GUEST_SPACEID}/v1/bulkRequest.json`,
  USER_AGENT: `${PACKAGE_FILE.name}/${PACKAGE_FILE.version}`,
  GET_RECORDS_LIMIT: 500,
  UPDATE_RECORDS_LIMIT: 100,
  BULK_REQUEST_LIMIT: 20
};

module.exports = {API_ROUTE, URI};
