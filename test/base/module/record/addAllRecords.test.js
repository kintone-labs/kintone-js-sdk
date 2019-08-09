/**
 * test record module
 */
const nock = require('nock');
const common = require('../../../utils/common');
const {KintoneAPIException, Connection, Auth, Record} = require(common.MAIN_PATH_BASE);
const {API_ROUTE, URI} = require('../../../utils/constant');
const ERROR_MESSAGE = require(common.ERROR_MESSAGE);
const auth = new Auth().setPasswordAuth({username: common.USERNAME, password: common.PASSWORD})
  .setApiToken({apiToken: common.API_TOKEN_VALUE});
const conn = new Connection({domain: common.DOMAIN, auth: auth});
const recordModule = new Record({connection: conn});
const BULK_REQUEST_API_ROUTE = '/k/v1/bulkRequest.json';
const BULK_REQUEST_API_GUEST_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/bulkRequest.json`;

const connGuestSpace = new Connection({domain: common.DOMAIN, auth: auth, guestSpaceID: common.GUEST_SPACEID});
const recordModuleGuestSpace = new Record({connection: connGuestSpace});
describe('addAllRecords function', () => {
  describe('common case', () => {

  });

  describe('Successful case', () => {
    it('[Record-282] The records are added successfully', () => {
      const appID = 1;
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
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResults);
      const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
        expect(rsp.results[0].ids.length).toEqual(expectResults.results[0].ids.length);
        expect(rsp.results[0].revisions.length).toEqual(expectResults.results[0].revisions.length);
      });
    });
    it('[Record-284] The invalid field will be skipped when there is record with invalid field in the records array', () => {
      const appID = 1;
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
          },
          Invalid_field: {
            value: 'Invalid_field_value'
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
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResults);
      const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
        expect(rsp.results[0].ids.length).toEqual(expectResults.results[0].ids.length);
        expect(rsp.results[0].revisions.length).toEqual(expectResults.results[0].revisions.length);
      });
    });

    it('[Record-292] Verify the record data is returned correctly with table', () => {
      const appID = 1;
      const recordsData = [];
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};

      recordsData.push({
        'Table': {
          'type': 'SUBTABLE',
          'value': [
            {
              'id': '6043',
              'value': {
                'Text_Area': {
                  'type': 'SINGLE_LINE_TEXT',
                  'value': 'table text'
                }
              }
            }
          ]
        }
      });

      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'POST',
        'payload': {
          'app': appID,
          'records': recordsData
        }
      });
      expectResults.results.push({
        'ids': [1],
        'revisions': [1],
      });


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
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResults);
      const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
        expect(rsp.results[0].ids.length).toEqual(expectResults.results[0].ids.length);
        expect(rsp.results[0].revisions.length).toEqual(expectResults.results[0].revisions.length);
      });
    });
    it('[Record-293] The records are added successfully for app in guest space', () => {

      const appID = 1;
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
          'api': API_ROUTE.GUEST_RECORDS,
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
        .post(BULK_REQUEST_API_GUEST_ROUTE, (rqBody) => {
          expect(rqBody).toHaveProperty('requests');
          expect(rqBody).toEqual(expectBodys);
          expect(rqBody.requests[0].api).toEqual(expectBodys.requests[0].api);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResults);
      const addRecordsResult = recordModuleGuestSpace.addAllRecords({app: appID, records: recordsData});
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
        expect(rsp.results[0].ids.length).toEqual(expectResults.results[0].ids.length);
        expect(rsp.results[0].revisions.length).toEqual(expectResults.results[0].revisions.length);
      });
    });
    it('[Record-296] Verify that using method to create many records (check with 200 records)', () => {
      const appID = 1;
      const recordsData = [];
      const NUMBER_RECORDS = 200;
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
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResults);
      const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
        expect(rsp.results[0].ids.length).toEqual(expectResults.results[0].ids.length);
        expect(rsp.results[0].revisions.length).toEqual(expectResults.results[0].revisions.length);
      });
    });
    it('[Record-300] Data is added when having admin permission:', () => {
      const appID = 1;
      const recordsData = [];
      const NUMBER_RECORDS = 200;
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const resultsIds = [];
      const resultsRevisons = [];
      for (let index = 0; index < NUMBER_RECORDS; index++) {
        recordsData.push({
          Created_by: {
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
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResults);
      const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
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
      const recordsData = [];
      recordsData.push({
        Text: {
          value: 'test'
        }
      });
      const expectResult = ERROR_MESSAGE.MISSING_APP_ID_ERROR;
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

      const addRecordResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResult);
      });
    });
    it('[Record-285] The error will be displayed when adding invalid data (text for number field)', () => {
      const appID = 4;
      const recordsData = [];
      const NUMBER_RECORDS = 1;
      const expectBodys = {'requests': []};
      for (let index = 0; index < NUMBER_RECORDS; index++) {
        recordsData.push({Number: {value: 'test'}}, {Text: {value: '2'}});
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
      }
      const expectResult = ERROR_MESSAGE.INVALID_FIELD_TYPE_NUMBER_ERROR;
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

      const addRecordResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResult);
      });
    });
    it('[Record-286] The error will be displayed when adding invalid data (duplicate data for "prohibit duplicate value" field)', () => {
      const appID = 4;
      const recordsData = [];
      const NUMBER_RECORDS = 1;
      const expectBodys = {'requests': []};
      for (let index = 0; index < NUMBER_RECORDS; index++) {
        recordsData.push(
          {
            Prohibit_Duplicate_Number: {value: 'test'}
          },
          {
            Text: {value: '2'}
          }
        );
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
      }
      const expectResult = ERROR_MESSAGE.INVALID_VALUE_DUPLICATED_ERROR;
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

      const addRecordResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResult);
      });
    });

    it('[Record-287] The error will be displayed when adding invalid data (exceed maximum for number field)', () => {

      const appID = 4;
      const recordsData = [];
      const NUMBER_RECORDS = 1;
      const expectBodys = {'requests': []};
      for (let index = 0; index < NUMBER_RECORDS; index++) {
        recordsData.push({
          Prohibit_Duplicate_Number: {value: 9999999}
        });
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
      }
      const expectResult = ERROR_MESSAGE.FIELD_NUMBER_LESS_THAN_VALUE_ERROR;
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

      const addRecordResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResult);
      });
    });

    it('[Record-288] The error will be displayed when using method without app ID', () => {

      const appID = undefined;
      const recordsData = [];
      const NUMBER_RECORDS = 1;
      const expectBodys = {'requests': []};
      for (let index = 0; index < NUMBER_RECORDS; index++) {
        recordsData.push({
          Prohibit_Duplicate_Number: {value: 9999999}
        });
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
      }
      const expectResult = ERROR_MESSAGE.MISSING_APP_ERROR;
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toHaveProperty('requests');
          expect(rqBody).toEqual(expectBodys);
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

      const addRecordResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResult);
      });
    });

    it('[Record-289] The error will be displayed when using method without records data', () => {

      const appID = 4;
      const expectBodys = {'requests': []};

      const expectResult = ERROR_MESSAGE.MISSING_REQUEST_DATA_ERROR;
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toHaveProperty('requests');
          expect(rqBody).toEqual(expectBodys);
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

      const addRecordResult = recordModule.addAllRecords(appID);
      return addRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResult);
      });
    });

    it('[Record-290] Error will be displayed when adding record without data for required field', () => {

      const appID = 1;
      const recordsData = [];
      const NUMBER_RECORDS = 2;
      const expectBodys = {'requests': []};
      for (let index = 0; index < NUMBER_RECORDS; index++) {
        recordsData.push({
          Text: {
            value: ''
          }
        });

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
      }
      const expectResults = ERROR_MESSAGE.MISSING_REQUIRED_FIELD_ADD_RECORD_ERROR;

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
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResults);
      const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });

    it('[Record-295] Error will display when user does not have Add records permission for app', () => {
      const appID = 1;
      const recordsData = [];
      const NUMBER_RECORDS = 2;
      const expectBodys = {'requests': []};
      for (let index = 0; index < NUMBER_RECORDS; index++) {
        recordsData.push({
          Text: {
            value: ''
          }
        });

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
      }
      const expectResults = ERROR_MESSAGE.PERMISSION_ERROR;

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
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResults);
      const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });

    it('[Record-299] The error will be displayed when adding data system fields', () => {
      const appID = 1;
      const recordsData = [];
      const NUMBER_RECORDS = 2;
      const expectBodys = {'requests': []};
      for (let index = 0; index < NUMBER_RECORDS; index++) {
        recordsData.push({
          Created_by: {
            value: ''
          }
        });

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
      }
      const expectResults = ERROR_MESSAGE.ADD_RECORD_SYSTEM_FIELD_WITHOUT_ADMIN_PERMISSION;

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
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN_VALUE);
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResults);
      const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addRecordsResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(expectResults);
      });
    });

    it('[Record-331] Handle error in bulk', () => {
      const appID = 4;
      const recordsDataLenght = 6000;
      const recordsData = [];
      const expectBodys = {'requests': []};
      const expectResultsBulk1 = {'results': []};
      const expectResultsBulk2 = {'results': []};
      const resultsIds = [];
      const resultsRevisons = [];
      for (let index = 0; index < recordsDataLenght; index++) {
        recordsData.push({
          Text_0: {
            value: 'test'
          }
        });
        resultsIds.push(index);
        resultsRevisons.push(index);
      }

      for (let index = 0; index < Math.ceil(recordsDataLenght / API_ROUTE.UPDATE_RECORDS_LIMIT); index++) {
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
        if (index < API_ROUTE.BULK_REQUEST_LIMIT) {
          expectResultsBulk1.results.push({
            'ids': resultsIds.slice(start, end),
            'revisions': resultsRevisons.slice(start, end)
          });

          if (index === 0) {
            const error = ERROR_MESSAGE.UPDATE_RECORD_CREATED_AT_ERROR;
            expectResultsBulk2.results.push(error);
          } else {
            expectResultsBulk2.results.push({});
          }
        }
      }
      nock(URI)
        .post(API_ROUTE.BULK_REQUEST, (rqBody) => {
          const expecrtBodysBukl1 = {'requests': expectBodys.requests.slice(0, API_ROUTE.BULK_REQUEST_LIMIT)};
          expect(rqBody).toEqual(expecrtBodysBukl1);
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
        .reply(200, expectResultsBulk1)
        .post(API_ROUTE.BULK_REQUEST, (rqBody) => {
          const expectBodysBukl2 = {'requests': expectBodys.requests.slice(API_ROUTE.BULK_REQUEST_LIMIT, (API_ROUTE.BULK_REQUEST_LIMIT * 2))};
          expect(rqBody).toEqual(expectBodysBukl2);
          return true;
        })
        .reply(404, expectResultsBulk2);

      const addAllRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
      return addAllRecordsResult.catch((error) => {
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
