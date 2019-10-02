import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import RecordCursor from '../../../../src/base/module/cursor/RecordCursor';
import {USERNAME, PASSWORD, DOMAIN, PASSWORD_AUTH_HEADER, getPasswordAuth, URI} from './common';

import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});

const conn = new Connection({domain: DOMAIN, auth: auth});

const CURSOR_ROUTE = '/k/v1/records/cursor.json';

describe('Checking RecordCursor getAllRecords function', () => {
  it('should be call successfully', ()=>{
    const cursorID = 'sadasda';

    const EXPECTED_RESPONSE = {
      records: [
        {
          'Record_number': {
            'type': 'RECORD_NUMBER',
            'value': '1'
          }
        }
      ],
      totalCount: 1
    };

    nock(URI)
      .get(`${CURSOR_ROUTE}?id=${cursorID}`)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .reply(200, EXPECTED_RESPONSE);

    const rc = new RecordCursor({connection: conn});
    return rc.getAllRecords({id: cursorID})
      .then((recordsResponse)=>{
        expect(recordsResponse).toHaveProperty('records');
        expect(Array.isArray(recordsResponse.records)).toBe(true);
        expect(recordsResponse.records.length).toEqual(EXPECTED_RESPONSE.totalCount);
        expect(recordsResponse).toHaveProperty('totalCount');
        expect(recordsResponse.totalCount).toEqual(EXPECTED_RESPONSE.totalCount);
      });

    // TODO:
    // remove from else branch https://github.com/trung-doan/kintone-js-sdk/blob/cc12e96e576f3617f005e0d0470c04e18f9b83bb/src/base/module/cursor/RecordCursor.js#L96
  });

  it('should throw KintoneAPIException when 1 block is not get', () => {
    const cursorID = 'sadasda';

    const ILLEGAL_REQUEST = {
      id: 'RWt7OV6Pa40r1E3a2hgb',
      code: 'CB_IL02',
      message: 'Illegal request.',
      errors: {}
    };

    nock(URI)
      .get(CURSOR_ROUTE)
      .query({id: cursorID})
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .reply(404, ILLEGAL_REQUEST);

    const rc = new RecordCursor({connection: conn});
    return rc.getAllRecords({id: cursorID})
      .catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(ILLEGAL_REQUEST);
      });
  });

  it('should throw error when called with no param', () => {
    const rc = new RecordCursor({connection: conn});
    return rc.getAllRecords()
      .catch((err)=>{
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.message).toEqual('id is a required argument.');
      });
  });
});