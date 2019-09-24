import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import RecordCursor from '../../../../src/base/module/cursor/RecordCursor';
import {USERNAME, PASSWORD, DOMAIN, PASSWORD_AUTH_HEADER, getPasswordAuth, URI} from './common';

import nock from 'nock';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});

const conn = new Connection({domain: DOMAIN, auth: auth});

const CURSOR_ROUTE = '/k/v1/records/cursor.json';

describe('Checking RecordCursor getRecords function', () => {
  it('getRecords is called successfully', () => {
    const cursorID = 'CURSOR-ID';

    const EXPECTED_RESPONSE = {
      records: [
        {
          'Record_number': {
            'type': 'RECORD_NUMBER',
            'value': '1'
          }
        }
      ],
      next: true
    };

    nock(URI)
      .get(CURSOR_ROUTE)
      .query({id: cursorID})
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .reply(200, EXPECTED_RESPONSE);

    const rc = new RecordCursor({connection: conn});
    return rc.getRecords({id: cursorID})
      .then((recordsResponse) => {
        expect(recordsResponse).toHaveProperty('records');
        expect(Array.isArray(recordsResponse.records)).toBe(true);
        expect(recordsResponse).toHaveProperty('next');
        expect(recordsResponse.next).toEqual(true);
      });
  });
});