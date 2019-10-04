import Auth from '../../../src/node/authentication/Auth';

describe('Checking Auth.setClientCert', () => {
  it('should be called successfully', () => {
    const auth = new Auth();
    const cert = 'MY_CERT_DATA';
    const password = 'MY_PASSWORD';

    const result = auth.setClientCert({cert, password});
    expect(result).toBeInstanceOf(Auth);
    const certPassword = result.getPassWordCert();
    expect(certPassword).toEqual(password);
  });
});