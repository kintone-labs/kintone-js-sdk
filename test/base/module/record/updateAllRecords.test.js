const nock = require('nock');
const common = require('../../../utils/common');
const {API_ROUTE, URI} = require('../../../utils/constant');
const {KintoneAPIException, Connection, Auth, Record} = require(common.MAIN_PATH_BASE);
const auth = new Auth().setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const recordModule = new Record(conn);

describe('updateAllRecords function', () => {
  describe('success case', () => {
    it('[Record-1] - should update successfully the records', () => {
      const appID = 1;
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

      for (let index = 0; index < Math.ceil(recordsDataLenght / API_ROUTE.UPDATE_RECORDS_LIMIT); index++) {
        const start = index * API_ROUTE.UPDATE_RECORDS_LIMIT;
        const end = start + API_ROUTE.UPDATE_RECORDS_LIMIT;
        expectBodys.requests.push({
          'api': API_ROUTE.RECORDS,
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
        .post(API_ROUTE.BULK_REQUEST, (rqBody) => {
          expect(rqBody).toHaveProperty('requests');
          expect(rqBody).toEqual(expectBodys);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResults);

      const updateAllRecordsResult = recordModule.updateAllRecords(appID, recordsData);
      return updateAllRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('records');
        expect(rsp.records).toMatchObject(results);
      });
    });
  });

  describe('error case', () => {
    /**
     * Missing required field
     * The error will be displayed when using method without app ID
     */
    it('[Record-74] - should return the error in the result when using method without app ID', () => {
      const appID = null;
      const recordsData = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          }
        ]
      };
      const expectResult = {
        'id': 'JkEZZDZMRe3ZkrfCWRaq',
        'code': 'CB_VA01',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .post(API_ROUTE.BULK_REQUEST, (rqBody) => {
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

      const getRecordResult = recordModule.updateAllRecords(appID, recordsData.records);
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});