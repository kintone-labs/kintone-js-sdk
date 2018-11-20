
/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');

const common = require('../../utils/common');
const {KintoneAPIException, Connection, Auth, Record} = require(common.MAIN_PATH);

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

const recordModule = new Record(conn);
const URI = 'https://' + common.DOMAIN;
const RECORDS_API_ROUTE = '/k/v1/records.json';
const RECORDS_API_GUEST_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/records.json`;

describe('addRecords function', () => {
  describe('common case', () => {

    it('should return a promise', () => {
      nock(URI)
        .post(RECORDS_API_ROUTE)
        .reply(200, {
          'ids': ['1'],
          'revisions': ['1']
        });
      const addRecordsResult = recordModule.addRecords();
      expect(addRecordsResult).toHaveProperty('then');
      expect(addRecordsResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Record-46] should add successfully the record', () => {
      const data = {
        app: 1,
        records: [{Text_0: {value: 1}}, {Text_0: {value: 2}}]
      };

      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(expect.arrayContaining(data.records));
          return rqBody.app === data.app;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, {
          'ids': ['1', '2'],
          'revisions': ['1', '1']
        });

      const addRecordsResult = recordModule.addRecords(data.app, data.records);
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('ids');
        expect(rsp.revisions).toEqual(expect.arrayContaining(['1', '1']));
      });
    });

    it('[Record-56] the data for record with table is added successfully', () => {
      const data = {
        app: 1,
        records: [
          {
            Text: {
              value: 'test1'
            },
            User_select: {
              value: [
                {
                  code: 'john-d'
                }
              ]
            },
            Table: {
              value: [
                {
                  value: {
                    Table_singletext: {
                      value: 'Chocolate Pudding'
                    }
                  }
                }
              ]
            }
          },
          {
            Text: {
              value: 'test2'
            },
            User_select: {
              value: [
                {
                  code: 'jane-r'
                }
              ]
            }
          }
        ]
      };

      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(expect.arrayContaining(data.records));
          return rqBody.app === data.app;
        })
        .reply(200, {
          'ids': ['1', '2'],
          'revisions': ['1', '1']
        });

      const addRecordsResult = recordModule.addRecords(data.app, data.records);
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('ids');
        expect(rsp.revisions).toEqual(expect.arrayContaining(['1', '1']));
      });
    });

    it('[Record-57] the records are added successfully for app in guest space', () => {
      const data = {
        app: 1,
        records: [{Text_0: {value: 1}}, {Text_0: {value: 2}}]
      };

      nock(URI)
        .post(RECORDS_API_GUEST_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(expect.arrayContaining(data.records));
          return rqBody.app === data.app;
        })
        .reply(200, {
          'ids': ['1', '2'],
          'revisions': ['1', '1']
        });
      const conn1 = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
      const recordsModule = new Record(conn1);
      const addRecordsResult = recordsModule.addRecords(data.app, data.records);
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('ids');
        expect(rsp.revisions).toEqual(expect.arrayContaining(['1', '1']));
      });
    });

    it('[Record-60] number of records that can be created at once is 100', () => {
      const number = 100;
      const data = {
        app: 1,
        records: {Text_0: {value: 'test'}}
      };
      const records100 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
        '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
        '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
        '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'];
      const revisions100 = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
        '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
        '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
        '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
        '1', '1', '1'];

      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(common.generateRecord(number, data.records));
          return true;
        })
        .reply(200, {
          'ids': records100,
          'revisions': revisions100
        });
      const recordsModule = new Record(conn);
      return recordsModule.addRecords(data.app, common.generateRecord(number, data.records))
        .then((rsp) => {
          expect(rsp.ids.length).toEqual(100);
          expect(rsp.revisions.length).toEqual(100);
        });
    });

    it('[Record-62] record is added when executing with interger as string type (input string for interger and vice versa) ', () => {
      const data = {
        app: '1',
        records: [{Text_0: {value: 1}}, {Text_0: {value: 2}}]
      };

      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(expect.arrayContaining(data.records));
          return rqBody.app === data.app;
        })
        .reply(200, {
          'ids': ['1', '2'],
          'revisions': ['1', '1']
        });

      const addRecordsResult = recordModule.addRecords(data.app, data.records);
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('ids');
        expect(rsp.revisions).toEqual(expect.arrayContaining(['1', '1']));
      });
    });

    it('[Record-64] Data is added when having admin permission with Created by, Updated by, Created datetime, Updated datetime', () => {
      const data = {
        app: '1',
        records: [{Created_By: {value: {code: 'william-sayama', 'name': 'William Sayama'}}},
          {Updated_By: {value: {code: 'william-sayama', 'name': 'William Sayama'}}},
          {Created_Datetime: {value: '2015-04-01T06:51:00Z'}},
          {Updated_Datetime: {value: '2015-04-01T06:51:00Z'}}]
      };

      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(expect.arrayContaining(data.records));
          return rqBody.app === data.app;
        })
        .reply(200, {
          'ids': ['1', '2'],
          'revisions': ['1', '1']
        });

      const addRecordsResult = recordModule.addRecords(data.app, data.records);
      return addRecordsResult.then((rsp) => {
        expect(rsp).toHaveProperty('ids');
        expect(rsp.revisions).toEqual(expect.arrayContaining(['1', '1']));
      });
    });
  });

  describe('error', () => {
    it('[Record-47] should return an error when using unexisted appID', () => {
      const data = {
        unexistedAppID: 999,
        records: [{Text_0: {value: 1}}, {Text_0: {value: 2}}]
      };
      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(data.unexistedAppID);
          return true;
        })
        .reply(404, {'code': 'GAIA_AP01', 'id': 'Jt2jVNMHlZxXPufVeZCz', 'message': 'The app (ID: 999) not found. The app may have been deleted.'});

      const addRecordsResult = recordModule.addRecords(data.unexistedAppID, data.records);
      return addRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
    });

    it('[Record-47] should return error when using negative appID', () => {
      const data = {
        negativeAppID: 999,
        records: [{Text_0: {value: 1}}, {Text_0: {value: 2}}]
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'PmcT6fVjQMsl4BhMw9Uo',
        'message': 'Missing or invalid input.',
        'errors': {'app': {'messages': ['must be greater than or equal to 1']}}
      };
      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(data.negativeAppID);
          return true;
        })
        .reply(400, expectResult);

      const addRecordsResult = recordModule.addRecords(data.negativeAppID, data.records);
      return addRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-47] should return error when appID is 0', () => {
      const data = {
        appID: 0,
        records: [{Text_0: {value: 1}}, {Text_0: {value: 2}}]
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'PmcT6fVjQMsl4BhMw9Uo',
        'message': 'Missing or invalid input.',
        'errors': {'app': {'messages': ['must be greater than or equal to 1']}}
      };
      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(0);
          return true;
        })
        .reply(400, expectResult);

      const addRecordsResult = recordModule.addRecords(data.appID, data.records);
      return addRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-49] error will be displayed when adding invalid data (text for number field)', () => {
      const data = {
        app: 1,
        records: [{Number: {value: 'test'}}, {Text_0: {value: 2}}]
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': '0',
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
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(expect.arrayContaining(data.records));
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
      const recordsModule = new Record(conn);
      return recordsModule.addRecords(data.app, data.records)
        .catch(err => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });

    it('[Record-50] error will be displayed when adding invalid data (duplicate data for "prohibit duplicate value" field)', () => {
      const data = {
        app: 1,
        records: [{Text_0: {value: 1}}, {Text_0: {value: 1}}]
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': '0',
        'message': 'Missing or invalid input.',
        'errors': {
          'record[Number].value': {
            'messages': [
              'This value already exists in another record.'
            ]
          }
        }
      };

      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(expect.arrayContaining(data.records));
          return true;
        })
        .reply(400, expectResult);
      const recordsModule = new Record(conn);
      return recordsModule.addRecords(data.app, data.records)
        .catch(err => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });

    it('[Record-51] error will be displayed when adding invalid data (exceed maximum for number field)', () => {
      const data = {
        app: 1,
        records: [{Number: {value: 1000}}, {Text_0: {value: 1}}]
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': '0',
        'message': 'Missing or invalid input.',
        'errors': {
          'record[0].value': {
            'messages': [
              'The value must be 999 or less.'
            ]
          }
        }
      };

      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(expect.arrayContaining(data.records));
          return true;
        })
        .reply(400, expectResult);
      const recordsModule = new Record(conn);
      return recordsModule.addRecords(data.app, data.records)
        .catch(err => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });

    it('[Record-52] should return error when using method without app ID', () => {
      const data = {
        records: [{Text_0: {value: 1}}, {Text_0: {value: 2}}]
      };
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': '0',
        'message': 'Missing or invalid input.',
        'errors': {
          'messages': [
            'Required.'
          ]
        }
      };
      nock(URI, (rqBody) => {
        expect(rqBody).not.toHaveProperty('app');
        return true;
      })
        .post(RECORDS_API_ROUTE)
        .reply(400, expectResult);

      const recordsModule = new Record(conn);
      return recordsModule.addRecords(undefined, data.records)
        .catch(err => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });

    it('[Record-53] should return error when using method without data for required field', () => {
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': '0',
        'message': 'Missing or invalid input.',
        'errors': {
          'messages': [
            'Required.'
          ]
        }
      };
      nock(URI, (rqBody) => {
        expect(rqBody).not.toHaveProperty('app');
        return true;
      })
        .post(RECORDS_API_ROUTE)
        .reply(400, expectResult);

      const recordsModule = new Record(conn);
      return recordsModule.addRecords(1, undefined)
        .catch(err => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });

    it('[Record-54] should return error when using method without data for required field', () => {
      const data = {
        app: 1,
        records: [{Text_0: {value: 'test'}}, {Text_0: {value: 2}}]
      };
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': '0',
        'message': 'Missing or invalid input.',
        'errors': {
          'record.Text_1.value': {
            'messages': [
              'Required.'
            ]
          }
        }
      };
      nock(URI, (rqBody) => {
        expect(rqBody).not.toHaveProperty('app');
        return true;
      })
        .post(RECORDS_API_ROUTE)
        .reply(400, expectResult);

      const recordsModule = new Record(conn);
      return recordsModule.addRecords(data.app, data.records)
        .catch(err => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });

    it('[Record-59] error will be displayed when user does not have Add records permission for app', () => {
      const data = {
        app: 1,
        records: [{Text_0: {value: 'test'}}, {Text_0: {value: 2}}]
      };
      const expectResult = {
        'code': 'CB_NO02',
        'id': '0',
        'message': 'No privilege to proceed.'
      };

      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(data.records);
          return true;
        })
        .reply(400, expectResult);
      const recordsModule = new Record(conn);
      return recordsModule.addRecords(data.app, data.records)
        .catch(err => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });

    it('[Record-61] error displays when number of records is > 100', () => {
      const number = 101;
      const data = {
        app: 1,
        records: {Text_0: {value: 'test'}}
      };

      const expectResult = {
        'id': '0',
        'code': 'CB_VA01',
        'message': 'Missing or invalid input.',
        'errors': {
          'records': {
            'messages': [
              'A maximum of 100 records can be added at one time.'
            ]
          }
        }
      };

      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(common.generateRecord(number, data.records));
          return true;
        })
        .reply(400, expectResult);
      const recordsModule = new Record(conn);
      return recordsModule.addRecords(data.app, common.generateRecord(number, data.records))
        .catch(err => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });

    it('[Record-63] Error is displayed when no having admin permission with Created by, Updated by, Created datetime, Updated datetime', () => {
      const data = {
        app: '1',
        records: [{Created_By: {value: {code: 'william-sayama', 'name': 'William Sayama'}}},
          {Updated_By: {value: {code: 'william-sayama', 'name': 'William Sayama'}}},
          {Created_Datetime: {value: '2015-04-01T06:51:00Z'}},
          {Updated_Datetime: {value: '2015-04-01T06:51:00Z'}}]
      };

      const expectResult = {
        'code': 'CB_IJ01',
        'id': 'KySHqaEs9dbE8o6gbZG6',
        'message': 'Invalid JSON string.'
      };

      nock(URI)
        .post(RECORDS_API_ROUTE, (rqBody) => {
          expect(rqBody.records).toEqual(expect.arrayContaining(data.records));
          return rqBody.app === data.app;
        })
        .reply(400, expectResult);

      const recordsModule = new Record(conn);
      return recordsModule.addRecords(data.app, data.records)
        .catch(err => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
  });
});
