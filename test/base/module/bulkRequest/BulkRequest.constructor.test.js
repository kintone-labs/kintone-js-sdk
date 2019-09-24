import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import BulkRequest from '../../../../src/base/module/bulkRequest/BulkRequest';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';
import {USERNAME, PASSWORD} from './common';

describe('Checking BulkRequest', () => {
  it('Can create new instance of BulkRequest', () => {
    const auth = new Auth();
    auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
    const connection = new Connection({auth});
    const bulkRequest = new BulkRequest({connection});
    expect(bulkRequest).toBeInstanceOf(BulkRequest);
  });

  it('should throw error if there is no params', () => {
    try {
      const bulkRequest = new BulkRequest();
      expect(bulkRequest).toBeInstanceOf(BulkRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(KintoneAPIException);
    }
  });
});