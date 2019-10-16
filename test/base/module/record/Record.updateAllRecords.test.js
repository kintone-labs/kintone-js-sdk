import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, USERNAME, PASSWORD, DOMAIN, UPDATE_RECORDS_LIMIT} from './common';
import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';
import ERROR_MESSAGE from '../../../resources/kintoneErrorMessage.json';

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
    const recordsDataLength = 200;
    const expectBodys = {'requests': []};
    const expectResults = {'results': []};
    const results = [];
    for (let index = 0; index < recordsDataLength; index++) {
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

    for (let index = 0; index < Math.ceil(recordsDataLength / UPDATE_RECORDS_LIMIT); index++) {
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

  it('should be called successfully with invalid records', ()=>{
    const recordsData = 'INVALID_RECORDS';
    const expectBodys = {'requests': []};
    const expectResults = {'results': []};
    // const results = [];

    nock(URI)
      .post(BULK_REQUEST_ROUTE, (rqBody) => {
        expect(rqBody).toHaveProperty('requests');
        expect(rqBody).toEqual(expectBodys);
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

  it('should be called recursive successfully', () => {
    const recordsData = [];
    const recordsDataLength = 2002;
    const expectBodys = {'requests': []};
    const expectBodys2 = {requests: []};
    const expectResults = {'results': []};
    const expectResults2 = {results: []};
    const results = [];
    for (let index = 0; index < recordsDataLength; index++) {
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

    for (let index = 0; index < Math.ceil(recordsDataLength / UPDATE_RECORDS_LIMIT); index++) {
      const start = index * UPDATE_RECORDS_LIMIT;
      const end = start + UPDATE_RECORDS_LIMIT;
      if (index > 1999) {
        expectBodys2.requests.push({
          'api': RECORDS_ROUTE,
          'method': 'PUT',
          'payload': {
            'app': appID,
            'records': recordsData.slice(start, end)
          }
        });
        expectResults2.results.push({
          'records': results.slice(start, end)
        });
      } else {
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
    }

    nock(URI)
      .post(BULK_REQUEST_ROUTE)
      .matchHeader('Content-Type', (type) => {
        expect(type).toBe('application/json;charset=utf-8');
        return true;
      })
      .reply(200, expectResults)
      .post(BULK_REQUEST_ROUTE)
      .matchHeader('Content-Type', (type) => {
        expect(type).toBe('application/json;charset=utf-8');
        return true;
      })
      .reply(200, expectResults2);

    return recordModule.updateAllRecords({app: appID, records: recordsData}).then((rsp) => {
      expect(rsp).toHaveProperty('results');
      expect(rsp).toMatchObject({
        results: expectResults.results.concat(expectResults2.results)
      });
    });
  });

  it('should throw error when called with empty param', () => {
    return recordModule.updateAllRecords().catch((err) => {
      expect(err).toBeInstanceOf(KintoneAPIException);
    });
  });

  it('should throw error when called with invalid app ID', () => {
    const recordsData = {
      'records': [
        {
          'id': 1,
          'revision': 4,
          'record': {
            'Created_datetime': {
              'value': 'Silver plates'
            }
          }
        }
      ]
    };
    const error = ERROR_MESSAGE.NEGATIVE_APPID_ERROR;
    const expectBody = {
      results: [error]
    };
    nock(URI)
      .post(BULK_REQUEST_ROUTE, (rqBody) => {
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toBe('application/json;charset=utf-8');
        return true;
      })
      .reply(400, expectBody);

    return recordModule.updateAllRecords({app: -1, records: recordsData.records}).catch((err) => {
      expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
      expect(err.results[0].get()).toMatchObject(error);
    });
  });
});