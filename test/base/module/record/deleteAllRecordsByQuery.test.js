/**
 * test record module
 */
const nock = require('nock');
const common = require('../../utils/common');
const {KintoneAPIException, Connection, Auth, Record} = require(common.MAIN_PATH);
const {API_ROUTE, URI} = require('../../utils/constant');

const auth = new Auth().setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const recordModule = new Record(conn);
const BULK_REQUEST_API_ROUTE = '/k/v1/bulkRequest.json';

describe('deleteAllRecordsByQuery function', () => {
  describe('common case', () => {
    // it('should return a promise', () => {
    //   const data = {
    //     app: 4,
    //     query: ''
    //   };
    //   nock(URI)
    //     .intercept(BULK_REQUEST_API_ROUTE, 'POST')
    //     .reply(200, {});
    //   const deleteRecordsResult = recordModule.deleteAllRecordsByQuery(data.app, data.query);
    //   expect(deleteRecordsResult).toHaveProperty('then');
    //   expect(deleteRecordsResult).toHaveProperty('catch');
    // });
  });

  describe('Successful case', () => {
    it('[Record-777] Delete successfully all records by query', () => {
      const data = {
        app: 4,
        query: 'Record_number = 300'
      };

      const expectBody = {
        'requests': [
          {
            'method': 'DELETE',
            'api': '/k/v1/records.json',
            'payload': {
              'app': 4,
              'ids': ['300']
            }
          }
        ]
      };
      const expectResultGetRecord = {
        'records': [{
          'Updated_datetime': {
            'type': 'UPDATED_TIME',
            'value': '2019-01-22T10:11:00Z'
          },
          'Created_datetime': {
            'type': 'CREATED_TIME',
            'value': '2019-01-22T10:11:00Z'
          },
          'Record_number': {
            'type': 'RECORD_NUMBER',
            'value': '300'
          },
          'name': {
            'type': 'SINGLE_LINE_TEXT',
            'value': ''
          },
          'Created_by': {
            'type': 'CREATOR',
            'value': {
              'code': 'cybozu',
              'name': 'cybozu'
            }
          },
          '$revision': {
            'type': '__REVISION__',
            'value': '1'
          },
          'Updated_by': {
            'type': 'MODIFIER',
            'value': {
              'code': 'cybozu',
              'name': 'cybozu'
            }
          },
          'age': {
            'type': 'SINGLE_LINE_TEXT',
            'value': ''
          },
          '$id': {
            'type': '__ID__',
            'value': '300'
          }
        }]
      };

      const expectedDeleteResults = [{
        'results': [{}]
      }];
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${data.app}&query=${encodeURIComponent(data.query + ' limit 500 offset 0')}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResultGetRecord)
        .post(`${BULK_REQUEST_API_ROUTE}?app=${data.app}&query=${encodeURIComponent(data.query + ' limit 500 offset 0')}`, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        }).reply(200, {
          'results': [{}]
        });
      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery(data.app, data.query);
      return deleteRecordsResult.then((rsp) => {
        expect(rsp).toEqual(expectedDeleteResults);
      });
    });
  });

  describe('Error case', () => {
    it('[Record-999] Error will be displayed when using invalid app ID ', () => {
      const data = {
        app: -2,
        query: ''
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': '7LyZ4i7o38BgRN3zEbvZ',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${data.app}&query=${encodeURIComponent(data.query + 'limit 500 offset 0')}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        }).reply(404, expectedResult);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery(data.app, data.query);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
  });
});