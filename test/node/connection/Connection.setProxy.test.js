import Auth from '../../../src/node/authentication/Auth';
import Connection from '../../../src/node/connection/Connection';

const PROXY_HOST = 'your_proxy';
const PROXY_PORT = 'your_proxy_port';
const PROXY_AUTH_USER = 'your_proxy_username';
const PROXY_AUTH_PASS = 'your_prxy_password';

describe('Check Connection.setProxy', () => {
  it('should return a connection when "setProxy" function is called', () => {
    const auth = new Auth();
    const domain = 'MY_DOMAIN';

    const conn = new Connection({domain, auth});
    expect(conn.setProxy({proxyHost: PROXY_HOST, proxyPort: PROXY_PORT})).toBeInstanceOf(Connection);
  });

  it('should return a connection when "setProxy" function is called with username and password', () => {
    const auth = new Auth();
    const domain = 'MY_DOMAIN';

    const conn = new Connection({domain, auth});
    const result = conn.setProxy({proxyHost: PROXY_HOST, proxyPort: PROXY_PORT, proxyUsername: PROXY_AUTH_USER, proxyPassword: PROXY_AUTH_PASS});
    expect(result).toBeInstanceOf(Connection);
  });

  it('should be called successfully with cert', () => {
    const auth = new Auth();
    const domain = 'MY_DOMAIN';

    const cert = 'MY_CERT_DATA';
    const password = 'MY_PASSWORD';
    auth.setClientCert({cert, password});

    const conn = new Connection({domain, auth});
    const result = conn.setProxy({proxyHost: PROXY_HOST, proxyPort: PROXY_PORT, proxyUsername: PROXY_AUTH_USER, proxyPassword: PROXY_AUTH_PASS});
    expect(result).toBeInstanceOf(Connection);
  });
});