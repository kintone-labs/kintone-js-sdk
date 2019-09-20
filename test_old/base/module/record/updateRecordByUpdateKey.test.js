
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

describe('updateRecordByUpdateKey function', () => {
  describe('common case', () => {
    const appID = 1;
    const updateKey = {
      field: 'Text_0',
      value: '1234'
    };
    const recordData = {
      Number: {
        value: 1
      }
    };

    it('[Record-0-common] - should return a promise', () => {
      nock(URI)
        .put(API_ROUTE.RECORD)
        .reply(200, {'revisions': '2'});

      const updateRecordByUpdateKeyResult = recordModule.updateRecordByUpdateKey(appID, updateKey, recordData);
      expect(updateRecordByUpdateKeyResult).toHaveProperty('then');
      expect(updateRecordByUpdateKeyResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Record-85] - should update successfully the record', () => {
      const data = {
        'app': 777,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 2,
        'record': {
          'string_multi': {
            'value': 'this value has been updated'
          }
        }
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

      const updateRecordByUpdateKeyResult = recordModule.updateRecordByUpdateKey(data);
      return updateRecordByUpdateKeyResult.then((rsp) => {
        expect(rsp.revision).toEqual('3');
      });
    });
    /**
    * Todo: implement another success case
    */

    /**
     * Revision -1
     * The record is still updated successfully, the revision is increased by 1 after update
     */
    it('[Record-86] - should update successfully when the revision is -1', () => {
      const data = {
        'app': '22',
        'updateKey': {
          'field': 'Number',
          'value': '5'
        },
        'revision': -1,
        'record': {
          'title_event': {
            'value': 'Updated'
          }
        }
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

      const updateRecordByUpdateKeyResult = recordModule.updateRecordByUpdateKey(data);
      return updateRecordByUpdateKeyResult.then((rsp) => {
        expect(rsp.revision).toEqual('3');
      });
    });

    /**
     * Data table
     * Verify the data for record with table is added successfully
     */
    it('[Record-104] - Verify the data for record with table is added successfully', () => {
      const recordUpdate = {
        'app': '22',
        'updateKey': {
          'field': 'Number',
          'value': '5'
        },
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
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      const updateRecordByIdResult = recordModule.updateRecordByUpdateKey(recordUpdate);
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('2');
      });
    });

    /**
     * Guest space
     * The record is updated successfully for app in guest space
     */
    it('[Record-105] - The record is updated successfully for app in guest space', () => {
      const connGuestSpace = new Connection({domain: common.DOMAIN, auth: auth, guestSpaceID: common.GUEST_SPACEID});
      const recordUpdate = {
        'app': '777',
        'updateKey': {
          'field': 'Number',
          'value': '5'
        },
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
      nock(URI)
        .put(API_ROUTE.GUEST_RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      const recordModule_Guest = new Record({connection: connGuestSpace});
      const updateRecordByIdResult = recordModule_Guest.updateRecordByUpdateKey(recordUpdate);
      return updateRecordByIdResult.then((rsp) => {
        expect(rsp.revision).toEqual('3');
      });
    });

    /**
     * Invalid input type
     * The function still work correctly when executing with interger as string type (input string for interger and vice versa)
     */
    it(
      '[Record-106] The function still work correctly when executing with interger as string type (input string for interger and vice versa)',
      () => {
        const recordUpdate = {
          'app': 777,
          'updateKey': {
            'field': 'Number',
            'value': '5'
          },
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
        nock(URI)
          .put(API_ROUTE.RECORD, (rqBody) => {
            expect(rqBody).toEqual(recordUpdate);
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
        const updateRecordByIdResult = recordModule.updateRecordByUpdateKey(recordUpdate);
        return updateRecordByIdResult.then((rsp) => {
          expect(rsp.revision).toEqual('4');
        });
      });
  });

  describe('error case', () => {
    it('[Record-87] - should return error when using wrong revison', () => {
      const data = {
        'app': 777,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 655,
        'record': {
          'string_multi': {
            'value': 'this value has been updated'
          }
        }
      };
      const expectResult = {
        'code': 'GAIA_CO02',
        'id': 'MJkW0PkiEJ3HhuPRkl3H',
        'message': '指定したrevisionは最新ではありません。ほかのユーザーがレコードを更新した可能性があります。'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .reply(409, expectResult);

      return recordModule.updateRecordByUpdateKey(data).catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    /**
     * wrong updatekey - The error will occur and record is not updated
     */
    it('[Record-88] - should return error when using wrong updatekey', () => {
      const data = {
        'app': 777,
        'updateKey': {
          'field': 'unique_key_error',
          'value': 'CODE123'
        },
        'revision': 655,
        'record': {
          'string_multi': {
            'value': 'this value has been updated'
          }
        }
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'z8L3jd329RCNjR5ZatyK',
        'message': 'Missing or invalid input.',
        'errors': {
          'updateKey': {
            'messages': [
              'The record to be updated must be specified by one of the parameters "id" and "updateKey".'
            ]
          },
          'id': {
            'messages': [
              'The record to be updated must be specified by one of the parameters "id" and "updateKey".'
            ]
          }
        }
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .reply(400, expectResult);

      return recordModule.updateRecordByUpdateKey(data).catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    /**
   * updatekey is not unique - Setting the updatekey field with "prohibit duplicate value" is turned off,
   * the error will occur and record is not updated
   */
    it('[Record-89] - should return error when updatekey is not unique', () => {
      const data = {
        'app': 777,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 655,
        'record': {
          'string_multi': {
            'value': 'this value has been updated'
          }
        }
      };
      const expectResult = {
        'code': 'GAIA_IQ27',
        'id': 'Yux7BxLRhcxIrcDLkCB5',
        'message': 'Failed to update record. The field (code: Number) set as "updateKey" must be set to "Prohibit duplicate values".'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .reply(400, expectResult);

      return recordModule.updateRecordByUpdateKey(data).catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    /**
   * Update data system field
   * Error is displayed when updating these fields:
   *  Created by
   *  Updated by
   *  Created datetime
   *  Updated datetime
   */
    it('[Record-91] - should return the error in the result: Error is displayed when updating these fields:' +
      'Created by' +
      'Updated by' +
      'Created datetime' +
      'Updated datetime', () => {
      const recordUpdate = {
        'app': 777,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 655,
        'record': {
          'string_multi': {
            'value': 'this value has been updated'
          }
        }
      };

      const expectResult = {
        'code': 'CB_IJ01',
        'id': 'wcRfYn4IOTtdsHuExF5a',
        'message': 'Invalid JSON string.'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    /**
     * Permission
     * Error happens when user does not have Edit permission for app
     */
    it('[Record-92] - should return the error in the result: Error happens when user does not have Edit permission for app', () => {
      const recordUpdate = {
        'app': 777,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 655,
        'record': {
          'string_multi': {
            'value': 'this value has been updated'
          }
        }
      };

      const expectResult = {
        'code': 'CB_NO02',
        'id': 'M00VPaOdPEmu4kNlBawh',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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

      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    /**
     * Permission
     * Error happens when user does not have Edit permission for record
     */
    it('[Record-93] - should return the error in the result: Error happens when user does not have Edit permission for record', () => {
      const recordUpdate = {
        'app': 777,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 655,
        'record': {
          'string_multi': {
            'value': 'this value has been updated'
          }
        }
      };

      const expectResult = {
        'code': 'CB_NO02',
        'id': 'M00VPaOdPEmu4kNlBawh',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    /**
     * Permission
     * Error happens when user does not have Edit permission for field
     */
    it('[Record-94] - should return the error in the result: Error happens when user does not have Edit permission for field', () => {
      const recordUpdate = {
        'app': 777,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 655,
        'record': {
          'string_multi': {
            'value': 'this value has been updated'
          }
        }
      };
      const expectResult = {
        'code': 'GAIA_FU01',
        'id': 'xnADSZe3pmfqNwkVtmsg',
        'message': 'Edit permissions are required to edit field "title_event".'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    /**
     * Invalid app ID
     * The error will be displayed when using invalid app ID (unexisted, negative number, 0)
     */
    it('[Record-95] should return the error when using invalid app ID (unexisted, negative number, 0)', () => {
      const recordUpdate = {
        'app': 220,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 655,
        'record': {
          'string_multi': {
            'value': 'this value has been updated'
          }
        }
      };
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'F1m5aSXHdHNEWxY9gZdS',
        'message': 'The app (ID: 220) not found. The app may have been deleted.'
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    /**
     * Missing required field
     * The error will be displayed when using method without app ID
     */
    it('[Record-96] - should return the error when using method without app ID', () => {
      const recordUpdate = {
        'app': 'null',
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 655,
        'record': {
          'string_multi': {
            'value': 'this value has been updated'
          }
        }
      };
      const expectResult = {
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
          expect(rqBody).toEqual(recordUpdate);
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
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    /**
     * Missing required field
     * Revision is increased by 1, no data is updated when using method without records data
     */
    it('[Record-97] - should return revision and increased by 1, no data updated', () => {
      const recordUpdate = {
        'app': 1,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 7,
        'record': {
        }
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .then((rsp) => {
          expect(rsp.revision).toEqual('7');
        });
    });
    /**
     * Required data
     * Error will be displayed when there is record without data for required field in the records arrray
     */
    it('[Record-98] - should return the error when there is record without data for required field in the records arrray', () => {
      const recordUpdate = {
        'app': 1,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 7,
        'record': {
        }
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
        .reply(200, {'revision': '7'});
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .then((rsp) => {
          expect(rsp.revision).toEqual('7');
        });
    });
    /**
     * Invalid field
     * The field will be skipped when there is record with invalid field in the records array
     */
    it('[Record-99] - should update record and skipped invalid field in the records array', () => {
      const recordUpdate = {
        'app': 1,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': 7,
        'record': {
          'title_event': {
            'value': 'Updated'
          },
          'RequiredField22': {
            'value': 'Updated'
          }
        }
      };
      nock(URI)
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .then((rsp) => {
          expect(rsp.revision).toEqual('9');
        });
    });
    /**
     * Invalid data
     * The error will be displayed when there is one record has invalid data (text for number field)
     */
    it('[Record-100] - should return the error when there is one record has invalid data (text for number field)', () => {
      const recordUpdate = {
        'app': 22,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
        'revision': null,
        'record': {
          'title_event': {
            'value': 'Updated'
          },
          'Number': {
            'value': 'Dan kha'
          }
        }
      };
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
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
    /**
     * Invalid data
     * The error will be displayed when there is one record has invalid data (duplicate data for "prohibit duplicate value" field)
     */
    it('[Record-101] - should return the error when there is one record has duplicate data for "prohibit duplicate value" field)', () => {
      const recordUpdate = {
        'app': 22,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
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
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });

    /**
     * Invalid data
     * The error will be displayed when there is one record has invalid data (exceed maximum for number field)
     */
    it('[Record-102] - should return the error when there is one record has exceed maximum for number field)', () => {
      const recordUpdate = {
        'app': 22,
        'updateKey': {
          'field': 'unique_key',
          'value': 'CODE123'
        },
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
        .put(API_ROUTE.RECORD, (rqBody) => {
          expect(rqBody).toEqual(recordUpdate);
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
      return recordModule.updateRecordByUpdateKey(recordUpdate)
        .catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
    });
  });
});