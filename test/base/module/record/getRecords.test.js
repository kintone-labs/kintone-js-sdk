/**
 * kintone api - nodejs client
 * test record module
 */

const nock = require('nock');
const common = require('../../utils/common');

const {Connection, Auth, Record, KintoneAPIException} = require(common.MAIN_PATH);
const RECORDS_ROUTE = '/k/v1/records.json';
const URI = 'https://' + common.DOMAIN;

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const recordModule = new Record(conn);
describe('getRecords function', () => {
  describe('common case', () => {
    it('should return a promise', () => {
      nock(URI)
        .get(`${RECORDS_ROUTE}`)
        .reply(200, {records: []});
      const getRecordsResult = recordModule.getRecords();
      expect(getRecordsResult).toHaveProperty('then');
      expect(getRecordsResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Record-13] valid params are specificed', () => {
      const body = {
        app: 844,
        query: 'Created_datetime = TODAY()',
        fields: ['Created_datetime'],
        totalCount: false,
      };

      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, {
          'records': [{}]
        });
      return recordModule.getRecords(body.app, body.query, body.fields, body.totalCount)
        .then(rsp => {
          expect(rsp).toHaveProperty('records');
        });
    });
    it('[Record-25] Verify the number of records that can be retrieved at once is 500', () => {
      const number = 500;
      const body = {
        app: 844,
        query: 'Record_number > 0 order by Record_number asc limit 500 offset 0',
        fields: ['Record_number'],
        totalCount: false
      };

      const expectSample = {
        'records': {
          'Record_number': {
            'type': 'RECORD_NUMBER',
            'value': '1'
          }
        },
        'totalCount': null
      };

      const records = common.generateRecord(number, expectSample.records);

      const expectResult = {
        records,
        'totalCount': null
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResult);
      return recordModule.getRecords(body.app, body.query, body.fields, body.totalCount)
        .then(rsp => {
          expect(rsp).toMatchObject(expectResult);
          expect(rsp).toHaveProperty('records');
        });
    });
  });

  describe('error case', () => {
    it('[Record-15] The error will be displayed when using invalid query', () => {
      const body = {
        app: 1,
        query: 'Record_number in 1',
        fields: ['Record_number'],
        totalCount: false
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'JrV1vg870mCsAdnSfHhX',
        'message': 'Missing or invalid input.',
        'errors': {
          'query': {
            'messages': [
              'unsupported query format'
            ]
          }
        }
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);

      const getRecordsResult = recordModule.getRecords(body.app, body.query, body.fields, body.totalCount);
      return getRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-16] The error will be displayed when using invalid fields', () => {
      const body = {
        app: 1,
        query: 'Error_fields >= 1',
        fields: ['Record_number'],
        totalCount: false
      };

      const expectResult = {
        'code': 'GAIA_IQ11',
        'id': 'rX14vGi63r3dn9qqKqLp',
        'message': 'Specified field (error) not found.'
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);

      const getRecordsResult = recordModule.getRecords(body.app, body.query, body.fields, body.totalCount);
      return getRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-17] The error will be displayed when using invalid isShowTotalCount', () => {
      const body = {
        app: 1,
        query: 'Record_number >= 1',
        fields: ['Record_number'],
        totalCount: 1,
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'AJuTiYf05y4aeaTN1rAk',
        'message': 'Missing or invalid input.',
        'errors': {
          'totalCount': {
            'messages': [
              'must be boolean.'
            ]
          }
        }
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);

      const getRecordsResult = recordModule.getRecords(body.app, body.query, body.fields, body.totalCount);
      return getRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-18] The error will be displayed when using method without app ID', () => {
      const body = {
        query: 'Record_number >= 1',
        fields: ['Record_number'],
        totalCount: false,
      };

      const expectResult = {
        'code': 'CB_VA01',
        'id': 'pSEkaKRTTTvlSbMeTwMV',
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
        .get(`${RECORDS_ROUTE}?query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);

      const getRecordsResult = recordModule.getRecords(undefined, body.query, body.fields, body.totalCount);
      return getRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-20] Error will display when user does not have View records permission for app', () => {
      const body = {
        app: 1,
        query: 'Record_number >= 1',
        fields: ['Record_number'],
        totalCount: false,
      };
      const expectResult = {
        'code': 'CB_NO02',
        'id': '46babHd1VN5DSm4vAOZU',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordsResult = recordModule.getRecords(body.app, body.query, body.fields, body.totalCount);
      return getRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-21] Error will display when user does not have View records permission for the record', () => {
      const body = {
        app: 1,
        query: 'Record_number >= 1',
        fields: ['Record_number'],
        totalCount: false,
      };
      const expectResult = {
        'code': 'CB_NO02',
        'id': '6c2dU9FayssNvW0YuYQ9',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordsResult = recordModule.getRecords(body.app, body.query, body.fields, body.totalCount);
      return getRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-22] Error display user does not have View permission for field, the data of this field is not displayed', () => {
      const body = {
        app: 1,
        query: 'Record_number >= 1',
        fields: ['Record_number'],
        totalCount: false,
      };

      // Data response does not include some system fields because user does not have View permission for that fields
      const expectResult = {
        'records': [
          {
            'Record_number': {
              'type': 'RECORD_NUMBER',
              'value': '3'
            }
          },
          {
            'Record_number': {
              'type': 'RECORD_NUMBER',
              'value': '2'
            }
          },
          {
            'Record_number': {
              'type': 'RECORD_NUMBER',
              'value': '1'
            }
          }
        ],
        'totalCount': null
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, expectResult);
      const getRecordsResult = recordModule.getRecords(body.app, body.query, body.fields, body.totalCount);
      return getRecordsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Record-23] Verify error displays when getting the record data of app in guest space', () => {
      const body = {
        app: 1,
        query: 'Record_number >= 1',
        fields: ['Record_number'],
        totalCount: false,
      };
      const expectResult = {
        'code': 'GAIA_IL23',
        'id': 'ATuUhgxnYVIrnd66whQY',
        'message': 'You need to send a request to the URL: "/k/guest/<Space ID>/v1/..." to execute apps in Guest Spaces.'
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordsResult = recordModule.getRecords(body.app, body.query, body.fields, body.totalCount);
      return getRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-24] The record data is still displayed when executing with ID as string type', () => {
      const body = {
        app: '1',
        query: 'Record_number >= 1',
        fields: ['Record_number'],
        totalCount: false,
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(200, {
          'record': {}
        });
      const getRecordsResult = recordModule.getRecords(body.app, body.query, body.fields, body.totalCount);
      return getRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('record');
      });
    });
    it('[Record-26] Verify the error displays when number of records is > 500', () => {
      const body = {
        app: 1,
        query: 'Record_number > 0 order by Record_number asc limit 999 offset 0',
        fields: ['Record_number'],
        totalCount: false,
      };
      const expectResult = {
        'code': 'GAIA_QU01',
        'id': 'BtX2Rh2CzFBjDNh4iT55',
        'message': 'limit must be 500 or less.'
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
          return true;
        })
        .reply(400, expectResult);
      const getRecordsResult = recordModule.getRecords(body.app, body.query, body.fields, body.totalCount);
      return getRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Record-14] the app ID param is invalid', () => {
      const body = {
        app: -2,
        query: 'Created_datetime=TODAY()',
        fields: ['Created_datetime'],
        totalCount: false
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'PmcT6fVjQMsl4BhMw9Uo',
        'message': 'Missing or invalid input.',
        'errors': {'app': {'messages': ['must be greater than or equal to 1']}}
      };
      nock(URI)
        .get(`${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
        .reply(400, expectResult);

      const getRecordsResult = recordModule.getRecords(body.app, body.query, body.fields, body.totalCount);
      return getRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});

