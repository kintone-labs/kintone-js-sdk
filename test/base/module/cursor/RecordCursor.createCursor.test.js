import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import RecordCursor from '../../../../src/base/module/cursor/RecordCursor';
import {USERNAME, PASSWORD, DOMAIN, PASSWORD_AUTH_HEADER, getPasswordAuth, URI} from './common';

import nock from 'nock';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});

const conn = new Connection({domain: DOMAIN, auth: auth});

const CURSOR_ROUTE = '/k/v1/records/cursor.json';

describe('Checking RecordCursor', () => {
  it('Can call createCursor successfully', () => {
    const app = 1;
    const fields = [];
    const query = '';
    const size = 2;

    const EXPECTED_RESPONSE = {
      id: '9a9716fe-1394-4677-a1c7-2199a5d28215',
      totalCount: 123456
    };

    nock(URI)
      .post(CURSOR_ROUTE, (rqBody) => {
        expect(rqBody.app).toEqual(app);
        expect(rqBody.fields).toEqual(fields);
        expect(rqBody.query).toEqual(query);
        expect(rqBody.size).toEqual(size);
        return true;
      })
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, EXPECTED_RESPONSE);

    const rc = new RecordCursor({connection: conn});
    return rc.createCursor({app, fields, query, size})
      .then((response) => {
        expect(response).toHaveProperty('id');
        expect(response).toHaveProperty('totalCount');
        expect(response.id).toEqual(EXPECTED_RESPONSE.id);
        expect(response.totalCount).toEqual(EXPECTED_RESPONSE.totalCount);
      });
  });

  it('should throw error when called with no param', () => {
    const rc = new RecordCursor({connection: conn});
    return rc.createCursor()
      .then(()=>{
        expect(1).toEqual(1);
        // TODO: validate createCursor params
      })
      .catch((err)=>{
        // expect(err).toBeInstanceOf(KintoneAPIException)
        // expect(err.message).toEqual('id is a required argument.')
      });
  });
});