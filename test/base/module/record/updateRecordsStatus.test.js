
/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');

const common = require('../../utils/common');

const {Connection, Auth, Record, KintoneAPIException} = require(common.MAIN_PATH);
const RECORDS_STATUS_ROUTE = '/k/v1/records/status.json';
const RECORDS_STATUS_GUEST_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/records/status.json`;
const URI = 'https://' + common.DOMAIN;

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);
const recordModule = new Record(conn);

const connGuest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const recordsStatus = new Record(connGuest);

describe('updateRecordsStatus function', () => {
  describe('common case', () => {
    const data = {
      app: 1,
      records: [{
        id: 1,
        action: 'Submit',
        assignee: 'user1',
        revision: 2
      }]
    };
    it('should return a promise', () => {
      nock(URI)
        .put(RECORDS_STATUS_ROUTE)
        .reply(200, {'revision': '3'});
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      expect(updateRecordsStatusResult).toHaveProperty('then');
      expect(updateRecordsStatusResult).toHaveProperty('catch');
    });
  });
  describe('success case', () => {
    it('[Record-200] Valid data should changed successfully the status of the multiple record', () => {
      const data = {
        app: 1,
        records: [{
          id: 1,
          action: 'Submit',
          assignee: 'user1',
          revision: 2
        },
        {
          id: 2,
          action: 'Approve',
          assignee: 'user1',
          revision: 1
        }]
      };

      const expectResult = {
        'records': [{
          'id': '1',
          'revision': '3'
        },
        {
          'id': '2',
          'revision': '2'
        }]
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-201] Verify the records are updated with new statuses and assignees', () => {
      const data = {
        app: 1,
        records: [{
          id: 1,
          action: 'Submit',
          assignee: 'user1',
          revision: 2
        },
        {
          id: 2,
          action: 'Approve',
          assignee: 'user1',
          revision: 1
        }]
      };

      const expectResult = {
        'records': [{
          'id': '1',
          'revision': '3'
        },
        {
          'id': '2',
          'revision': '2'
        }]
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-210] The record is added successfully for app in guest space', () => {
      const data = {
        app: 1,
        records: [{
          id: 10,
          action: 'Submit',
          assignee: 'user2',
          revision: 2
        },
        {
          id: 20,
          action: 'Submit',
          assignee: 'user1',
          revision: 4
        }]
      };

      const expectResult = {
        'records': [{
          'id': '10',
          'revision': '3'
        },
        {
          'id': '20',
          'revision': '5'
        }]
      };

      nock(URI)
        .put(RECORDS_STATUS_GUEST_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, expectResult);
      const updateRecordsStatusResult = recordsStatus.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-211] The function still work correctly when executing with interger as string type', () => {
      const data = {
        app: '20',
        records: [{
          id: '10',
          action: 'Submit',
          assignee: 'user1',
          revision: 2
        },
        {
          id: '10',
          action: 'Submit',
          assignee: 'user2',
          revision: 4
        }]
      };

      const expectResult = {
        'records': [{
          'id': '10',
          'revision': '3'
        },
        {
          'id': '20',
          'revision': '5'
        }]
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-213] Verify the number of records that can be updated at once is 100', () => {
      const number = 100;
      const data = {
        app: '20',
        record: {
          id: '10',
          action: 'Submit',
          assignee: 'user1',
          revision: 2
        }
      };
      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody.app).toBe(data.app);
          expect(rqBody.records).toMatchObject(common.generateRecord(number, data.record));
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
        .reply(200, {'records': {}});
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, common.generateRecord(number, data.record));
      return updateRecordsStatusResult.then((rsp) => {
        expect(rsp).toHaveProperty('records');
      });
    });
  });
  describe('error case', () => {
    it('[Record-203] Error will be displayed when there is record with error in Assignee', () => {
      const data = {
        app: 1,
        records: [{
          id: 1,
          action: 'Submit',
          assignee: 'unexisted_user',
          revision: 2
        },
        {
          id: 2,
          action: 'Submit',
          assignee: 'unexisted_user',
          revision: 3
        }]
      };

      const expectResult = {
        'code': 'GAIA_IL26',
        'id': 'iaQwvEhqv723hIS4V6DG',
        'message': 'The specified user (code：unexisted_user) not found.'
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-204] Error will be displayed when there is record with error in ID', () => {
      const data = {
        app: 1,
        records: [{
          id: 'abc',
          action: 'Submit',
          assignee: 'user1',
          revision: 2
        },
        {
          id: 'abd',
          action: 'Submit',
          assignee: 'user1',
          revision: 3
        }]
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'VO6qddcYmQyHwqhPqud1',
        'message': 'Missing or invalid input.',
        'errors': {
          'records[1].id': {
            'messages': [
              'Enter an integer value.'
            ]
          },
          'records[0].id': {
            'messages': [
              'Enter an integer value.'
            ]
          }
        }
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-205] Error will be displayed when there is record with error in revision', () => {
      const data = {
        app: 1,
        records: [{
          id: 1,
          action: 'Submit',
          assignee: 'user1',
          revision: 'abc'
        },
        {
          id: 2,
          action: 'Submit',
          assignee: 'user1',
          revision: 'abc'
        }]
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'NEszpttsFpGaMUT659VI',
        'message': 'Missing or invalid input.',
        'errors': {
          'records[0].revision': {
            'messages': [
              'Enter an integer value.'
            ]
          },
          'records[1].revision': {
            'messages': [
              'Enter an integer value.'
            ]
          }
        }
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-206] The error will be displayed when using invalid app ID', () => {
      const data = {
        app: 'abc',
        records: [{
          id: 10,
          action: 'Submit',
          assignee: 'user1',
          revision: -1
        },
        {
          id: 20,
          action: 'Submit',
          assignee: 'user2',
          revision: -1
        }]
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'VO7l8xmK9ToZfdRpXjXw',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'Enter an integer value.'
            ]
          }
        }
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-207] The error will be displayed when using method without app ID', () => {
      const data = {
        records: [{
          id: 10,
          action: 'Submit',
          assignee: 'user3',
          revision: -1
        },
        {
          id: 20,
          action: 'Submit',
          assignee: 'user2',
          revision: -1
        }]
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'dHPIvqdeN3ZlPhfHaHQ8',
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
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(undefined, data.records);
      return updateRecordsStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-208] The error will be displayed when using method without record ID', () => {
      const data = {
        app: 20,
        records: [{
          action: 'Submit',
          assignee: 'user1',
          revision: -1
        },
        {
          id: 20,
          action: 'Submit',
          assignee: 'user2',
          revision: -1
        }]
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'VwTXwWEBiNosD8xfrL3w',
        'message': 'Missing or invalid input.',
        'errors': {
          'records[0].id': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.records).toEqual(data.records);
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
        .reply(400, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-209] The error will be displayed when using method without assignee', () => {
      const data = {
        app: 20,
        records: [{
          id: 10,
          action: 'Submit',
          revision: -1
        },
        {
          id: 20,
          action: 'Submit',
          revision: -1
        }]
      };

      const expectResult = {
        'code': 'GAIA_SA01',
        'id': '5j3ige69pKHYyO9037FW',
        'message': 'Assignee is required.'
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(520, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-212] The error will be displayed when the process management featured is disabled', () => {
      const data = {
        app: 1,
        records: [{
          id: 10,
          action: 'Submit',
          assignee: 'user1',
          revision: -1
        },
        {
          id: 20,
          action: 'Submit',
          assignee: 'user2',
          revision: -1
        }]
      };

      const expectResult = {
        'code': 'GAIA_ST02',
        'id': '8fXKy9n8PFNJKRtHgmiz',
        'message': 'Your request failed. The process management feature has been disabled.'
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(520, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-214] Verify the error displays when number of records is > 100', () => {
      const number = 102;
      const data = {
        app: 1,
        record: {
          id: 10,
          action: 'Submit',
          assignee: 'user1',
          revision: -1
        }
      };

      const expectResult = {
        'id': 'Tl0ogUCh0ZMOHSHSzSbB',
        'code': 'CB_VA01',
        'message': 'Missing or invalid input.',
        'errors': {
          'records': {
            'messages': [
              'A maximum of 100 records can be updated at one time.'
            ]
          }
        }
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody.app).toBe(data.app);
          expect(rqBody.records).toMatchObject(common.generateRecord(number, data.record));
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
        .reply(400, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, common.generateRecord(number, data.record));
      return updateRecordsStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-202] should return error when the action name is blank', () => {
      const data = {
        app: 1,
        records: [{
          id: 1,
          action: '',
          assignee: 'user1',
          revision: 2
        }]
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'IARR1iA2jOY5dMzRzVys',
        'message': 'Missing or invalid input.',
        'errors': {
          'records[0].action': {'messages': ['Required field.']}
        }
      };

      nock(URI)
        .put(RECORDS_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .reply(400, expectResult);
      const updateRecordsStatusResult = recordModule.updateRecordsStatus(data.app, data.records);
      return updateRecordsStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});