/**
 * test record module
 */
const nock = require('nock');
const common = require('../../../utils/common');
const {KintoneAPIException, Connection, Auth, Record} = require(common.MAIN_PATH_BASE);
const {API_ROUTE, URI} = require('../../../utils/constant');

const auth = new Auth().setPasswordAuth({username: common.USERNAME, password: common.PASSWORD}).setApiToken({apiToken: common.API_TOKEN_VALUE});
const BULK_REQUEST_API_ROUTE = '/k/v1/bulkRequest.json';
const BULK_REQUEST_API_GUEST_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/bulkRequest.json`;

const ERROR_MESSAGE = require(common.ERROR_MESSAGE);

const conn = new Connection({domain: common.DOMAIN, auth: auth});
const recordModule = new Record({connection: conn});

const connGuest = new Connection({domain: common.DOMAIN, auth: auth, guestSpaceID: common.GUEST_SPACEID});
const recordModuleGuest = new Record({connection: connGuest});

describe('deleteAllRecordsByQuery function', () => {
  describe('Successful case', () => {
    it('[Record-320] Verify the records are deleted correctly with query', () => {
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
        'api': API_ROUTE.RECORDS,
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
        .get(`${API_ROUTE.RECORDS}?app=${data.app}&query=${encodeURIComponent(data.query + ' limit 500 offset 0')}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .reply(200, expectResultGetRecord)
        .post(`${BULK_REQUEST_API_ROUTE}?app=${data.app}&query=${encodeURIComponent(data.query + ' limit 500 offset 0')}`, (rqBody) => {
          expect(rqBody).toEqual(expectBodys);
          return true;
        }).reply(200, expectedDeleteResults);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery(data);
      return deleteRecordsResult.then((rsp) => {
        expect(rsp).toEqual(expectedDeleteResults);
      });
    });

    it('[Record-328] The record is deleted successfully for app in guest space', () => {
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
        'api': API_ROUTE.GUEST_RECORDS,
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
        .get(`${API_ROUTE.GUEST_RECORDS}?app=${data.app}&query=${encodeURIComponent(data.query + ' limit 500 offset 0')}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .reply(200, expectResultGetRecord)
        .post(`${BULK_REQUEST_API_GUEST_ROUTE}?app=${data.app}&query=${encodeURIComponent(data.query + ' limit 500 offset 0')}`, (rqBody) => {
          expect(rqBody).toEqual(expectBodys);
          return true;
        }).reply(200, expectedDeleteResults);

      const deleteRecordsResult = recordModuleGuest.deleteAllRecordsByQuery(data);
      return deleteRecordsResult.then((rsp) => {
        expect(rsp).toEqual(expectedDeleteResults);
      });
    });


    it('[Record-329] Verify that using method to delete many records (check with 200 records)', () => {
      const appID = 4;
      const query = 'Number < 11';
      const recordsData = [];
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const recordsDataLength = 200;
      const resultsIds = [];
      for (let index = 0; index < recordsDataLength; index++) {
        recordsData.push({
          'Number': {
            'type': 'NUMBER',
            'value': '10'
          },
          '$id': {
            'type': '__ID__',
            'value': index
          }
        });
        resultsIds.push(index);
      }

      const loopTimes = Math.ceil(recordsDataLength / API_ROUTE.UPDATE_RECORDS_LIMIT);

      for (let index = 0; index < loopTimes; index++) {
        const start = index * API_ROUTE.UPDATE_RECORDS_LIMIT;
        const end = start + API_ROUTE.UPDATE_RECORDS_LIMIT;
        expectBodys.requests.push({
          'api': API_ROUTE.RECORDS,
          'method': 'DELETE',
          'payload': {
            'app': appID,
            'ids': resultsIds.slice(start, end)
          }
        });
        expectResults.results.push([{}]);
      }

      const expectResultGetRecord = {
        'records': recordsData,
        'totalCount': recordsDataLength
      };

      const expectedDeleteResults = {
        'results': [{}]
      };

      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 0')}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .reply(200, expectResultGetRecord)
        .post(`${BULK_REQUEST_API_ROUTE}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 0')}`, (rqBody) => {
          expect(rqBody).toEqual(expectBodys);
          return true;
        }).reply(200, expectedDeleteResults);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID, query: query});
      return deleteRecordsResult.then((rsp) => {
        expect(rsp).toEqual(expectedDeleteResults);
      });
    });

  });

  describe('Error case', () => {
    it('[Record-321-case-1] The error will be displayed when using invalid app ID (negative number app id)', () => {
      const appID = -2;
      const query = '';
      const expectResults = ERROR_MESSAGE.NEGATIVE_APPID_ERROR;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + 'limit 500 offset 0')}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        }).reply(404, expectResults);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID, query: query});
      return deleteRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });
    it('[Record-321-case-2] The error will be displayed when using invalid app ID (unexisted app)', () => {
      const appID = 9999;
      const query = '';
      const expectResults = ERROR_MESSAGE.NEGATIVE_APP_ID_ERROR;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + 'limit 500 offset 0')}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        }).reply(404, expectResults);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID, query: query});
      return deleteRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });
    it('[Record-321-case-3] The error will be displayed when using invalid app ID (app id is zero)', () => {
      const appID = 0;
      const query = '';
      const expectResults = ERROR_MESSAGE.NEGATIVE_APP_ID_ERROR;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + 'limit 500 offset 0')}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        }).reply(404, expectResults);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID, query: query});
      return deleteRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });
    it('[Record-322] The error will be displayed when using invalid query', () => {
      const appID = 4;
      const query = 'invalid query ';
      const expectResults = ERROR_MESSAGE.INVALID_QUERY_GET_DATA_ERROR;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(`${query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        }).reply(520, expectResults);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID, query: query});
      return deleteRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });

    it('[Record-323] The error will be displayed when using method without app ID', () => {
      const appID = undefined;
      const query = 'Number < 11 ';
      const expectResults = ERROR_MESSAGE.MISSING_APP_ERROR;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?query=${encodeURIComponent(`${query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        }).reply(400, expectResults);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID, query: query});
      return deleteRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });

    it('[Record-324] Verify that all record will be deleted when missing query', () => {
      const appID = 1;
      const expectResults = ERROR_MESSAGE.MISSING_APP_ERROR;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(`limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        }).reply(400, expectResults);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID});
      return deleteRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });

    it('[Record-325] Error will display when user does not have Delete records permission for app', () => {
      const appID = 4;
      const query = 'Number < 7';
      const expectResults = ERROR_MESSAGE.PERMISSION_ERROR;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(`${query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        }).reply(520, expectResults);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID, query: query});
      return deleteRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });

    it('[Record-326] Error will display when user does not have Delete records permission for the record', () => {
      const appID = 4;
      const query = 'Number < 7';
      const expectResults = ERROR_MESSAGE.PERMISSION_ERROR;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(`${query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        }).reply(520, expectResults);

      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID, query: query});
      return deleteRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });
    it('[Record-333] Handle error in bulk', () => {
      const appID = 4;
      const query = 'Number < 11';
      const recordsDataLenght = 6000;
      const recordsData = [];
      const expectBodys = {'requests': []};
      const expectResultsBulk1 = {'results': []};
      const expectResultsBulk2 = {'results': []};
      const resultsIds = [];
      for (let index = 0; index < recordsDataLenght; index++) {
        recordsData.push({
          'Number': {
            'type': 'NUMBER',
            'value': '10'
          },
          '$id': {
            'type': '__ID__',
            'value': index
          }
        });
        resultsIds.push(index);
      }
      const expectResultGetRecord = {
        'records': recordsData,
        'totalCount': recordsDataLenght
      };

      for (let index = 0; index < Math.ceil(recordsDataLenght / API_ROUTE.UPDATE_RECORDS_LIMIT); index++) {
        const start = index * API_ROUTE.UPDATE_RECORDS_LIMIT;
        const end = start + API_ROUTE.UPDATE_RECORDS_LIMIT;
        expectBodys.requests.push({
          'api': API_ROUTE.RECORDS,
          'method': 'DELETE',
          'payload': {
            'app': appID,
            'ids': resultsIds.slice(start, end)
          }
        });
        if (index < API_ROUTE.BULK_REQUEST_LIMIT) {
          expectResultsBulk1.results.push({});

          if (index === 0) {
            const error = ERROR_MESSAGE.UPDATE_RECORD_CREATED_AT_ERROR;
            expectResultsBulk2.results.push(error);
          } else {
            expectResultsBulk2.results.push({});
          }
        }
      }
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 0')}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, {
          records: expectResultGetRecord.records.slice(0, 500),
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 500')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(500, 1000),
          totalCount: 500
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 1000')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(1000, 1500)
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 1500')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(1500, 2000)
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 2000')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(2000, 2500)
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 2500')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(2500, 3000)
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 3000')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(3000, 3500)
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 3500')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(3500, 4000)
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 4000')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(4000, 4500)
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 4500')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(4500, 5000)
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 5000')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(5000, 5500)
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 5500')}`)
        .reply(200, {
          records: expectResultGetRecord.records.slice(5500, 6000)
        })
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 6000')}`)
        .reply(200, {
          records: []
        })
        .post(`${BULK_REQUEST_API_ROUTE}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 6000')}`, (rqBody) => {
          const expecrtBodysBukl1 = {'requests': expectBodys.requests.slice(0, API_ROUTE.BULK_REQUEST_LIMIT)};
          expect(rqBody).toEqual(expecrtBodysBukl1);
          return true;
        })
        .reply(200, expectResultsBulk1)
        .post(`${BULK_REQUEST_API_ROUTE}?app=${appID}&query=${encodeURIComponent(query + ' limit 500 offset 6000')}`, (rqBody) => {
          const expecrtBodysBukl2 = {'requests': expectBodys.requests.slice(API_ROUTE.BULK_REQUEST_LIMIT, (API_ROUTE.BULK_REQUEST_LIMIT * 2))};
          expect(rqBody).toEqual(expecrtBodysBukl2);
          return true;
        })
        .reply(404, expectResultsBulk2);
      const deleteRecordsResult = recordModule.deleteAllRecordsByQuery({app: appID, query: query});
      return deleteRecordsResult.catch((error) => {
        const kintoneException = {response: {
          data: ERROR_MESSAGE.UPDATE_RECORD_CREATED_AT_ERROR
        }};
        expectResultsBulk2.results[0] = new KintoneAPIException(kintoneException);
        const expectResult = expectResultsBulk1;
        expectResult.results = expectResult.results.concat(expectResultsBulk2.results);
        expect(error).toHaveProperty('results');
        expect(error).toMatchObject(expectResult);
      });
    });
  });
});