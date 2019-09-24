import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, PASSWORD_AUTH_HEADER, USERNAME, PASSWORD, DOMAIN} from './common';
import nock from 'nock';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const RECORD_ROUTE = '/k/v1/record.json';

describe('Checking Record.getRecord', () => {
  it('should be called successfully', () => {
    const appID = 1;
    const recordID = 1;
    nock(URI)
      .get(RECORD_ROUTE)
      .query({
        app: appID,
        id: recordID
      })
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, {
        'record': {}
      });
    return recordModule.getRecord({app: appID, id: recordID})
      .then((rsp) => {
        expect(rsp).toHaveProperty('record');
      });
  });
});