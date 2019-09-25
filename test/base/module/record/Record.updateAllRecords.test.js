import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, PASSWORD_AUTH_HEADER, USERNAME, PASSWORD, DOMAIN, getPasswordAuth, UPDATE_RECORDS_LIMIT} from './common';
import nock from 'nock';
// import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const RECORDS_ROUTE = `/k/v1/records.json`;
const BULK_REQUEST_ROUTE = `/k/v1/bulkRequest.json`;
const appID = 1;

describe('Check Record.updateAllRecords', () => {
  it('should be called successfully', () => {
    const recordsData = [];
    const recordsDataLenght = 200;
    const expectBodys = {'requests': []};
    const expectResults = {'results': []};
    const results = [];
    for (let index = 0; index < recordsDataLenght; index++) {
      recordsData.push({
        id: index + 1,
        record: {
          Text_0: 'test'
        },
        revision: 2
      });
      results.push({
        id: 1,
        revision: index > 100 ? 4 : 3
      });
    }

    for (let index = 0; index < Math.ceil(recordsDataLenght / UPDATE_RECORDS_LIMIT); index++) {
      const start = index * UPDATE_RECORDS_LIMIT;
      const end = start + UPDATE_RECORDS_LIMIT;
      expectBodys.requests.push({
        'api': RECORDS_ROUTE,
        'method': 'PUT',
        'payload': {
          'app': appID,
          'records': recordsData.slice(start, end)
        }
      });
      expectResults.results.push({
        'records': results.slice(start, end)
      });
    }

    nock(URI)
      .post(BULK_REQUEST_ROUTE, (rqBody) => {
        expect(rqBody).toHaveProperty('requests');
        expect(rqBody).toEqual(expectBodys);
        return true;
      })
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toBe('application/json;charset=utf-8');
        return true;
      })
      .reply(200, expectResults);

    return recordModule.updateAllRecords({app: appID, records: recordsData}).then((rsp) => {
      expect(rsp).toHaveProperty('results');
      expect(rsp).toMatchObject(expectResults);
    });
  });
});