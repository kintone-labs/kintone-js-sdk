import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
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
    const data = {app: 1, id: 1};
    nock(URI)
      .get(RECORD_ROUTE)
      .query(data)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, {
        'record': {}
      });
    return recordModule.getRecord(data)
      .then((rsp) => {
        expect(rsp).toHaveProperty('record');
      });
  });
});