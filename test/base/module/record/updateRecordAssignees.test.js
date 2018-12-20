
/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');

const common = require('../../utils/common');

const {Connection, Auth, Record, KintoneAPIException} = require(common.MAIN_PATH);
const RECORDS_ASSIGNEES_ROUTE = '/k/v1/record/assignees.json';
const RECORDS_ASSIGNEES_GUEST_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/record/assignees.json`;
const URI = 'https://' + common.DOMAIN;

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);
const recordModule = new Record(conn);

const connGuest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const recordAssignee = new Record(connGuest);

const authAPI = new Auth();
authAPI.setApiToken(common.API_TOKEN);
const connAPI = new Connection(common.DOMAIN, authAPI);
const recordAssigneeAPI = new Record(connAPI);

describe('UpdateRecordAssignees function', () => {
  describe('common case', () => {
    const data = {
      app: 1,
      id: 1,
      assignees: ['user1'],
      revision: 2
    };

    it('should return a promise', () => {
      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`)
        .reply(200, {'revision': '3'});
      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.appID, data.assignees, data.revision);
      expect(updateRecordAssigneesResult).toHaveProperty('then');
      expect(updateRecordAssigneesResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Record-155] Valid data - should update successfully the assignee of the record', () => {
      const data = {
        app: 1,
        id: 1,
        assignees: ['user1'],
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
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
      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-157] The assignees of the record are updated successfully', () => {
      const data = {
        app: 1,
        id: 1,
        assignees: ['user1', 'user3', 'user4'],
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
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
      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-163] Only 1 assignee when adding duplicate assignees for 1 record', () => {
      const data = {
        app: 1,
        id: 1,
        assignees: ['user1', 'user1'],
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
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
      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-158] Verify it is able to add 100 assignees for the record', () => {
      const number = 100;
      const data = {
        app: 1,
        id: 1,
        assignee: 'user6',
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.assignees).toMatchObject(common.generateRecord(number, data.assignee));
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
      const updateAssignees = recordModule.updateRecordAssignees(data.app, data.id, common.generateRecord(number, data.assignee), data.revision);
      return updateAssignees.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-173] The record is added successfully for app in guest space', () => {
      const data = {
        app: 1,
        id: 1,
        assignees: ['user1'],
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_GUEST_ROUTE}`, (rqBody) => {
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
      const updateRecordAssigneesResult = recordAssignee.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-174] The function still work correctly when executing with interger as string type', () => {
      const data = {
        app: '1',
        id: '1',
        assignees: ['user1', 'user3', 'user4'],
        revision: 2
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
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
      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-162] Ignore the revision and the assignee is updated correctly', () => {
      const data = {
        app: 1,
        id: 1,
        assignees: ['user1', 'user3', 'user4'],
        revision: -1
      };

      const expectResult = {'revision': '3'};

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
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
      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('Error case', () => {
    it('[Record-156] Error is displayed when changing status with multiple assignee for Complete/Not Start status', () => {
      const data = {
        app: 1,
        id: 1,
        assignees: ['user1', 'user2'],
        revision: 2
      };

      const expectResult = {
        'code': 'GAIA_TO02',
        'id': 'nLO8Tjp9dRmIRkHclTFj',
        'message': 'Only one assignee can be set to "Completed".'
      };

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(502, expectResult);

      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-159] The error is displayed when adding more than 100 assignees', () => {
      const number = 105;
      const data = {
        app: 1,
        id: 1,
        assignee: 'user1',
        revision: 2
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'w2gU8q13XMtVmYHZRe8K',
        'message': 'Missing or invalid input.',
        'errors': {
          'assignees': {
            'messages': [
              'size must be between 0 and 100'
            ]
          }
        }
      };

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.assignees).toMatchObject(common.generateRecord(number, data.assignee));
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
      const updateAssignees = recordModule.updateRecordAssignees(data.app, data.id, common.generateRecord(number, data.assignee), data.revision);
      return updateAssignees.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-161] Errror is displayed when the revision is not correct', () => {
      const data = {
        app: 1,
        id: 1,
        assignees: ['user1', 'user2'],
        revision: 2
      };

      const expectResult = {
        'id': '8NHtbwNLY3RFK99etdW0',
        'code': 'GAIA_CO02',
        'message': 'The revision is not the latest. Someone may update a record.',
      };

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);

      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-164] Errror happens when adding wrong/unexisted assignee for 1 record', () => {
      const data = {
        app: 1,
        id: 1,
        assignees: ['user_notexist'],
        revision: 2
      };

      const expectResult = {
        'code': 'GAIA_IL26',
        'id': 'XCqDduel9hphcC8T3jxv',
        'message': 'The specified user (code：user_notexist) not found.'
      };

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(520, expectResult);

      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-169] The error will be displayed when using invalid app ID', () => {
      const data = {
        app: 'abc',
        id: 1,
        assignees: ['user1', 'user2'],
        revision: 2
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'nFhw4mcY6M8m8F0dOMfR',
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
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);

      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-170] The error will be displayed when using method without app ID', () => {
      const data = {
        id: 1,
        assignees: ['user1'],
        revision: 2
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'iN6cXz14UBJ0LLTCGczG',
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
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);

      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(undefined, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-165-166-167] Error happens when user does not have Edit permission for app/record/fields', () => {
      const data = {
        app: 2,
        id: 2,
        assignees: ['user2'],
        revision: 3
      };

      const expectResult = {
        'code': 'CB_NO02',
        'id': 'BU2JLXsaYblJJCgsAiLj',
        'message': 'No privilege to proceed.'
      };

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);

      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-168] Error happens when API token does not have Manage App permission', () => {
      const data = {
        app: 2,
        id: 2,
        assignees: ['user2'],
        revision: 3
      };

      const expectResult = {
        'code': 'CB_NO02',
        'id': 'BU2JLXsaYblJJCgsAiLj',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`)
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toEqual(common.API_TOKEN);
          return true;
        })
        .reply(403, expectResult);

      const updateRecordAssigneesResult = recordAssigneeAPI.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-171] The error will be displayed when using method without record ID', () => {
      const data = {
        app: 1,
        assignees: ['user1'],
        revision: 2
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': '2RrRnAjsbSSmMCbbDdFP',
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
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);

      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, undefined, data.assignees, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-172] The error will be displayed when using method without assignee', () => {
      const data = {
        app: 1,
        id: 1,
        revision: 2
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': '2RrRnAjsbSSmMCbbDdFP',
        'message': 'Missing or invalid input.',
        'errors': {
          'assignees': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);

      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, undefined, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-175] The error will be displayed when the process management featured is disabled', () => {
      const data = {
        app: '1',
        id: '1',
        assignees: ['user1'],
        revision: 3
      };

      const expectResult = {
        'code': 'GAIA_ST02',
        'id': 'hxVlUe2TXGIMQp13HuwQ',
        'message': 'Your request failed. The process management feature has been disabled.'
      };

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(520, expectResult);

      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-160] Invalid id - should return error when using unexist record id', () => {
      const data = {
        app: 1,
        id: 22,
        assignees: ['user1'],
        revision: 2
      };

      const expectResult = {'code': 'GAIA_RE01', 'id': '8PePOAQMHkWHWeynRPjQ', 'message': 'The specified record (ID: 22) is not found.'};

      nock(URI)
        .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .reply(404, expectResult);
      const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data.app, data.id, data.assignees, data.revision);
      return updateRecordAssigneesResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});