import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, PASSWORD_AUTH_HEADER, USERNAME, PASSWORD, DOMAIN} from './common';
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

    // TODO
    // Research how to pass array param to nock query string
    nock(URI)
      .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, {
        'records': [{}]
      });
    return recordModule.getRecords(body)
      .then(rsp => {
        expect(rsp).toHaveProperty('records');
      });
  });

  it('should throw error when called with empty param', () => {
    return recordModule.getRecords()
      .catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
  });
});