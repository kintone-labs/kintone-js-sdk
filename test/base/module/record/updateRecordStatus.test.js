
/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');

const common = require('../../utils/common');

const {Connection, Auth, Record, KintoneAPIException} = require(common.MAIN_PATH);
const RECORD_STATUS_ROUTE = '/k/v1/record/status.json';
const RECORD_STATUS_GUEST_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/record/status.json`;
const URI = 'https://' + common.DOMAIN;

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);
const recordModule = new Record(conn);

const connGuest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const recordStatus = new Record(connGuest);

describe('updateRecordStatus function', () => {
  describe('common case', () => {
    const data = {
      app: 1,
      id: 1,
      action: 'Submit',
      assignee: 'user1',
      revision: 2
    };

    it('should return a promise', () => {
      nock(URI)
        .put(RECORD_STATUS_ROUTE)
        .reply(200, {'revision': '3'});
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.appID, data.action, data.assignee, data.revision);
      expect(updateRecordStatusResult).toHaveProperty('then');
      expect(updateRecordStatusResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Record-177] Valid data - Status and Assignee', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Submit',
        assignee: 'user1',
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-176] Valid data - Status only - Verify the status is changed correctly', () => {
      const data = {
        app: 2,
        id: 2,
        action: 'Completed',
        revision: 3
      };

      const expectResult = {'revision': '4'};

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, undefined, data.revision);
      return updateRecordStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-179] Verify the localized status is changed correctly (EN/JP/ZH) when the localization feature is enabled', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'スタート',
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, undefined, data.revision);
      return updateRecordStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-187] Ignore the revision and the status is updated correctly', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Submit',
        revision: -1
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, undefined, data.revision);
      return updateRecordStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-197] The record is added successfully for app in Guest Space', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Submit',
        assignee: 'user1',
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(RECORD_STATUS_GUEST_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordStatus.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-180] Verify "User chooses one assignee from the list to take action" is not set, can change status without assignee', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Submit',
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, undefined, data.revision);
      return updateRecordStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-189] The status is changed correctly when the current user is the Assignee of the record', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Submit',
        assignee: 'user2',
        revision: -1
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-198] The function still work correctly when executing with interger as string type', () => {
      const data = {
        app: '1',
        id: '1',
        action: 'Submit',
        assignee: 'user1',
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[Record-181] Verify "User chooses one assignee from the list to take action" is set, error when change status without assignee', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Start',
        revision: 2
      };

      const expectResult = {
        'code': 'GAIA_SA01',
        'id': 'r564zRh5fJGmtEpjwPbN',
        'message': 'Assignee is required.'
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
        .reply(403, expectResult);
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, undefined, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-182] Error is displayed when changing status with assignee for Complete/Not Start status', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Start',
        assignee: 'user1',
        revision: 2
      };

      const expectResult = {
        'code': 'GAIA_SA04',
        'id': 'de8MGDsxTZI4VNqn73eo',
        'message': 'Failed to update status. Assignee cannot be specified by the action.'
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-183] Errror is displayed when the status is not correct', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Error_status',
        assignee: 'user1',
        revision: 2
      };

      const expectResult = {
        'code': 'GAIA_IL03',
        'id': '91V2E4UIkuDwngsE6lcq',
        'message': 'Failed to update the status. The settings or the status itself may have been changed by someone.'
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-185] Errror happens when adding invalid/unexisted assignee for 1 record', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Start',
        assignee: 'unexist_user',
        revision: 2
      };

      const expectResult = {
        'code': 'GAIA_IL26',
        'id': 'TXtbWfmtL3vpCffesUzH',
        'message': 'The specified user (code：unexist_user) not found.'
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-186] Error is displayed when the revision is not correct', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Start',
        assignee: 'user1',
        revision: 'abc'
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'sRXKNwyq9vSkZlddzsl1',
        'message': 'Missing or invalid input.',
        'errors': {
          'revision': {
            'messages': [
              'Enter an integer value.'
            ]
          }
        }
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-188] Error is displayed when changing status with the record that already has Assignee', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Submit',
        assignee: 'user1',
        revision: -1
      };

      const expectResult = {
        'code': 'GAIA_NT01',
        'id': 'YysgGE3vcpRU4G9ZQyvA',
        'message': 'Only Assignee can change the status.'
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
        .reply(403, expectResult);
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-193] The error will be displayed when using invalid app ID', () => {
      const data = {
        app: 100000,
        id: 1,
        action: 'Submit',
        assignee: 'user1',
        revision: -1
      };

      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'odSa5TDi8wU7UlpGfck3',
        'message': 'The app (ID: 100000) not found. The app may have been deleted.'
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-194] The error will be displayed when using method without app ID', () => {
      const data = {
        id: 1,
        action: 'Submit',
        assignee: 'user1',
        revision: -1
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'tdTAK2tvpfssOCADPUwR',
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
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(undefined, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-195] The error will be displayed when using method without record ID', () => {
      const data = {
        app: 1,
        action: 'Submit',
        assignee: 'user1',
        revision: -1
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'xQLcu61tMGhM0IQa7zwN',
        'message': 'Missing or invalid input.',
        'errors': {
          'id': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, undefined, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-196] The error will be displayed when using method without assignee', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Testing',
        revision: -1
      };

      const expectResult = {
        'code': 'GAIA_SA01',
        'id': 'r564zRh5fJGmtEpjwPbN',
        'message': 'Assignee is required.'
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, undefined, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-199] The error will be displayed when the process management featured is disabled', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Submit',
        assignee: 'user1',
        revision: -1
      };

      const expectResult = {
        'code': 'GAIA_ST02',
        'id': 'vrNS6L86jbDgFZAGe5lT',
        'message': 'Your request failed. The process management feature has been disabled.'
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-178] Change status not assignee', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Submit',
        assignee: 'user1',
        revision: 2
      };

      const expectResult = {'code': 'GAIA_NT01', 'id': '4UPEpLZKYpZfju46I3wm', 'message': 'Only Assignee can change the status.'};

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .reply(403, expectResult);
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-190-191-192] Error happens when user does not have View permission for app/field/record', () => {
      const data = {
        app: 1,
        id: 1,
        action: 'Submit',
        assignee: 'user1',
        revision: -1
      };

      const expectResult = {
        'code': 'CB_NO02',
        'id': '46babHd1VN5DSm4vAOZU',
        'message': 'No privilege to proceed.'
      };

      nock(URI)
        .put(RECORD_STATUS_ROUTE, (rqBody) => {
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
      const updateRecordStatusResult = recordModule.updateRecordStatus(data.app, data.id, data.action, data.assignee, data.revision);
      return updateRecordStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});