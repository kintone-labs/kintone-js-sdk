const BULK_REQUEST_API_ROUTE = `/k/v1/bulkRequest.json`;
const RECORD_API_ROUTE = '/k/v1/record.json';
const RECORDS_API_ROUTE = '/k/v1/records.json';
const ASSIGNEES_API_ROUTE = '/k/v1/record/assignees.json';
const STATUS_API_ROUTE = '/k/v1/record/status.json';

const DOMAIN = 'my_domain';
const URI = `https://${DOMAIN}`;
const PASSWORD_AUTH_HEADER = 'X-Cybozu-Authorization';
const USERNAME = 'MY_USERNAME';
const PASSWORD = 'MY_PASSWORD';

export {
  BULK_REQUEST_API_ROUTE,
  RECORD_API_ROUTE,
  RECORDS_API_ROUTE,
  ASSIGNEES_API_ROUTE,
  STATUS_API_ROUTE,
  DOMAIN,
  URI,
  PASSWORD_AUTH_HEADER,
  USERNAME,
  PASSWORD
};