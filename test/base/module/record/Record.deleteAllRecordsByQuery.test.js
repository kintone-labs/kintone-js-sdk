import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, PASSWORD_AUTH_HEADER, USERNAME, PASSWORD, DOMAIN} from './common';
import ERROR_MESSAGE from '../../../resources/kintoneErrorMessage.json';
import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const RECORDS_ROUTE = `/k/v1/records.json`;
const BULK_REQUEST_API_ROUTE = '/k/v1/bulkRequest.json';

describe('Check Record.deleteAllRecordsByQuery', () => {
  it('should be called successfully', () => {
    const appID = 4;
    const data = {
      app: appID,
      query: 'Number < 11'
    };
    const recordsData = [];
    const expectBodys = {'requests': []};
    const expectResults = {'results': []};
    const recordsDataLenght = 1;
    recordsData.push({
      'Number': {
        'type': 'NUMBER',
        'value': '10'
      },
      '$id': {
        'type': '__ID__',
        'value': '1'
      }
    });
    const resultsIds = [recordsData[0].$id.value];
    expectBodys.requests.push({
      'api': RECORDS_ROUTE,
      'method': 'DELETE',
      'payload': {
        'app': appID,
        'ids': resultsIds
      }
    });

    expectResults.results.push([{}]);
    const expectResultGetRecord = {
      'records': recordsData,
      'totalCount': recordsDataLenght
    };

    const expectedDeleteResults = {
      'results': [{}]
    };

    nock(URI)
      .get(`${RECORDS_ROUTE}?app=${data.app}&query=${encodeURIComponent(data.query + ' limit 500 offset 0')}`)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResultGetRecord)
      .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual(expectBodys);
        return true;
      }).reply(200, expectedDeleteResults);

    return recordModule.deleteAllRecordsByQuery(data).then((rsp) => {
      expect(rsp).toEqual(expectedDeleteResults);
    });
  });

  it('should be called successfully when no records match query', () => {
    const appID = 4;
    const data = {
      app: appID,
      query: 'Number < 11'
    };
    const recordsData = [];
    const expectBodys = {'requests': []};
    const expectResults = {'results': []};
    recordsData.push({
      'Number': {
        'type': 'NUMBER',
        'value': '10'
      },
      '$id': {
        'type': '__ID__',
        'value': '1'
      }
    });
    const resultsIds = [recordsData[0].$id.value];
    expectBodys.requests.push({
      'api': RECORDS_ROUTE,
      'method': 'DELETE',
      'payload': {
        'app': appID,
        'ids': resultsIds
      }
    });

    expectResults.results.push([{}]);
    const expectResultGetRecord = {
      'records': [],
      'totalCount': null
    };

    nock(URI)
      .get(`${RECORDS_ROUTE}?app=${data.app}&query=${encodeURIComponent(data.query + ' limit 500 offset 0')}`)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResultGetRecord);

    return recordModule.deleteAllRecordsByQuery(data).then((rsp) => {
      expect(rsp).toEqual({});
    });
  });

  it('should throw error when called with empty param', () => {
    return recordModule.deleteAllRecordsByQuery().then((err) => {
      expect(err).toHaveProperty('results');
    });
  });

  it('should throw error when called with invalid app ID', () => {
    const appID = -1;
    const query = '';
    const expectResults = ERROR_MESSAGE.NEGATIVE_APPID_ERROR;
    nock(URI)
      .get(`${RECORDS_ROUTE}?app=${appID}&query=${encodeURIComponent(query + 'limit 500 offset 0')}`)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      }).reply(404, expectResults);

    const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID, query: query});
    return deleteRecordsResult.catch((err) => {
      expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
      expect(err.results[0].get()).toMatchObject(expectResults);
    });
  });
});