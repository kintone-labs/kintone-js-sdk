import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import BulkRequest from '../../../../src/base/module/bulkRequest/BulkRequest';
import {USERNAME, PASSWORD} from './common';

describe('Checking BulkRequest.updateRecords function', () => {
  it('can be called without param', () => {
    const auth = new Auth();
    auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
    const connection = new Connection({auth});
    const bulkRequest = new BulkRequest({connection});
    expect(bulkRequest).toBeInstanceOf(BulkRequest);
    const result = bulkRequest.updateRecords();
    expect(result).toBeInstanceOf(BulkRequest);
  });
});