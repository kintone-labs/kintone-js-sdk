import Auth from '../../../src/node/authentication/Auth';
import Connection from '../../../src/node/connection/Connection';

describe('Check Connection.setClientCert', () => {
  it('should be called successfully', () => {
    const auth = new Auth();
    const domain = 'MY_DOMAIN';

    const cert = 'MY_CERT_DATA';
    const password = 'MY_PASSWORD';
    auth.setClientCert({cert, password});

    const conn = new Connection({domain, auth});
    expect(conn).toBeInstanceOf(Connection);
  });
});