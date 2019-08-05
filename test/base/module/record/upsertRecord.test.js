/**
 * kintone api - nodejs client
 * test record module
 */

const nock = require('nock');
const {API_ROUTE, URI} = require('../../../utils/constant');
const common = require('../../../utils/common');

const {Connection, Auth, Record} = require(common.MAIN_PATH_BASE);

const auth = new Auth();
auth.setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});
const conn = new Connection({domain: common.DOMAIN, auth: auth});
const recordModule = new Record({connection: conn});
describe('upsertRecord function', () => {
  describe('success case', () => {
    it('[case 1] can update record', () => {
      const updateKey = {
        field: 'Text_0',
        value: '1234'
      };
      const recordData = {
        Number: {
          value: 1
        }
      };
      const body = {
        app: 844,
        query: `${updateKey.field} = "${updateKey.value}"`,
        fields: [updateKey.field],
        totalCount: false,
      };
      const data = {
        'app': 844,
        'updateKey': updateKey,
        'revision': 2,
        'record': recordData
      };
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, {
          'records': [recordData]
        });
      nock(URI)
        .put(`${API_ROUTE.RECORD}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`,
          (rqBody) => {
            expect(rqBody.record).toEqual(data.record);
            return rqBody.app === body.app;
          })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json;charset=utf-8'));
          return true;
        })
        .reply(200, {'id': '100', 'revision': '1'});
      return recordModule.upsertRecord({app: body.app, updateKey: updateKey, record: recordData})
        .then(rsp => {
          expect(rsp).toHaveProperty('revision');
        });
    });
    it('[case 2] can add record', () => {
      const updateKey = {
        field: 'Text_0',
        value: '1234'
      };
      const recordData = {

        Number: {
          value: 1
        }
      };
      const body = {
        app: 844,
        query: `${updateKey.field} = "${updateKey.value}"`,
        fields: [updateKey.field],
        totalCount: false,
      };
      const data = {
        'app': 844,
        'updateKey': updateKey,
        'revision': 2,
        'record': {
          Text_0: {
            value: '1234'
          },
          Number: {
            value: 1
          }
        }
      };
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, {
          'records': []
        });
      nock(URI)
        .post(`${API_ROUTE.RECORD}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`,
          (rqBody) => {
            expect(rqBody.record).toEqual(data.record);
            return rqBody.app === body.app;
          })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, {'id': '100', 'revision': '1'});
      return recordModule.upsertRecord({app: body.app, updateKey: updateKey, record: recordData})
        .then(rsp => {
          expect(rsp.revision).toBe('1');
          expect(rsp.id).toBe('100');
        });
    });
    it('[case 3] can update record by number field', () => {
      const updateKey = {
        field: 'Text_0',
        value: 1234
      };
      const recordData = {
        Number: {
          value: 1
        }
      };
      const body = {
        app: 844,
        query: `${updateKey.field} = "${updateKey.value}"`,
        fields: [updateKey.field],
        totalCount: false,
      };
      const data = {
        'app': 844,
        'updateKey': updateKey,
        'revision': 2,
        'record': recordData
      };
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, {
          'records': [recordData]
        });
      nock(URI)
        .put(`${API_ROUTE.RECORD}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`,
          (rqBody) => {
            expect(rqBody.record).toEqual(data.record);
            return rqBody.app === body.app;
          })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json;charset=utf-8'));
          return true;
        })
        .reply(200, {'id': '100', 'revision': '1'});
      return recordModule.upsertRecord({app: body.app, updateKey: updateKey, record: recordData})
        .then(rsp => {
          expect(rsp).toHaveProperty('revision');
        });
    });
  });

  describe('error case', () => {
    it('[case 4] should return error when getting multi records by updateKey', () => {
      const updateKey = {
        field: 'Text_0',
        value: 1234
      };
      const recordData = {
        Number: {
          value: 1
        }
      };
      const body = {
        app: 844,
        query: `${updateKey.field} = "${updateKey.value}"`,
        fields: [updateKey.field],
        totalCount: false,
      };
      const message = `${updateKey.field} is not unique field`;
      nock(URI)
        .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, {
          'records': [recordData, recordData]
        });
      return recordModule.upsertRecord({app: body.app, updateKey: updateKey, record: recordData})
        .catch((err) => {
          expect(err.message).toEqual(message);
        });
    });
  });
});
