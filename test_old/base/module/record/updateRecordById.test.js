/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');

const common = require('../../../utils/common');
const {API_ROUTE, URI} = require('../../../utils/constant');
const {KintoneAPIException, Connection, Auth, Record} = require(common.MAIN_PATH_BASE);
const auth = new Auth().setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});
const conn = new Connection({domain: common.DOMAIN, auth: auth});
const recordModule = new Record({connection: conn});

describe('updateRecordById function', () => {
  describe('common case', () => {
    it('[Record-0-common] - should return a promise', () => {
      const data = {
        app: 1,
        id: 1,
        record: {
          Text_0: {
            value: 123
          }
        },
        revision: 2
      };
      nock(URI)
        .put(API_ROUTE.RECORD)
        .reply(200, {'revisions': '1'});

      const updateRecordByIdResult = recordModule.updateRecordByID(data);
      expect(updateRecordByIdResult).toHaveProperty('then');
      expect(updateRecordByIdResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Record-65] - should update successfully the record', () => {
      const data = {
        app: 1,
        id: 1,
        record: {
          Text_0: {
            value: 123
          }
        },
        revision: 2
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {'revision': '3'});

      const updateRecordByIdResult = recordModule.updateRecordByID(data);
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('3');
      });
    });

    it('[Record-66] - should update successfully when the revision is -1', () => {
      const data = {
        app: 1,
        id: 1,
        record: {
          Text_0: {
            value: 123
          }
        },
        revision: -1
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .reply(200, {'revision': '3'});

      const updateRecordByIdResult = recordModule.updateRecordByID(data);
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp).toHaveProperty('revision');
      });
    });
    /**
    * Todo: implement another success case
    */

    /**
     * Data table
     * Verify the data for record with table is added successfully
     */
    it('[Record-82] - should update the data successfully for record with table', () => {
      const recordID = 1;
      const appID = 19;
      const recordDataUpdate = {
        'app': appID,
        'id': recordID,
        'revision': null,
        'record': {
          'Table': {
            'value': [
              {
                'id': '44915',
                'value': {
                  'Number_0': {
                    'type': 'NUMBER',
                    'value': '5'
                  },
                  'Number': {
                    'type': 'NUMBER',
                    'value': '9'
                  },
                  'Text': {
                    'type': 'SINGLE_LINE_TEXT',
                    'value': 'Updated'
                  }
                }
              }
            ]
          }
        }
      };
      const recordsData = [recordDataUpdate];
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(200, {'revision': '2'});

      const updateRecordByIdResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('2');
      });
    });

    /**
     * Guest space
     * The record is updated successfully for app in guest space
     */
    it('[Record-83] - should update record successfully for app in guest space', () => {
      const connGuestSpace = new Connection({domain: common.DOMAIN, auth: auth, guestSpaceID: common.GUEST_SPACEID});
      const recordID = 1;
      const appID = 19;
      const recordDataUpdate = {
        'app': appID,
        'id': recordID,
        'revision': null,
        'record': {
          'Table': {
            'value': [
              {
                'id': '44915',
                'value': {
                  'Number_0': {
                    'type': 'NUMBER',
                    'value': '5'
                  },
                  'Number': {
                    'type': 'NUMBER',
                    'value': '9'
                  },
                  'Text': {
                    'type': 'SINGLE_LINE_TEXT',
                    'value': 'Updated'
                  }
                }
              }
            ]
          }
        }
      };
      const recordsData = [recordDataUpdate];
      nock(URI)
        .put(API_ROUTE.GUEST_RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(200, {'revision': '3'});

      const recordGuestModule = new Record({connection: connGuestSpace});
      const updateRecordByIdResult = recordGuestModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('3');
      });
    });

    /**
     * Invalid input type
     * The function still work correctly when executing with interger as string type (input string for interger and vice versa)
     */
    it('[Record-84] - should update correctly when executing with interger as string type (input string for interger and vice versa) ', () => {
      const recordID = '1';
      const appID = '19';
      const recordDataUpdate = {
        'app': appID,
        'id': recordID,
        'revision': null,
        'record': {
          'Table': {
            'value': [
              {
                'id': '44915',
                'value': {
                  'Number_0': {
                    'type': 'NUMBER',
                    'value': '5'
                  },
                  'Number': {
                    'type': 'NUMBER',
                    'value': '9'
                  },
                  'Text': {
                    'type': 'SINGLE_LINE_TEXT',
                    'value': 'Updated'
                  }
                }
              }
            ]
          }
        }
      };
      const recordsData = [recordDataUpdate];
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(200, {'revision': '4'});

      const updateRecordByIdResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('4');
      });
    });
  });

  describe('error case', () => {
    it('[Record-67] - should return error when using wrong revison', () => {
      const wrongRevison = 3;
      const data = {
        app: 1,
        id: 2,
        record: {
          Text_0: {
            value: 123
          }
        },
        revision: wrongRevison
      };
      const expectedResult = {
        'code': 'GAIA_CO02',
        'id': 'MJkW0PkiEJ3HhuPRkl3H',
        'message': '指定したrevisionは最新ではありません。ほかのユーザーがレコードを更新した可能性があります。'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.revision).toEqual(wrongRevison);
          return true;
        })
        .reply(409, expectedResult);

      return recordModule.updateRecordByID(data).catch((err) => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
  * Todo: implement another error case
  */

    /**
     * Update data system field
     * Error is displayed when updating these fields:
     *  Created by
     *  Updated by
     *  Created datetime
     *  Updated datetime
     */
    it('[Record-68] - should return the error in the result: Error is displayed when updating these fields:' +
      'Created by' +
      'Updated by' +
      'Created datetime' +
      'Updated datetime', () => {
      const recordID = 95;
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'id': recordID,
        'revision': null,
        'record': {
          'Updated_by': {
            'value': 'Updated'
          }
        }
      };
      const recordsData = [recordDataUpdate];

      const expectedResult = {
        'code': 'CB_IJ01',
        'id': 'wcRfYn4IOTtdsHuExF5a',
        'message': 'Invalid JSON string.'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(400, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
     * Permission
     * Error happens when user does not have Edit permission for app
     */
    it('[Record-69] - should return the error in the result: Error happens when user does not have Edit permission for app', () => {
      const recordID = 95;
      const appID = 22;
      const recordDataUpdate = {
        'app': 22,
        'id': 95,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated value'
          }
        }
      };
      const recordsData = [recordDataUpdate];

      const expectedResult = {
        'code': 'CB_NO02',
        'id': 'M00VPaOdPEmu4kNlBawh',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(400, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    /**
     * Permission
     * Error happens when user does not have Edit permission for record
     */
    it('[Record-70] - should return the error in the result: Error happens when user does not have Edit permission for record', () => {
      const recordID = 95;
      const appID = 22;
      const recordDataUpdate = {
        'app': 22,
        'id': 95,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated value'
          }
        }
      };
      const recordsData = [recordDataUpdate];

      const expectedResult = {
        'code': 'CB_NO02',
        'id': 'M00VPaOdPEmu4kNlBawh',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(400, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    /**
     * Permission
     * Error happens when user does not have Edit permission for field
     */
    it('[Record-71] - should return the error in the result: Error happens when user does not have Edit permission for field', () => {
      const recordID = 95;
      const appID = 22;
      const recordDataUpdate = {
        'app': 22,
        'id': 95,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated value'
          }
        }
      };
      const recordsData = [recordDataUpdate];
      const expectedResult = {
        'code': 'GAIA_FU01',
        'id': 'xnADSZe3pmfqNwkVtmsg',
        'message': 'Edit permissions are required to edit field "title_event".'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(403, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
     * Invalid app ID
     * The error will be displayed when using invalid app ID (unexisted, negative number, 0)
     */
    it('[Record-72] - should return the error in the result when using invalid app ID (unexisted, negative number, 0)', () => {
      const recordID = 95;
      const appID = 220;
      const recordDataUpdate = {
        'app': 22,
        'id': 95,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated value'
          }
        }
      };
      const recordsData = [recordDataUpdate];
      const expectedResult = {
        'code': 'GAIA_AP01',
        'id': 'F1m5aSXHdHNEWxY9gZdS',
        'message': 'The app (ID: 220) not found. The app may have been deleted.'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(403, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
     * Invalid record ID
     * The error will be displayed when using invalid record ID (unexisted, negative number, 0)
     */
    it('[Record-73] - should return the error in the result when using invalid record ID (unexisted, negative number, 0)', () => {
      const recordID = -9500;
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'id': recordID,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated value'
          }
        }
      };
      const recordsData = [recordDataUpdate];
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'mQTR5QFYxbIuTYWoX5Dl',
        'message': 'Missing or invalid input.',
        'errors': {
          'id': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(403, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
     * Missing required field
     * The error will be displayed when using method without app ID
     */
    it('[Record-74] - should return the error in the result when using method without app ID', () => {
      const recordID = 9500;
      const appID = null;
      const recordDataUpdate = {
        'app': appID,
        'id': recordID,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated value'
          }
        }
      };
      const recordsData = [recordDataUpdate];
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'hqggA13Y4xhrBcBQ7UAn',
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
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(400, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
     * Missing required field
     * Revision is increased by 1, no data is updated when using method without records data
     */
    it('[Record-75] - should return revision and increased by 1, no data updated', () => {
      const recordID = 95;
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'id': recordID,
        'revision': null,
        'record': {
        }
      };
      const recordsData = [recordDataUpdate];
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(200, {'revision': '7'});

      const updateRecordByIdResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('7');
      });
    });
    /**
     * Required data
     * Error will be displayed when there is record without data for required field in the records arrray
     */
    it('[Record-76] - should return the error when there is record without data for required field in the records arrray', () => {
      const recordID = 95;
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'id': recordID,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated value'
          }
        }
      };
      const recordsData = [recordDataUpdate];
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'VQQnxMBZrLPuu8c3mso5',
        'message': 'Missing or invalid input.',
        'errors': {
          'record.RequiredField.value': {
            'messages': [
              'Required.'
            ]
          }
        }
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(400, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    /**
     * Invalid field
     * The field will be skipped when there is record with invalid field in the records array
     */
    it('[Record-77] - should update record and skipped invalid field in the records array', () => {
      const recordID = 95;
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'id': recordID,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated'
          },
          'RequiredField22': {
            'value': 'Updated'
          }
        }
      };
      const recordsData = [recordDataUpdate];
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(200, {'revision': '9'});

      const updateRecordByIdResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('9');
      });
    });
    /**
     * Invalid data
     * The error will be displayed when there is one record has invalid data (text for number field)
     */
    it('[Record-78] - should return the error when there is one record has invalid data (text for number field)', () => {
      const recordID = 95;
      const appID = 22;
      const recordDataUpdate = {
        'app': 22,
        'id': 95,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated'
          },
          'Number': {
            'value': 'Updated'
          }
        }
      };
      const recordsData = [recordDataUpdate];
      const expectedResult = {
        'code': 'CB_VA01',
        'id': '99aEZeyuk7LQObSKX9GA',
        'message': 'Missing or invalid input.',
        'errors': {
          'record[Number].value': {
            'messages': [
              'Only numbers are allowed.'
            ]
          }
        }
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(400, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
     * Invalid data
     * The error will be displayed when there is one record has invalid data (duplicate data for "prohibit duplicate value" field)
     */
    it('[Record-79] - should return the error when there is duplicate data for "prohibit duplicate value" field)', () => {
      const recordID = 95;
      const appID = 22;
      const recordDataUpdate = {
        'app': 22,
        'id': 95,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated'
          },
          'Number': {
            'value': '5'
          }
        }
      };
      const recordsData = [recordDataUpdate];
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'ESajpGXPYszubHfD5ov4',
        'message': 'Missing or invalid input.',
        'errors': {
          'record.Number.value': {
            'messages': [
              'This value already exists in another record.'
            ]
          }
        }
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(400, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    /**
     * Invalid data
     * The error will be displayed when there is one record has invalid data (exceed maximum for number field)
     */
    it('[Record-80] - should return the error when there is one record exceed maximum for number field)', () => {
      const recordID = 95;
      const appID = 22;
      const recordDataUpdate = {
        'app': 22,
        'id': 95,
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated'
          },
          'Number': {
            'value': '51'
          }
        }
      };
      const recordsData = [recordDataUpdate];
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'rJQJJ6ByH0peJbdxOCcq',
        'message': 'Missing or invalid input.',
        'errors': {
          'record.Number.value': {
            'messages': [
              'The value must be 50 or less.'
            ]
          }
        }
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody.record).toMatchObject(recordsData);
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
        .reply(400, expectedResult);

      const getRecordResult = recordModule.updateRecordByID({app: appID, id: recordID, record: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
  });
});