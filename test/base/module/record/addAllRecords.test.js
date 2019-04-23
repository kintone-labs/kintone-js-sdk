/**
 * test record module
 */
const nock = require('nock');
const common = require('../../../utils/common');
const {KintoneAPIException, Connection, Auth, Record} = require(common.MAIN_PATH_BASE);
const {API_ROUTE, URI} = require('../../../utils/constant');
const ERROR_MESSAGE = require(common.ERROR_MESSAGE);
const auth = new Auth().setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const recordModule = new Record(conn);
const BULK_REQUEST_API_ROUTE = '/k/v1/bulkRequest.json';

describe('addAllRecords function', () => {
  describe('common case', () => {
  
  });

  describe('Successful case', () => {
    it('[Record-282] The records are added successfully', () => {
      const appID = API_ROUTE.APP;
      const recordsData = [];
      const NUMBER_RECORDS = 2;
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const resultsIds = [];
      const resultsRevisons = [];
      for (let index = 0; index < NUMBER_RECORDS; index++) {
        recordsData.push({
          Text: {
            value: 'test'
          }
        });

        resultsIds.push(index);
        resultsRevisons.push(index);
      }
      const loopTimes = Math.ceil(NUMBER_RECORDS / API_ROUTE.UPDATE_RECORDS_LIMIT);
      
      for (let index = 0; index < loopTimes; index++) {
        const start = index * API_ROUTE.UPDATE_RECORDS_LIMIT;
        const end = start + API_ROUTE.UPDATE_RECORDS_LIMIT;
        expectBodys.requests.push({
          'api': API_ROUTE.RECORDS,
          'method': 'POST',
          'payload': {
            'app': appID,
            'records': recordsData.slice(start, end)
          }
        });
        expectResults.results.push({
          'ids': resultsIds.slice(start, end),
          'revisions': resultsRevisons.slice(start, end)
        });
      }

      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toHaveProperty('requests');
          expect(rqBody).toEqual(expectBodys);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResults);
      const addRecordsResult = recordModule.addAllRecords(appID, recordsData);
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
        expect(rsp.results[0].ids.length).toEqual(expectResults.results[0].ids.length);
        expect(rsp.results[0].revisions.length).toEqual(expectResults.results[0].revisions.length);
      });
    });
  });

  describe('error case', () => {
    /**
     * Missing required field
     * The error will be displayed when using method without app ID
     */
    it('[Record-283] - The error will be displayed when using invalid app ID (unexisted, negative number, 0)', () => {
      const appID = 99999;
      const recordsData = [{
        'app': appID,
        'records': [
          {
            'Text': {
              'value': 'Silver plates'
            }
          }
        ]
      }];
      const expectResult = ERROR_MESSAGE.
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(400, expectResult);

      const addRecordResult = recordModule.addAllRecords(appID, recordsData);
      return addRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
