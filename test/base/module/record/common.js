const DOMAIN = 'my_domain';
const URI = `https://${DOMAIN}`;
const PASSWORD_AUTH_HEADER = 'X-Cybozu-Authorization';
const USERNAME = 'MY_USERNAME';
const PASSWORD = 'MY_PASSWORD';

const getPasswordAuth = (userName, password) => {
  return Buffer.from(userName + ':' + password).toString('base64');
};

const GET_RECORDS_LIMIT = 500;
const UPDATE_RECORDS_LIMIT = 100;

export {
  USERNAME,
  PASSWORD,
  URI,
  DOMAIN,
  PASSWORD_AUTH_HEADER,
  GET_RECORDS_LIMIT,
  UPDATE_RECORDS_LIMIT,
  getPasswordAuth
};