/**
 * kintone api - nodejs client
 * test record module
 */

const nock = require('nock');

const common = require('../../../utils/common');

const {Connection, Auth, Record, KintoneAPIException} = require(common.MAIN_PATH_BASE);
const {API_ROUTE, URI} = require('../../../utils/constant');

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const recordModule = new Record(conn);
describe('getRecords function', () => {
  describe('success case', () => {
    it('[Record-1] should get successfully the records', () => {
      const body = {
        app: 844,
        query: 'Created_datetime = TODAY()'
      };

      const recordsData = [];
      const recordsDataLenght = 560;
      const expectBodys = [];
      for (let index = 0; index < recordsDataLenght; index++) {
        recordsData.push(
          {
            'drop_down_field': {
              'type': 'DROP_DOWN',
              'value': 'Pudding'
            },
            'recordID': {
              'type': 'RECORD_NUMBER',
              'value': index + 1
            }
          });
      }

      for (let index = 0; index < Math.ceil(recordsDataLenght / API_ROUTE.GET_RECORDS_LIMIT); index++) {
        const start = index * API_ROUTE.GET_RECORDS_LIMIT;
        const end = API_ROUTE.GET_RECORDS_LIMIT - start < API_ROUTE.GET_RECORDS_LIMIT ? recordsDataLenght : start + API_ROUTE.GET_RECORDS_LIMIT;
        expectBodys.push({
          'records': recordsData.slice(start, end)
        });
      }
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query + ' limit 500 offset 0')}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectBodys[0])
        .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query + ' limit 500 offset 500')}`)
        .reply(200, expectBodys[1]);
      return recordModule.getAllRecordsByQuery(body.app, body.query, body.fields, body.totalCount)
        .then(rsp => {
          expect(rsp).toHaveProperty('records');
          expect(rsp).toMatchObject({'records': recordsData});
        });
    });
    it('[Record-2] should return the error in the result when using method without app ID', () => {
      const body = {
        app: null,
        query: 'Created_datetime = TODAY()'
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
        .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(520, expectResult);
      return recordModule.getRecords(body.app, body.query, body.fields, body.totalCount)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
  });
});

