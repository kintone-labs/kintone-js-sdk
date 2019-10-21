import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import BulkRequest from '../../../../src/base/module/bulkRequest/BulkRequest';
import {USERNAME, PASSWORD, DOMAIN} from './common';

describe('Checking BulkRequest.deleteRecordsWithRevision function', () => {
  it('can be called without param', () => {
    const auth = new Auth();
    auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
    const connection = new Connection({auth, domain: DOMAIN});
    const bulkRequest = new BulkRequest({connection});
    expect(bulkRequest).toBeInstanceOf(BulkRequest);
    const result = bulkRequest.deleteRecordsWithRevision();
    expect(result).toBeInstanceOf(BulkRequest);
  });
});