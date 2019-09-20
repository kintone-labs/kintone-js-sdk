const nock = require('nock');
const common = require('../../../utils/common');
const {API_ROUTE, URI} = require('../../../utils/constant');
const {KintoneAPIException, Connection, Auth, Record} = require(common.MAIN_PATH_BASE);
const ERROR_MESSAGE = require(common.ERROR_MESSAGE);

const auth = new Auth().setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});

const conn = new Connection({domain: common.DOMAIN, auth: auth});
const recordModule = new Record({connection: conn});

const guestConnParam = {domain: common.DOMAIN, auth: auth, guestSpaceID: common.GUEST_SPACEID};
const connGuest = new Connection(guestConnParam);
const recordModuleGuest = new Record({connection: connGuest});

const appID = 1;

describe('updateAllRecords function', () => {
  describe('success case', () => {
    it('[Record-300] - The records are updated successfully, the revision is increased by 1 after update (valid id)', () => {
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

      const updateAllRecordsResult = recordModule.updateAllRecords({app: appID, records: recordsData});
      return updateAllRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
      });
    });
    it('[Record-301] - The records are updated successfully, the revision is increased by 1 after update (valid keyfield)', () => {
      const recordsData = [];
      const recordsDataLenght = 200;
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const results = [];
      for (let index = 0; index < recordsDataLenght; index++) {
        recordsData.push({
          keyField: index + 1,
          record: {
            Text_0: 'test'
          },
          revision: 2
        });
        results.push({
          id: index + 1,
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

      const updateAllRecordsResult = recordModule.updateAllRecords({app: appID, records: recordsData});
      return updateAllRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
      });
    });
    it('[Record-302] - The records are still updated successfully, the revision is increased by 1 after update', () => {
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const recordsData = [
        {
          id: 1,
          record: {
            Text_0: 'test'
          },
          revision: -1
        }
      ];
      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'PUT',
        'payload': {
          'app': appID,
          'records': recordsData
        }
      });

      expectResults.results.push({
        id: 1,
        revision: 3
      });

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

      const updateAllRecordsResult = recordModule.updateAllRecords({app: appID, records: recordsData});
      return updateAllRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
      });
    });
    it('[Record-312] - The field will be skipped when there is record with invalid field in the records array', () => {
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const recordsData = [
        {
          id: 1,
          record: {
            Text_0: 'test',
            Text_1: 'test'
          },
          revision: -1
        }
      ];
      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'PUT',
        'payload': {
          'app': appID,
          'records': recordsData
        }
      });

      expectResults.results.push({
        id: 1,
        revision: 3
      });

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

      const updateAllRecordsResult = recordModule.updateAllRecords({app: appID, records: recordsData});
      return updateAllRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
      });
    });
    it('[Record-313] - The field will be skipped when there is record with invalid field in the records array', () => {
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const recordsData = [
        {
          id: 1,
          record: {
            Text_0: 'test',
            Text_1: 'test'
          },
          revision: -1
        }
      ];
      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'PUT',
        'payload': {
          'app': appID,
          'records': recordsData
        }
      });

      expectResults.results.push({
        id: 1,
        revision: 3
      });

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

      const updateAllRecordsResult = recordModule.updateAllRecords({app: appID, records: recordsData});
      return updateAllRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
      });
    });
    it('[Record-316] - Verify the list of record with attachment is added successfully', () => {
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const recordsData = [
        {
          id: 1,
          record: {
            Text_0: 'test',
            'attachmentfield': {
              'type': 'FILE',
              'value': [
                {
                  'contentType': 'image/jpeg',
                  'fileKey': '20150401060837BAC36C350D4E4AA5A736689A5875248E042',
                  'name': 'animals.jpg',
                  'size': '777835'
                }
              ]
            }
          },
          revision: -1
        }
      ];
      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'PUT',
        'payload': {
          'app': appID,
          'records': recordsData
        }
      });

      expectResults.results.push({
        id: 1,
        revision: 3
      });

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

      const updateAllRecordsResult = recordModule.updateAllRecords({app: appID, records: recordsData});
      return updateAllRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
      });
    });
    it('[Record-317] - Verify the data for record with table is added successfully', () => {
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const recordsData = [
        {
          id: 1,
          record: {
            Text_0: 'test',
            'table': {
              'type': 'SUBTABLE',
              'value': [
                {
                  'id': '48277',
                  'value': {
                    'textfield_0': {
                      'type': 'SINGLE_LINE_TEXT',
                      'value': 'Hello Kintone 1'
                    }
                  }
                }
              ]
            }
          },
          revision: -1
        }
      ];
      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'PUT',
        'payload': {
          'app': appID,
          'records': recordsData
        }
      });

      expectResults.results.push({
        id: 1,
        revision: 3
      });

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

      const updateAllRecordsResult = recordModule.updateAllRecords({app: appID, records: recordsData});
      return updateAllRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
      });
    });
    it('[Record-318] - Guest Space - The record full data is updated successfully, the revision is increased by 1 after update', () => {
      const recordsData = [];
      const recordsDataLenght = 200;
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const results = [];
      for (let index = 0; index < recordsDataLenght; index++) {
        recordsData.push({
          keyField: index + 1,
          record: {
            Text_0: 'test'
          },
          revision: 2
        });
        results.push({
          id: index + 1,
          revision: index > 100 ? 4 : 3
        });
      }

      for (let index = 0; index < Math.ceil(recordsDataLenght / API_ROUTE.UPDATE_RECORDS_LIMIT); index++) {
        const start = index * API_ROUTE.UPDATE_RECORDS_LIMIT;
        const end = start + API_ROUTE.UPDATE_RECORDS_LIMIT;
        expectBodys.requests.push({
          'api': API_ROUTE.GUEST_RECORDS,
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
        .post(API_ROUTE.GUEST_BULK_REQUEST, (rqBody) => {
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

      const updateAllRecordsResult = recordModuleGuest.updateAllRecords({app: appID, records: recordsData});
      return updateAllRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
      });
    });
    it('[Record-319] - The function still work correctly when executing with interger as string type (input string for interger and vice versa)', () => {
      const stringAppID = '1';
      const recordsData = [];
      const recordsDataLenght = 200;
      const expectBodys = {'requests': []};
      const expectResults = {'results': []};
      const results = [];
      for (let index = 0; index < recordsDataLenght; index++) {
        recordsData.push({
          keyField: index + 1,
          record: {
            Text_0: 'test'
          },
          revision: 2
        });
        results.push({
          id: index + 1,
          revision: index > 100 ? 4 : 3
        });
      }

      for (let index = 0; index < Math.ceil(recordsDataLenght / API_ROUTE.UPDATE_RECORDS_LIMIT); index++) {
        const start = index * API_ROUTE.UPDATE_RECORDS_LIMIT;
        const end = start + API_ROUTE.UPDATE_RECORDS_LIMIT;
        expectBodys.requests.push({
          'api': API_ROUTE.GUEST_RECORDS,
          'method': 'PUT',
          'payload': {
            'app': stringAppID,
            'records': recordsData.slice(start, end)
          }
        });
        expectResults.results.push({
          'records': results.slice(start, end)
        });
      }

      nock(URI)
        .post(API_ROUTE.GUEST_BULK_REQUEST, (rqBody) => {
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

      const updateAllRecordsResult = recordModuleGuest.updateAllRecords({app: stringAppID, records: recordsData});
      return updateAllRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('results');
        expect(rsp).toMatchObject(expectResults);
      });
    });
  });

  describe('error case', () => {
    it('[Record-303] The error will occur and record is not updated wrong revision', () => {
      const expectBodys = {'requests': []};
      const recordsData = [
        {
          id: 1,
          record: {
            Text_0: 'test'
          },
          revision: 3
        }
      ];
      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'PUT',
        'payload': {
          'app': appID,
          'records': recordsData
        }
      });
      const error = ERROR_MESSAGE.INCORRECT_REVISION_RECORD_ERROR;
      const expectResult = {
        results: [error]
      };

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
        .reply(404, expectResult);

      const updateAllRecordsResult = recordModule.updateAllRecords({app: appID, records: recordsData});
      return updateAllRecordsResult.catch((err) => {
        expect(err).toHaveProperty('results');
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-304] - Error is displayed when updating these fields:( Created by, Updated by, Created datetime , Updated datetime)', () => {
      const recordsData = {
        'app': appID,
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
      const error = ERROR_MESSAGE.UPDATE_RECORD_CREATED_AT_ERROR;
      const expectResult = {
        results: [error]
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
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-305] - Error happens when user does not have Edit permission for app', () => {
      const recordsData = {
        'app': appID,
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
      const error = ERROR_MESSAGE.PERMISSION_ERROR;
      const expectBody = {
        results: [error]
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
        .reply(400, expectBody);

      const getRecordResult = recordModule.updateAllRecords(appID, recordsData.records);
      return getRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-306] - Error happens when user does not have Edit permission for record', () => {
      const recordsData = {
        'app': appID,
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
      const error = ERROR_MESSAGE.PERMISSION_ERROR;
      const expectBody = {
        results: [error]
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
        .reply(400, expectBody);

      const getRecordResult = recordModule.updateAllRecords(appID, recordsData.records);
      return getRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-307] - Error happens when user does not have Edit permission for field', () => {
      const recordsData = {
        'app': appID,
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
      const error = ERROR_MESSAGE.EDIT_RECORD_WITHOUT_FIELD_PERMISSION;
      const expectBody = {
        results: [error]
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
        .reply(400, expectBody);

      const getRecordResult = recordModule.updateAllRecords(appID, recordsData.records);
      return getRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-308] - The error will be displayed when using invalid app ID (unexisted, negative number, 0)', () => {
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
        .reply(400, expectBody);

      const getRecordResult = recordModule.updateAllRecords(-1, recordsData.records);
      return getRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-309] - The error will be displayed when using method without app ID', () => {
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
      const error = ERROR_MESSAGE.MISSING_APP_ERROR;
      const expectBody = {
        results: [error]
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
        .reply(400, expectBody);

      const getRecordResult = recordModule.updateAllRecords(undefined, recordsData.records);
      return getRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-310] - The error will be displayed when using method without records data', () => {
      const error = ERROR_MESSAGE.MISSING_REQUEST_DATA_ERROR;
      const expectBody = {
        results: [error]
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
        .reply(400, expectBody);

      const getRecordResult = recordModule.updateAllRecords(appID);
      return getRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-311] - Error will be displayed when there is record without data for required field in the records arrray', () => {
      const recordsData = {
        'records': [
          {
            'revision': 4,
            'record': {
              'Created_datetime': {
                'value': 'Silver plates'
              }
            }
          }
        ]
      };
      const error = ERROR_MESSAGE.MISSING_REQUEST_DATA_ERROR;
      const expectBody = {
        results: [error]
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
        .reply(400, expectBody);

      const getRecordResult = recordModule.updateAllRecords(undefined, recordsData.records);
      return getRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-313] - The error will be displayed when there is one record has invalid data (text for number field)', () => {
      const recordsData = {
        'records': [
          {
            'revision': 4,
            'record': {
              'Created_datetime': {
                'value': 'Silver plates'
              }
            }
          }
        ]
      };
      const error = ERROR_MESSAGE.MISSING_REQUEST_DATA_ERROR;
      const expectBody = {
        results: [error]
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
        .reply(400, expectBody);

      const getRecordResult = recordModule.updateAllRecords(undefined, recordsData.records);
      return getRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-314] - The error will be displayed when there is one record has invalid data (duplicate data for "prohibit duplicate value" field)', () => {
      const recordsData = {
        'records': [
          {
            'revision': 4,
            'record': {
              'Created_datetime': {
                'value': 'Silver plates'
              },
              'test': {
                'value': '11'
              },
            }
          }
        ]
      };
      const error = ERROR_MESSAGE.INVALID_VALUE_DUPLICATED_ERROR;
      const expectBody = {
        results: [error]
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
        .reply(404, expectBody);

      const getRecordResult = recordModule.updateAllRecords(undefined, recordsData.records);
      return getRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it('[Record-315] - The error will be displayed when there is one record has invalid data (exceed maximum for number field)', () => {
      const recordsData = {
        'records': [
          {
            'revision': 4,
            'record': {
              'number': {
                'value': 45
              }
            }
          }
        ]
      };
      const error = ERROR_MESSAGE.FIELD_NUMBER_LESS_THAN_VALUE_ERROR;
      const expectBody = {
        results: [error]
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
        .reply(404, expectBody);

      const getRecordResult = recordModule.updateAllRecords(undefined, recordsData.records);
      return getRecordResult.catch((err) => {
        expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
        expect(err.results[0].get()).toMatchObject(error);
      });
    });
    it(`[Record-332] - Verify error handling in bulk request`, () => {
      const recordsDataLenght = 6000;
      const recordsData = [];
      const expectBodys = [];
      const expectResultsBulk1 = {'results': []};
      const expectResultsBulk2 = {'results': []};
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
        expectBodys.push({
          'api': API_ROUTE.RECORDS,
          'method': 'PUT',
          'payload': {
            'app': appID,
            'records': recordsData.slice(start, end)
          }
        });
        if (index < API_ROUTE.BULK_REQUEST_LIMIT) {
          expectResultsBulk1.results.push({
            'records': results.slice(start, end)
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
          const expecrtBodysBukl1 = {'requests': expectBodys.slice(0, API_ROUTE.BULK_REQUEST_LIMIT)};
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
          const expecrtBodysBukl2 = {'requests': expectBodys.slice(API_ROUTE.BULK_REQUEST_LIMIT, (API_ROUTE.BULK_REQUEST_LIMIT * 2))};
          expect(rqBody).toEqual(expecrtBodysBukl2);
          return true;
        })
        .reply(404, expectResultsBulk2);

      const updateAllRecordsResult = recordModule.updateAllRecords({app: appID, records: recordsData});
      return updateAllRecordsResult.catch((error) => {
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