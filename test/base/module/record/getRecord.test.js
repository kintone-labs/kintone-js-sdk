
/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');


const common = require('../../utils/common');

const {Connection, Auth, Record, KintoneAPIException} = require(common.MAIN_PATH);
const RECORD_ROUTE = '/k/v1/record.json';
const URI = 'https://' + common.DOMAIN;

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

const recordModule = new Record(conn);
describe('getRecord function', () => {
  describe('common case', () => {
    it('should return a promise', () => {
      const appID = 1;
      const recordID = 1;
      nock(URI)
        .get(`${RECORD_ROUTE}?app=${appID}&id=${recordID}`)
        .reply(200, {
          'record': {}
        });

      const getRecordResult = recordModule.getRecord(appID, recordID);
      expect(getRecordResult).toHaveProperty('then');
      expect(getRecordResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Record-2] valid params are specificed', () => {
      const appID = 1;
      const recordID = 1;
      nock(URI)
        .get(`${RECORD_ROUTE}?app=${appID}&id=${recordID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, {
          'record': {}
        });
      return recordModule.getRecord(appID, recordID)
        .then((rsp) => {
          expect(rsp).toHaveProperty('record');
        });
    });
  });

  describe('error case', () => {
    it('[Record-4] The error will be displayed when using invalid rec ID', () => {
      const recordID = 100;
      const appID = 46;
      const expectResult = {
        'code': 'GAIA_RE01',
        'id': 'bYKCU4rpRnqJh2c5Ir7z',
        'message': 'The specified record (ID: 100) is not found.'
      };
      nock(URI)
        .get(`${RECORD_ROUTE}?app=${appID}&id=${recordID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordResult = recordModule.getRecord(appID, recordID);
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-5] The error will be displayed when using method without app ID', () => {
      const recordID = 1;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'lngXBpSntzwEI9wqMEZu',
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
        .get(`${RECORD_ROUTE}?id=${recordID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordResult = recordModule.getRecord(undefined, recordID);
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-6] The error will be displayed when using method without record ID', () => {
      const appID = 1;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'lngXBpSntzwEI9wqMEZu',
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
        .get(`${RECORD_ROUTE}?app=${appID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordResult = recordModule.getRecord(appID, undefined);
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-7] Error will display when user does not have View records permission for app', () => {
      const appID = 1;
      const recordID = 1;
      const expectResult = {
        'code': 'CB_NO02',
        'id': '46babHd1VN5DSm4vAOZU',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(`${RECORD_ROUTE}?app=${appID}&id=${recordID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordResult = recordModule.getRecord(appID, recordID);
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-8] Error will display when user does not have View records permission for the record', () => {
      const appID = 1;
      const recordID = 1;
      const expectResult = {
        'code': 'CB_NO02',
        'id': '46babHd1VN5DSm4vAOZU',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(`${RECORD_ROUTE}?app=${appID}&id=${recordID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordResult = recordModule.getRecord(appID, recordID);
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-9] When user does not have View permission for field, the data of this field is not displayed', () => {
      const appID = 1;
      const recordID = 1;

      // Data response does not include some system fields because user does not have View permission for that fields
      const expectResult = {
        'record': {
          'Record_number': {
            'type': 'RECORD_NUMBER',
            'value': '1'
          },
          'Drop_down': {
            'type': 'DROP_DOWN',
            'value': 'Pass'
          },
          '$revision': {
            'type': '__REVISION__',
            'value': '1'
          },
          '$id': {
            'type': '__ID__',
            'value': '1'
          }
        }
      };
      nock(URI)
        .get(`${RECORD_ROUTE}?app=${appID}&id=${recordID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResult);
      const getRecordResult = recordModule.getRecord(appID, recordID);
      return getRecordResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-10] Verify error displays when getting the record data of app in guest space', () => {
      const guestappID = 1;
      const recordID = 1;
      const expectResult = {
        'code': 'GAIA_IL23',
        'id': 'ATuUhgxnYVIrnd66whQY',
        'message': 'You need to send a request to the URL: "/k/guest/<Space ID>/v1/..." to execute apps in Guest Spaces.'
      };
      nock(URI)
        .get(`${RECORD_ROUTE}?app=${guestappID}&id=${recordID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordResult = recordModule.getRecord(guestappID, recordID);
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-12] Verify the system fields are returned for record in app without any fields', () => {
      const appID = 1;
      const recordID = 1;
      const expectResult = {
        'record': {
          'Updated_datetime': {
            'type': 'UPDATED_TIME',
            'value': '2018-08-27T02:09:00Z'
          },
          'Created_datetime': {
            'type': 'CREATED_TIME',
            'value': '2018-08-27T02:09:00Z'
          },
          'Record_number': {
            'type': 'RECORD_NUMBER',
            'value': '3'
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
          '$id': {
            'type': '__ID__',
            'value': '3'
          }
        }
      };
      nock(URI)
        .get(`${RECORD_ROUTE}?app=${appID}&id=${recordID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResult);
      const getRecordResult = recordModule.getRecord(appID, recordID);
      return getRecordResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-11] The record data is still displayed when executing with ID as string type', () => {
      const appID = '1';
      const recordID = '1';
      nock(URI)
        .get(`${RECORD_ROUTE}?app=${appID}&id=${recordID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, {
          'record': {}
        });
      return recordModule.getRecord(appID, recordID)
        .then((rsp) => {
          expect(rsp).toHaveProperty('record');
        });
    });
    it('[Record-3] Invalid appID param is specified', () => {
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'PmcT6fVjQMsl4BhMw9Uo',
        'message': 'Missing or invalid input.',
        'errors': {'app': {'messages': ['must be greater than or equal to 1']}}
      };

      nock(URI)
        .get(`${RECORD_ROUTE}?app=-2`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordResult = recordModule.getRecord(-2);
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
