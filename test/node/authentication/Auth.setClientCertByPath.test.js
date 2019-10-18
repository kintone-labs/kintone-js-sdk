import Auth from '../../../src/node/authentication/Auth';
import {KintoneAPIException} from '../../../src/base/main';

describe('Checking Auth.setClientCertByPath', () => {
  it('should be called successfully', () => {
    const auth = new Auth();
    const filePath = './test/node/authentication/cert.pfx';
    const password = 'MY_PASSWORD';

    const result = auth.setClientCertByPath({filePath, password});
    expect(result).toBeInstanceOf(Auth);
  });

  it('should throw error when called with invalid path', () => {
    const auth = new Auth();
    const filePath = 'MY_CERT_INVALID_PATH';
    const password = 'MY_PASSWORD';

    try {
      auth.setClientCertByPath({filePath, password});
    } catch (error) {
      expect(error).toBeInstanceOf(KintoneAPIException);
    }
  });
});