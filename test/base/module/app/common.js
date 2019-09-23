import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import App from '../../../../src/base/module/app/App';

const URI = 'https://my_domain';
const PASSWORD_AURH_HEADER = 'X-Cybozu-Authorization';
const MY_USERNAME = 'MY_USERNAME';
const MY_PASSWORD = 'MY_PASSWORD';

const createPasswordAuthToCheck = () => {
  return Buffer.from(`${MY_USERNAME}:${MY_PASSWORD}`).toString('base64');
};

const createAppToSendRequest = () => {
  const auth = new Auth().setPasswordAuth({username: MY_USERNAME, password: MY_PASSWORD});
  const conn = new Connection({domain: 'my_domain', auth: auth});
  return new App({connection: conn});
};

export {
  URI,
  PASSWORD_AURH_HEADER,
  MY_USERNAME,
  MY_PASSWORD,
  createPasswordAuthToCheck,
  createAppToSendRequest
};