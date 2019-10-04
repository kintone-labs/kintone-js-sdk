const PACKAGE_FILE = require('../../../../package.json');
const DOMAIN = 'my_domain';
const URI = `https://${DOMAIN}`;
const PASSWORD_AUTH_HEADER = 'X-Cybozu-Authorization';
const USERNAME = 'MY_USERNAME';
const PASSWORD = 'MY_PASSWORD';

const GET_RECORDS_LIMIT = 500;
const UPDATE_RECORDS_LIMIT = 100;

const API_ROUTE = {
  RECORD: `/k/v1/record.json`,
  RECORDS: `/k/v1/records.json`,
  BULK: `/k/v1/bulkRequest.json`
};


const USER_AGENT = `${PACKAGE_FILE.name}/${PACKAGE_FILE.version}`;

export {
  USERNAME,
  PASSWORD,
  URI,
  DOMAIN,
  PASSWORD_AUTH_HEADER,
  GET_RECORDS_LIMIT,
  UPDATE_RECORDS_LIMIT,
  API_ROUTE,
  USER_AGENT
};