import AUTH_CONST from '../../../src/base/authentication/constant';
import Auth from '../../../src/base/authentication/Auth';
import KintoneCredential from '../../../src/base/model/authentication/Credential';
import KintoneHTTPHeader from '../../../src/base/model/http/HTTPHeader';

describe('Checking Auth object', () => {
  it('Can create new instance of Auth', () => {
    const auth = new Auth();
    expect(auth.basicAuth).toEqual(null);
    expect(auth.passwordAuth).toEqual(null);
    expect(auth.apiToken).toEqual(null);
  });

  it('Can set/get basic authenticaion', () => {
    const auth = new Auth();

    const username = 'MY_USERNAME';
    const password = 'MY_PASSWORD';
    auth.setBasicAuth({username, password});

    const credential = auth.getBasicAuth();

    expect(credential).toBeInstanceOf(KintoneCredential);
    expect(credential.getUsername()).toEqual(username);
    expect(credential.getPassword()).toEqual(password);
  });

  it('Can set/get password authenticaion', () => {
    const auth = new Auth();

    const username = 'MY_USERNAME';
    const password = 'MY_PASSWORD';
    auth.setPasswordAuth({username, password});

    const credential = auth.getPasswordAuth();

    expect(credential).toBeInstanceOf(KintoneCredential);
    expect(credential.getUsername()).toEqual(username);
    expect(credential.getPassword()).toEqual(password);
  });

  it('Can set/get password authenticaion', () => {
    const auth = new Auth();

    const appAPIToken = 'APP_API_TOKEN';
    auth.setApiToken({apiToken: appAPIToken});

    const apiToken = auth.getApiToken();

    expect(apiToken).toEqual(appAPIToken);
  });

  it('Can create header creadentials with basic authenticaion', () => {
    const auth = new Auth();

    const username = 'MY_USERNAME';
    const password = 'MY_PASSWORD';
    auth.setBasicAuth({username, password});

    const headers = auth.createHeaderCredentials();

    expect(headers[0]).toBeInstanceOf(KintoneHTTPHeader);
    expect(headers[0].key).toEqual(AUTH_CONST.HEADER_KEY_AUTH_BASIC);
    expect(headers[0].value).toEqual('Basic TVlfVVNFUk5BTUU6TVlfUEFTU1dPUkQ=');
  });

  it('Can create header creadentials with password authenticaion', () => {
    const auth = new Auth();

    const username = 'MY_USERNAME';
    const password = 'MY_PASSWORD';
    auth.setPasswordAuth({username, password});

    const headers = auth.createHeaderCredentials();

    expect(headers[0]).toBeInstanceOf(KintoneHTTPHeader);
    expect(headers[0].key).toEqual(AUTH_CONST.HEADER_KEY_AUTH_PASSWORD);
    expect(headers[0].value).toEqual('TVlfVVNFUk5BTUU6TVlfUEFTU1dPUkQ=');
  });

  it('Can create header creadentials with api token', () => {
    const auth = new Auth();

    const appAPIToken = 'APP_API_TOKEN';
    auth.setApiToken({apiToken: appAPIToken});

    const headers = auth.createHeaderCredentials();

    expect(headers[0]).toBeInstanceOf(KintoneHTTPHeader);
    expect(headers[0].key).toEqual(AUTH_CONST.HEADER_KEY_AUTH_APITOKEN);
    expect(headers[0].value).toEqual(appAPIToken);
  });
});