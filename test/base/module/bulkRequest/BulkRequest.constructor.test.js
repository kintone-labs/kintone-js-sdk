import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import BulkRequest from '../../../../src/base/module/bulkRequest/BulkRequest';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';
import {USERNAME, PASSWORD, DOMAIN} from './common';

describe('Checking BulkRequest', () => {
  it('Can create new instance of BulkRequest', () => {
    const auth = new Auth();
    auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
    const connection = new Connection({auth, domain: DOMAIN});
    const bulkRequest = new BulkRequest({connection});
    expect(bulkRequest).toBeInstanceOf(BulkRequest);
  });

  it('should throw error if there is no params', () => {
    try {
      new BulkRequest();
    } catch (error) {
      expect(error).toBeInstanceOf(KintoneAPIException);
    }
  });
});