import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, USERNAME, PASSWORD, PASSWORD_AUTH_HEADER, DOMAIN} from './common';
import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const RECORDS_ROUTE = '/k/v1/records.json';

describe('Checking Record.getRecords', () => {
  it('should be called successfully', () => {
    const body = {
      app: 844,
      query: 'Created_datetime = TODAY()',
      fields: ['Created_datetime'],
      totalCount: false,
    };
    const expectResponse = {
      'records': [{
        'Created_datetime': {
          'type': 'CREATED_TIME',
          'value': '2019-10-18T02:53:00Z'
        }
      }],
      'totalCount': null
    };

    // (Resolved) TODO
    // Research how to pass array param to nock query string
    nock(URI)
      .get(RECORDS_ROUTE)
      .query(body)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResponse);
    return recordModule.getRecords(body)
      .then(rsp => {
        expect(rsp).toHaveProperty('records');
        expect(rsp).toMatchObject(expectResponse);
      });
  });

  it('should throw error when called with empty param', () => {
    const expectResult = {
      'code': 'CB_VA01',
      'id': 'aJXwoxO4W5Y37kSPnsst',
      'message': 'Missing or invalid input.',
      'errors': {
        'app': {
          'messages': ['Required field.']
        }
      }
    };
    nock(URI)
      .get(RECORDS_ROUTE)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(400, expectResult);
    return recordModule.getRecords()
      .catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.errorResponse).toMatchObject(expectResult);
      });
  });
});