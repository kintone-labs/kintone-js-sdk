
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

describe('updateRecords function', () => {
  describe('common case', () => {
    const appID = 1;
    const recordDataUpdate = {
      id: 1,
      record: {
        Text_0: 'test'
      },
      revision: 2
    };
    const recordsData = [recordDataUpdate];
    it('[Record-0-common] - should return a promise', () => {
      nock(URI)
        .put(API_ROUTE.RECORDS)
        .reply(200, {
          'records': [{
            id: 1,
            revision: 3
          }]
        });

      const updateRecordsResult = recordModule.updateRecords({app: appID, records: recordsData});
      expect(updateRecordsResult).toHaveProperty('then');
      expect(updateRecordsResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Record-107] - should update successfully the records', () => {
      const appID = 1;
      const recordDataUpdate = {
        id: 1,
        record: {
          Text_0: 'test'
        },
        revision: 2
      };
      const recordsData = [recordDataUpdate];
      const expectResult = {
        'records': [{
          id: 1,
          revision: 3
        }]
      };

      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.app).toEqual(appID);
          expect(rqBody.records).toEqual(recordsData);
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
        .reply(200, expectResult);

      const updateRecordsResult = recordModule.updateRecords({app: appID, records: recordsData});
      return updateRecordsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    /**
   * valid data by keyfield
   * The records are updated successfully, the revision is increased by 1 after update
   */
    it('[Record-108] - should update successfully the record', () => {
      const appID = 777;
      const data = {
        'app': appID,
        'records': [
          {
            'updateKey': {
              'field': 'unique_key',
              'value': 'CODE123'
            },
            'revision': 4,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'updateKey': {
              'field': 'unique_key',
              'value': 'CODE456'
            },
            'revision': 1,
            'record': {
              'string_multi': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [data];
      const expectResult = {
        'records': [
          {
            'id': '95',
            'revision': '10'
          },
          {
            'id': '96',
            'revision': '3'
          }
        ]
      };
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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
        .reply(200, expectResult);

      const updateRecordsResult = recordModule.updateRecords({app: appID, records: recordsData});
      return updateRecordsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });

    /**
     * revision = -1
     */
    it('[Record-109] - should update successfully the record when revision = -1', () => {
      const appID = 777;
      const data = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'id': 2,
            'revision': 1,
            'record': {
              'string_multi': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [data];
      const expectResult = {
        'records': [
          {
            'id': '95',
            'revision': '10'
          },
          {
            'id': '96',
            'revision': '3'
          }
        ]
      };
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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
        .reply(200, expectResult);

      const updateRecordsResult = recordModule.updateRecords({app: appID, records: recordsData});
      return updateRecordsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    /**
       * Data table
       * Verify the data for record with table is added successfully
       */
    it('[Record-124] - should update succesfully with table in record is added successfully', () => {
      const appID = 19;
      const recordDataUpdate = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
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
          },
          {
            'id': 2,
            'revision': 1,
            'record': {
              'Number': {
                'value': '59'
              }
            }
          }
        ]
      };
      const recordsData = [recordDataUpdate];
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const updateRecordByIdResult = recordModule.updateRecords({app: appID, records: recordsData});
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('2');
      });
    });

    /**
     * Guest space
     * The record is updated successfully for app in guest space
     */
    it('[Record-125] - should update record successfully for app in guest space', () => {
      const connGuestSpace = new Connection({domain: common.DOMAIN, auth: auth, guestSpaceID: common.GUEST_SPACEID});
      const recordGuestModule = new Record({connection: connGuestSpace});
      const appID = 19;
      const recordDataUpdate = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'id': 2,
            'revision': 1,
            'record': {
              'Number': {
                'value': '59'
              }
            }
          }
        ]
      };
      const recordsData = [recordDataUpdate];
      nock(URI)
        .put(API_ROUTE.GUEST_RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const updateRecordByIdResult = recordGuestModule.updateRecords({app: appID, records: recordsData});
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('3');
      });
    });

    /**
     * Invalid input type
     * The function still work correctly when executing with interger as string type (input string for interger and vice versa)
     */
    it('[Record-126] - should update record successfully when executing with interger as string type', () => {
      const appID = '19';
      const recordDataUpdate = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'id': 2,
            'revision': 1,
            'record': {
              'Number': {
                'value': '59'
              }
            }
          }
        ]
      };
      const recordsData = [recordDataUpdate];
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const updateRecordByIdResult = recordModule.updateRecords({app: appID, records: recordsData});
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('4');
      });
    });
    /**
    * Missing required field
    * Revision is increased by 1, no data is updated when using method without records data
    */
    it('[Record-117] - should return revision and increased by 1, no data updated', () => {
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'records': [
        ]
      };
      const recordsData = [recordDataUpdate];
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const updateRecordByIdResult = recordModule.updateRecords({app: appID, records: recordsData});
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('7');
      });
    });
  });

  describe('error case', () => {
    it('[Record-110] - should return error when using wrong revison', () => {
      const appID = 1;
      const recordDataUpdate = {
        id: 1,
        record: {
          Text_0: 'test'
        },
        revision: 0
      };
      const recordsData = [recordDataUpdate];
      const expectResult = {
        'code': 'GAIA_CO02',
        'id': '4ucJiURAv0LsXBkLCDdi',
        'message': 'The revision is not the latest. Someone may update a record.'
      };
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
          return true;
        })
        .reply(409, expectResult);

      return recordModule.updateRecords({app: appID, records: recordsData}).catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    /* Update data system field
    * Error is displayed when updating these fields:
    *  Created by
    *  Updated by
    *  Created datetime
    *  Updated datetime
    */
    it('[Record-111] - should return error in the result: Error is displayed when updating these fields:' +
      'Created by' +
      'Updated by' +
      'Created datetime' +
      'Updated datetime', () => {
      const appID = 777;
      const data = {
        'app': appID,
        'records': [
          {
            'updateKey': {
              'field': 'unique_key',
              'value': 'CODE123'
            },
            'revision': null,
            'record': {
              'Updated_by': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'updateKey': {
              'field': 'unique_key',
              'value': 'CODE456'
            },
            'revision': null,
            'record': {
              'string_multi': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [data];
      const expectResult = {
        'code': 'CB_IJ01',
        'id': 'KySHqaEs9dbE8o6gbZG6',
        'message': 'Invalid JSON string.'
      };
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const getRecordResult = recordModule.updateRecords({app: appID, records: recordsData});
      return getRecordResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    /**
     * Permission
     * Error happens when user does not have Edit permission for app
     */
    it('[Record-112] - should return error in the result: Error happens when user does not have Edit permission for app', () => {
      const appID = 777;
      const data = {
        'app': appID,
        'records': [
          {
            'updateKey': {
              'field': 'unique_key',
              'value': 'CODE123'
            },
            'revision': null,
            'record': {
              'Updated_by': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'updateKey': {
              'field': 'unique_key',
              'value': 'CODE456'
            },
            'revision': null,
            'record': {
              'title_event': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [data];

      const expectResult = {
        'code': 'CB_NO02',
        'id': 'M00VPaOdPEmu4kNlBawh',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const getRecordResult = recordModule.updateRecords({app: appID, records: recordsData});
      return getRecordResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    /**
     * Permission
     * Error happens when user does not have Edit permission for record
     */
    it('[Record-113] - should return error in the result: Error happens when user does not have Edit permission for record', () => {
      const appID = 777;
      const data = {
        'app': appID,
        'records': [
          {
            'updateKey': {
              'field': 'unique_key',
              'value': 'CODE123'
            },
            'revision': null,
            'record': {
              'Updated_by': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'updateKey': {
              'field': 'unique_key',
              'value': 'CODE456'
            },
            'revision': null,
            'record': {
              'title_event': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [data];

      const expectResult = {
        'code': 'CB_NO02',
        'id': 'M00VPaOdPEmu4kNlBawh',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const getRecordResult = recordModule.updateRecords({app: appID, records: recordsData});
      return getRecordResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    /**
     * Permission
     * Error happens when user does not have Edit permission for field
     */
    it('[Record-114] - should return error in the result: Error happens when user does not have Edit permission for field', () => {
      const appID = 777;
      const data = {
        'app': appID,
        'records': [
          {
            'updateKey': {
              'field': 'unique_key',
              'value': 'CODE123'
            },
            'revision': null,
            'record': {
              'Updated_by': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'updateKey': {
              'field': 'unique_key',
              'value': 'CODE456'
            },
            'revision': null,
            'record': {
              'title_event': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [data];
      const expectResult = {
        'code': 'GAIA_FU01',
        'id': 'xnADSZe3pmfqNwkVtmsg',
        'message': 'Edit permissions are required to edit field "title_event".'
      };
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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
        .reply(403, expectResult);

      const getRecordResult = recordModule.updateRecords({app: appID, records: recordsData});
      return getRecordResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    /**
     * Invalid app ID
     * The error will be displayed when using invalid app ID (unexisted, negative number, 0)
     */
    it('[Record-115] - should return error when using invalid app ID (unexisted, negative number, 0)', () => {
      const appID = -220;
      const recordDataUpdate = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'id': 2,
            'revision': 1,
            'record': {
              'string_multi': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [recordDataUpdate];
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'F1m5aSXHdHNEWxY9gZdS',
        'message': 'The app (ID: 220) not found. The app may have been deleted.'
      };
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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
        .reply(403, expectResult);

      const getRecordResult = recordModule.updateRecords({app: appID, records: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    /**
    * Missing required field
    * The error will be displayed when using method without app ID
    */
    it('[Record-116] - should return error when using method without app ID', () => {
      const appID = null;
      const recordDataUpdate = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'id': 2,
            'revision': 1,
            'record': {
              'string_multi': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [recordDataUpdate];
      const expectResult = {
        'id': 'JkEZZDZMRe3ZkrfCWRaq',
        'code': 'CB_VA01',
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
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const getRecordResult = recordModule.updateRecords({app: appID, records: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    /**
    * Required data
    * Error will be displayed when there is record without data for required field in the records arrray
    */
    it('[Record-118] - should return error when there is record without data for required field in the records arrray', () => {
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'records': [
          {
            'id': null,
            'revision': null,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'id': null,
            'revision': null,
            'record': {
              'string_multi': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [recordDataUpdate];
      const expectResult = {
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
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const getRecordResult = recordModule.updateRecords({app: appID, records: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    /**
    * Invalid field
    * The field will be skipped when there is record with invalid field in the records array
    */
    it('[Record-119] - should update record and skipped invalid field in the records array', () => {
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'id': 2,
            'revision': 1,
            'record': {
              'string_multi_error_field': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [recordDataUpdate];
      nock(URI)
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const updateRecordByIdResult = recordModule.updateRecords({app: appID, records: recordsData});
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('9');
      });
    });
    /**
    * Invalid data
    * The error will be displayed when there is one record has invalid data (text for number field)
    */
    it('[Record-120] - should return error when there is one record has invalid data (text for number field)', () => {
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'id': 2,
            'revision': 1,
            'record': {
              'Number': {
                'value': 'The quick brown fox.'
              }
            }
          }
        ]
      };
      const recordsData = [recordDataUpdate];
      const expectResult = {
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
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const getRecordResult = recordModule.updateRecords({app: appID, records: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    /**
    * Invalid data
    * The error will be displayed when there is one record has invalid data (duplicate data for "prohibit duplicate value" field)
    */
    it('[Record-121] - should return error when there is one record has duplicate data for "prohibit duplicate value" field)', () => {
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
            'record': {
              'title_event': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'id': 2,
            'revision': 1,
            'record': {
              'Number': {
                'value': '5'
              }
            }
          }
        ]
      };
      const recordsData = [recordDataUpdate];
      const expectResult = {
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
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const getRecordResult = recordModule.updateRecords({app: appID, records: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    /**
    * Invalid data
    * The error will be displayed when there is one record has invalid data (exceed maximum for number field)
    */
    it('[Record-122] - should return error when there is one record has exceed maximum for number field)', () => {
      const appID = 22;
      const recordDataUpdate = {
        'app': appID,
        'records': [
          {
            'id': 1,
            'revision': 4,
            'record': {
              'string_1': {
                'value': 'Silver plates'
              }
            }
          },
          {
            'id': 2,
            'revision': 1,
            'record': {
              'Number': {
                'value': '59'
              }
            }
          }
        ]
      };
      const recordsData = [recordDataUpdate];
      const expectResult = {
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
        .put(API_ROUTE.RECORDS, (rqBody) => {
          expect(rqBody.records).toEqual(recordsData);
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

      const getRecordResult = recordModule.updateRecords({app: appID, records: recordsData});
      return getRecordResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
