/**
 * kintone api - nodejs client
 * test record module
 */

const nock = require('nock');

const common = require('../../../utils/common');

const {Connection, Auth, Record, KintoneAPIException} = require(common.MAIN_PATH_BASE);
const ERROR_MESSAGE = require(common.ERROR_MESSAGE);
const {API_ROUTE, URI} = require('../../../utils/constant');

const auth = new Auth();
auth.setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});


const conn = new Connection({domain: common.DOMAIN, auth: auth});
const recordModule = new Record({connection: conn});

const connGuest = new Connection({domain: common.DOMAIN, auth: auth, guestSpaceID: common.GUEST_SPACEID});
const recordModuleGuest = new Record({connection: connGuest});

describe('getAllRecordsByQuery function', () => {
  describe('success case', () => {
    it('[Record-270] Verify the records are returned correctly (query, fields, totalCount)', () => {
      const body = {
        app: 844,
        query: 'Created_datetime = TODAY()',
        totalCount: true,
        fields: ['recordID']
      };

      const recordsData = [];
      const recordsDataLenght = 560;
      const expectResponsePerRequest = [];
      for (let index = 0; index < recordsDataLenght; index++) {
        recordsData.push(
          {
            'recordID': {
              'type': 'RECORD_NUMBER',
              'value': index + 1
            }
          });
      }

      for (let index = 0; index < Math.ceil(recordsDataLenght / API_ROUTE.GET_RECORDS_LIMIT); index++) {
        const start = index * API_ROUTE.GET_RECORDS_LIMIT;
        const end = recordsDataLenght - start < API_ROUTE.GET_RECORDS_LIMIT ? recordsDataLenght : start + API_ROUTE.GET_RECORDS_LIMIT;
        expectResponsePerRequest.push({
          'records': recordsData.slice(start, end)
        });
      }

      const expectResponse = {
        'records': recordsData,
        'totalCount': recordsDataLenght
      };

      let expectURL1 = `${API_ROUTE.RECORDS}?app=${body.app}`;
      expectURL1 += `&query=${encodeURIComponent(`${body.query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`;
      expectURL1 += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
      let expectURL2 = `${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query + ' limit 500 offset 500')}`;
      expectURL2 += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
      nock(URI)
        .get(expectURL1)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResponsePerRequest[0])
        .get(expectURL2)
        .reply(200, expectResponsePerRequest[1]);
      return recordModule.getAllRecordsByQuery(body)
        .then(rsp => {
          expect(rsp).toHaveProperty('records');
          expect(rsp).toMatchObject(expectResponse);
        });
    });
    it('[Record-273] The records are still returned when querying with invalid fields but the invalid fields are not returned', () => {
      const body = {
        app: '844',
        query: 'Created_datetime = TODAY()',
        totalCount: true,
        fields: ['recordID', 'abc']
      };

      const recordsData = [];
      const recordsDataLenght = 260;
      for (let index = 0; index < recordsDataLenght; index++) {
        recordsData.push(
          {
            'recordID': {
              'type': 'RECORD_NUMBER',
              'value': index + 1
            }
          });
      }

      const expectResponse = {
        'records': recordsData,
        'totalCount': recordsDataLenght
      };

      let expectURL = `${API_ROUTE.RECORDS}?app=${body.app}`;
      expectURL += `&query=${encodeURIComponent(`${body.query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`;
      expectURL += `&fields[0]=${body.fields[0]}&fields[1]=${body.fields[1]}&totalCount=${body.totalCount}`;
      nock(URI)
        .get(expectURL)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResponse);
      return recordModule.getAllRecordsByQuery(body)
        .then(rsp => {
          expect(rsp).toHaveProperty('records');
          expect(rsp).toMatchObject(expectResponse);
        });
    });
    it('[Record-278] When user does not have View permission for field, the data of this field is not displayed', () => {
      const body = {
        app: '844',
        query: 'Created_datetime = TODAY()',
        totalCount: true,
        fields: ['recordID', 'abc']
      };

      const recordsData = [{
        'recordID': {
          'type': 'RECORD_NUMBER',
          'value': 1
        }
      }];

      const expectResponse = {
        'records': recordsData,
        'totalCount': 1
      };

      let expectURL = `${API_ROUTE.RECORDS}?app=${body.app}`;
      expectURL += `&query=${encodeURIComponent(`${body.query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`;
      expectURL += `&fields[0]=${body.fields[0]}&fields[1]=${body.fields[1]}&totalCount=${body.totalCount}`;
      nock(URI)
        .get(expectURL)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResponse);
      return recordModule.getAllRecordsByQuery(body)
        .then(rsp => {
          expect(rsp).toHaveProperty('records');
          expect(rsp).toMatchObject(expectResponse);
        });
    });
    it('[Record-279] Verify record data displays when getting the record of app in guest space', () => {
      const body = {
        app: '844',
        query: 'Created_datetime = TODAY()',
        totalCount: true,
        fields: ['recordID']
      };

      const recordsData = [{
        'recordID': {
          'type': 'RECORD_NUMBER',
          'value': 1
        }
      }];

      const expectResponse = {
        'records': recordsData,
        'totalCount': 1
      };
      let expectURL = `${API_ROUTE.GUEST_RECORDS}?app=${body.app}`;
      expectURL += `&query=${encodeURIComponent(`${body.query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`;
      expectURL += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
      nock(URI)
        .get(expectURL)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResponse);
      return recordModuleGuest.getAllRecordsByQuery(body)
        .then(rsp => {
          expect(rsp).toHaveProperty('records');
          expect(rsp).toMatchObject(expectResponse);
        });
    });
    it('[Record-280] The record data is still displayed when executing with ID as string type (input string for interger)', () => {
      const body = {
        app: '844',
        query: 'Created_datetime = TODAY()',
        totalCount: true,
        fields: ['recordID']
      };

      const recordsData = [];
      const recordsDataLenght = 260;
      for (let index = 0; index < recordsDataLenght; index++) {
        recordsData.push(
          {
            'recordID': {
              'type': 'RECORD_NUMBER',
              'value': index + 1
            }
          });
      }

      const expectResponse = {
        'records': recordsData,
        'totalCount': recordsDataLenght
      };

      let expectURL = `${API_ROUTE.RECORDS}?app=${body.app}`;
      expectURL += `&query=${encodeURIComponent(`${body.query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`;
      expectURL += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
      nock(URI)
        .get(expectURL)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResponse);
      return recordModule.getAllRecordsByQuery(body)
        .then(rsp => {
          expect(rsp).toHaveProperty('records');
          expect(rsp).toMatchObject(expectResponse);
        });
    });
    it('[Record-281] Verify the number of records that can be retrieved up to 1500 records', () => {
      const body = {
        app: 844,
        query: 'Created_datetime = TODAY()',
        totalCount: true,
        fields: ['recordID']
      };

      const recordsData = [];
      const recordsDataLenght = 1550;
      const expectResponsePerRequest = [];
      for (let index = 0; index < recordsDataLenght; index++) {
        recordsData.push(
          {
            'recordID': {
              'type': 'RECORD_NUMBER',
              'value': index + 1
            }
          });
      }

      for (let index = 0; index < Math.ceil(recordsDataLenght / API_ROUTE.GET_RECORDS_LIMIT); index++) {
        const start = index * API_ROUTE.GET_RECORDS_LIMIT;
        const end = recordsDataLenght - start < API_ROUTE.GET_RECORDS_LIMIT ? recordsDataLenght : start + API_ROUTE.GET_RECORDS_LIMIT;
        expectResponsePerRequest.push({
          'records': recordsData.slice(start, end)
        });
      }

      const expectResponse = {
        'records': recordsData,
        'totalCount': recordsDataLenght
      };

      let expectURL1 = `${API_ROUTE.RECORDS}?app=${body.app}`;
      expectURL1 += `&query=${encodeURIComponent(`${body.query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`;
      expectURL1 += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
      let expectURL2 = `${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query + ' limit 500 offset 500')}`;
      expectURL2 += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
      let expectURL3 = `${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query + ' limit 500 offset 1000')}`;
      expectURL3 += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
      let expectURL4 = `${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query + ' limit 500 offset 1500')}`;
      expectURL4 += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
      nock(URI)
        .get(expectURL1)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResponsePerRequest[0])
        .get(expectURL2)
        .reply(200, expectResponsePerRequest[1])
        .get(expectURL3)
        .reply(200, expectResponsePerRequest[2])
        .get(expectURL4)
        .reply(200, expectResponsePerRequest[3]);
      return recordModule.getAllRecordsByQuery(body)
        .then(rsp => {
          expect(rsp).toHaveProperty('records');
          expect(rsp).toMatchObject(expectResponse);
        });
    });

  });
  describe('error case', () => {
    it('[Record-271] The error will be displayed when using invalid app ID (unexisted, negative number, 0)', () => {
      const body = {
        app: 9999999,
        query: 'Created_datetime = TODAY()'
      };

      const expectResult = ERROR_MESSAGE.NONEXISTENT_APP_ID_ERROR;
      expectResult.message.replace('%VARIABLE', body.app);

      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(`${body.query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(520, expectResult);
      return recordModule.getAllRecordsByQuery(body)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    it('[Record-272] The error will be displayed when using invalid query', () => {
      const body = {
        app: 9999999,
        query: 'Created_datetime = ""'
      };

      const expectResult = ERROR_MESSAGE.INVALID_QUERY_GET_DATA_ERROR;

      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(`${body.query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(520, expectResult);
      return recordModule.getAllRecordsByQuery(body)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    it('[Record-274] The error will be displayed when using invalid isTotalCount', () => {
      const body = {
        app: 99,
        query: 'Created_datetime = ""'
      };

      const expectResult = ERROR_MESSAGE.INVALID_TOTAL_COUNT_ERROR;

      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(`${body.query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(520, expectResult);
      return recordModule.getAllRecordsByQuery(body)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    it('[Record-275] The error will be displayed when using method without app ID', () => {
      const body = {
        query: 'Created_datetime = ""'
      };

      const expectResult = ERROR_MESSAGE.MISSING_APP_ERROR;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?query=${encodeURIComponent(`${body.query} limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(520, expectResult);
      return recordModule.getAllRecordsByQuery(body)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    it('[Record-276] Error will display when user does not have View records permission for the app', () => {
      const expectResult = ERROR_MESSAGE.PERMISSION_ERROR;
      const appId = 1;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appId}&query=${encodeURIComponent(`limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(520, expectResult);
      return recordModule.getAllRecordsByQuery({app: appId})
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    it('[Record-277] Error will display when user does not have View records permission for the record', () => {
      const expectResult = ERROR_MESSAGE.PERMISSION_ERROR;
      const appID = 1;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${appID}&query=${encodeURIComponent(`limit ${API_ROUTE.GET_RECORDS_LIMIT} offset 0`)}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(520, expectResult);
      return recordModule.getAllRecordsByQuery({app: appID})
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
  });
});

