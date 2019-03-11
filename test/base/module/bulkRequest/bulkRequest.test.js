
/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');
const common = require('../../utils/common');
const {BulkRequest, Connection, Auth} = require(common.MAIN_PATH);

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);
const URI = 'https://' + common.DOMAIN;
const BULK_REQUEST_API_ROUTE = `/k/v1/bulkRequest.json`;
const RECORD_API_ROUTE = '/k/v1/record.json';
const RECORDS_API_ROUTE = '/k/v1/records.json';
const ASSIGNEES_API_ROUTE = '/k/v1/record/assignees.json';
const STATUS_API_ROUTE = '/k/v1/record/status.json';

describe('BulkRequest module', () => {
  describe('Common case', () => {
    const data = {
      appID: 1,
      recordData: {
        Text_0: {
          value: 1
        }
      },
      updateKey: {
        field: 'Update_Key',
        value: '1'
      }
    };

    const bulkRequest = new BulkRequest(conn);
    const addRecord = bulkRequest.addRecord(data.appID);
    const addRecords = bulkRequest.addRecords(data.appID, [data.recordData]);
    const updateRecordById = bulkRequest.updateRecordByID(data.appID, '', data.recordData);
    const updateRecordByUpdateKey = bulkRequest.updateRecordByUpdateKey(data.appID, data.updateKey, data.recordData);
    const updateRecords = bulkRequest.updateRecords();
    const deleteRecords = bulkRequest.deleteRecords();
    const deleteRecordsWithRevision = bulkRequest.deleteRecordsWithRevision();
    const updateRecordAssignees = bulkRequest.updateRecordAssignees();
    const updateRecordStatus = bulkRequest.updateRecordStatus();
    const updateRecordsStatus = bulkRequest.updateRecordsStatus();

    it('[BulkRequest-0] check addrecord method', () => {
      expect(addRecord).toBeInstanceOf(BulkRequest);
    });

    it('[BulkRequest-0] check addRecords method', () => {
      expect(addRecords).toBeInstanceOf(BulkRequest);
    });

    it('[BulkRequest-0] check updateRecordById method', () => {
      expect(updateRecordById).toBeInstanceOf(BulkRequest);
    });

    it('[BulkRequest-0] check updateRecordByUpdateKey method', () => {
      expect(updateRecordByUpdateKey).toBeInstanceOf(BulkRequest);
    });

    it('[BulkRequest-0] check updateRecords method', () => {
      expect(updateRecords).toBeInstanceOf(BulkRequest);
    });

    it('[BulkRequest-0] check deleteRecords method', () => {
      expect(deleteRecords).toBeInstanceOf(BulkRequest);
    });

    it('[BulkRequest-0] check deleteRecordsWithRevision method', () => {
      expect(deleteRecordsWithRevision).toBeInstanceOf(BulkRequest);
    });

    it('[BulkRequest-0] check updateRecordAssignees method', () => {
      expect(updateRecordAssignees).toBeInstanceOf(BulkRequest);
    });

    it('[BulkRequest-0] check updateRecordStatus method', () => {
      expect(updateRecordStatus).toBeInstanceOf(BulkRequest);
    });

    it('[BulkRequest-0] check updateRecordsStatus method', () => {
      expect(updateRecordsStatus).toBeInstanceOf(BulkRequest);
    });

    nock(URI)
      .post(BULK_REQUEST_API_ROUTE)
      .reply(200, {
        'record': {}
      });
    const execute = bulkRequest.execute();
    it('The execute function should return Promise', () => {
      expect(execute).toHaveProperty('then');
      expect(execute).toHaveProperty('catch');
    });

  });

  describe('Success Case', () => {
    const addRecordData = {app: 1, record: {Text: {value: 'add'}}};
    const addRecordsData = {app: 2, records: [addRecordData.record]};
    const updateRecordByIdData = {app: 1, id: 1, record: {Text: {value: 'add'}}};
    const updateRecordByUpdateKeyData = {
      app: 2,
      updateKey: {field: 'key_field', value: 1},
      record: {Text: {value: 'update key'}}
    };
    const updateRecordsData = {
      app: 1,
      records: [{id: 5, record: {Text: {value: 'update records'}}}]
    };
    const deleteRecordsData = {app: 3, ids: [1, 2]};
    const deleteRecordsWithRevisionData = {app: 3, idsWithRevision: {3: 1, 4: 2}};
    const updateRecordAssigneesData = {'app': 1, 'id': 1, 'assignees': ['user2']};
    const expectBody = {
      'requests': [
        {
          'method': 'POST',
          'api': RECORD_API_ROUTE,
          'payload': {
            'app': 1,
            'record': {Text: {value: 'add'}}
          }
        },
        {
          'method': 'POST',
          'api': RECORDS_API_ROUTE,
          'payload': {
            'app': 2,
            'records': [{Text: {value: 'add'}}]
          }
        },
        {
          'method': 'PUT',
          'api': RECORD_API_ROUTE,
          'payload': {
            'app': 1,
            'id': 1,
            'record': {Text: {value: 'add'}},
            'revision': null
          }
        },
        {
          'method': 'PUT',
          'api': RECORD_API_ROUTE,
          'payload': {
            app: 2,
            updateKey: {field: 'key_field', value: 1},
            record: {Text: {value: 'update key'}},
            revision: null
          }
        },
        {
          'method': 'PUT',
          'api': RECORDS_API_ROUTE,
          'payload': {
            app: 1,
            records: [{id: 5, record: {Text: {value: 'update records'}}}]
          }
        },
        {
          'method': 'DELETE',
          'api': RECORDS_API_ROUTE,
          'payload': {app: 3, ids: [1, 2]}
        },
        {
          'method': 'DELETE',
          'api': RECORDS_API_ROUTE,
          'payload': {app: 3, ids: ['3', '4'], revisions: [1, 2]}
        },
        {
          'method': 'PUT',
          'api': ASSIGNEES_API_ROUTE,
          'payload': {
            'app': 1,
            'id': 1,
            'assignees': ['user2'],
            'revision': null
          }
        },

      ]
    };
    const expectResult = {
      results: [
        {},
        {
          id: 39,
          revision: 1
        },
        {
          revision: 34
        },
        {}
      ]
    };
    nock(URI)
      .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual(expectBody);
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
      .reply(200, expectResult);

    const bunkRequestResult = new BulkRequest(conn);
    bunkRequestResult.addRecord(addRecordData.app, addRecordData.record)
      .addRecords(addRecordsData.app, addRecordsData.records)
      .updateRecordByID(updateRecordByIdData.app, updateRecordByIdData.id, updateRecordByIdData.record)
      .updateRecordByUpdateKey(updateRecordByUpdateKeyData.app, updateRecordByUpdateKeyData.updateKey, updateRecordByUpdateKeyData.record)
      .updateRecords(updateRecordsData.app, updateRecordsData.records)
      .deleteRecords(deleteRecordsData.app, deleteRecordsData.ids)
      .deleteRecordsWithRevision(deleteRecordsWithRevisionData.app, deleteRecordsWithRevisionData.idsWithRevision)
      .updateRecordAssignees(updateRecordAssigneesData.app, updateRecordAssigneesData.id, updateRecordAssigneesData.assignees);

    it('[BulkRequest-1] should execute correctly all methods', () => {
      return bunkRequestResult.execute().then((resp) => {
        expect(resp).toEqual(expectResult);
      });
    });
  });

  describe('Error Case', () => {
    it('[BulkRequest-3] Error returns when there is invalid record data on addRecord', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const addRecordInvalidData = {app: 1, record: {Number: {value: 'abc'}}};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordInvalidData
          }
        ]
      };
      const expectResult = {
        'results': [
          {},
          {
            'message': 'Only numbers are allowed.',
            'id': '1505999166-1721668264',
            'code': 'GAIA_RE01',
          },
        ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record);
      bulkRequest.addRecord(addRecordData.app, addRecordInvalidData.record);

      return bulkRequest.execute()
        .catch(err => {
          expect(err[0]).toEqual(expectResult.results[0]);
          expect(err[1].get()).toMatchObject(expectResult.results[1]);
        });
    });

    it('[BulkRequest-4] Error returns when there is invalid record data on addRecords', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const addRecordsInvalidData = {app: 1, records: [{Number: {value: 3}}, {Number: {value: 'abc'}}]};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'POST',
            'api': RECORDS_API_ROUTE,
            'payload': addRecordsInvalidData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'Only numbers are allowed.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_RE01'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record);
      bulkRequest.addRecords(addRecordData.app, addRecordsInvalidData.records);

      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-5] Error returns when there is invalid id on updateRecordById', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordByIdData = {app: 1, id: 99999, record: {Text: {value: 'add'}}, revision: null};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': RECORD_API_ROUTE,
            'payload': updateRecordByIdData,
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The record (ID: 99999) not found. The record may have been deleted',
              'id': '1505999166-1721668264',
              'code': 'GAIA_RE01'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record);
      bulkRequest.updateRecordByID(updateRecordByIdData.app, updateRecordByIdData.id, updateRecordByIdData.record);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-6] Error returns when there is invalid updateKey on updateRecordByUpdateKey', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordByUpdateKeyData = {
        app: 1,
        updateKey: {field: 'invalid_key_field', value: 1},
        record: {Text: {value: 'update key'}},
        revision: null
      };
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': RECORD_API_ROUTE,
            'payload': updateRecordByUpdateKeyData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'Specified field (invalid_key_field) not found.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_IQ11',
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordByUpdateKey(updateRecordByUpdateKeyData.app, updateRecordByUpdateKeyData.updateKey, updateRecordByUpdateKeyData.record);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-7] Error returns when there is invalid record on updateRecords', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordsData = {
        app: 1,
        records: [{id: 5, record: {Number: {value: 'update records'}}}]
      };
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': RECORDS_API_ROUTE,
            'payload': updateRecordsData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'Only numbers are allowed.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_RE01'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecords(updateRecordsData.app, updateRecordsData.records);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-8] Error returns when there is invalid id on updateRecords', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordsData = {
        app: 1,
        records: [{id: 99999, record: {Text: {value: 'update records'}}}]
      };
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': RECORDS_API_ROUTE,
            'payload': updateRecordsData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The record (ID: 99999) not found. The record may have been deleted',
              'id': '1505999166-1721668264',
              'code': 'GAIA_RE01'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecords(updateRecordsData.app, updateRecordsData.records);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-9] Error returns when there is invalid id on deleteRecords', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const deleteRecordsData = {app: 3, ids: [1, 9999999999]};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'DELETE',
            'api': RECORDS_API_ROUTE,
            'payload': deleteRecordsData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The specified record (ID: 9999999999) is not found.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_RE01'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .deleteRecords(deleteRecordsData.app, deleteRecordsData.ids);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-10] Error returns when there is invalid revision on deleteRecordsWithRevision', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const deleteRecordsWithRevisionData = {app: 3, idsWithRevision: {3: 9999, 4: 2}};
      const deleteRecordsWithRevisionDataBody = {app: 3, ids: ['3', '4'], revisions: [9999, 2]};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'DELETE',
            'api': RECORDS_API_ROUTE,
            'payload': deleteRecordsWithRevisionDataBody
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The revision is not the latest. Someone may update a record.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_CO02'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .deleteRecordsWithRevision(deleteRecordsWithRevisionData.app, deleteRecordsWithRevisionData.idsWithRevision);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-13] Error returns when there is invalid revision on updateRecords', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordsData = {
        app: 1,
        records: [{id: 99999, record: {Text: {value: 'update records'}, revision: 9999}}]
      };
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': RECORDS_API_ROUTE,
            'payload': updateRecordsData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The revision is not the latest. Someone may update a record.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_CO02'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecords(updateRecordsData.app, updateRecordsData.records);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-14] Error returns when there is invalid assignee on updateAssigneesRecord', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordAssigneesData = {'app': 1, 'id': 1, 'assignees': ['user_notexist'], 'revision': null};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': ASSIGNEES_API_ROUTE,
            'payload': updateRecordAssigneesData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The specified user (code：user_notexist) not found.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_IL26'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordAssignees(updateRecordAssigneesData.app, updateRecordAssigneesData.id, updateRecordAssigneesData.assignees);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-15] Error returns when there is invalid record on updateAssigneesRecord', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordAssigneesData = {'app': 1, 'id': 9999999999, 'assignees': ['user_1'], 'revision': null};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': ASSIGNEES_API_ROUTE,
            'payload': updateRecordAssigneesData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The specified record (ID: 9999999999) is not found.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_RE01'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordAssignees(updateRecordAssigneesData.app, updateRecordAssigneesData.id, updateRecordAssigneesData.assignees);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-16] Error returns when there is invalid revision on updateAssigneesRecord', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordAssigneesData = {'app': 1, 'id': 1, 'assignees': ['user_1'], 'revision': 999};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': ASSIGNEES_API_ROUTE,
            'payload': updateRecordAssigneesData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The revision is not the latest. Someone may update a record.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_CO02'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordAssignees(updateRecordAssigneesData.app, updateRecordAssigneesData.id,
          updateRecordAssigneesData.assignees, updateRecordAssigneesData.revision);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-17] Error returns when there is invalid id on updateStatusRecord', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordStatusData = {'app': 1, 'id': 9999, 'action': 'Submit', 'assignee': ['user_1'], 'revision': -1};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': STATUS_API_ROUTE,
            'payload': updateRecordStatusData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The record (ID: 99999) not found. The record may have been deleted',
              'id': '1505999166-1721668264',
              'code': 'GAIA_RE01'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordStatus(updateRecordStatusData.app, updateRecordStatusData.id,
          updateRecordStatusData.action, updateRecordStatusData.assignee, updateRecordStatusData.revision);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-18] Error returns when there is invalid status on updateStatusRecord', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordStatusData = {'app': 1, 'id': 1, 'action': 'INVALID STATUS', 'assignee': ['user_1'], 'revision': -1};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': STATUS_API_ROUTE,
            'payload': updateRecordStatusData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'Failed to update the status. The settings or the status itself may have been changed by someone.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_RE01'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordStatus(updateRecordStatusData.app, updateRecordStatusData.id,
          updateRecordStatusData.action, updateRecordStatusData.assignee, updateRecordStatusData.revision);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-19] Error returns when there is invalid assignee on updateStatusRecord', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordStatusData = {'app': 1, 'id': 1, 'action': 'Submit', 'assignee': ['user_99999'], 'revision': -1};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': STATUS_API_ROUTE,
            'payload': updateRecordStatusData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The specified user (code：user_99999) not found.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_IL26'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordStatus(updateRecordStatusData.app, updateRecordStatusData.id,
          updateRecordStatusData.action, updateRecordStatusData.assignee, updateRecordStatusData.revision);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-20] Error returns when there is invalid revision on updateStatusRecord', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordStatusData = {'app': 1, 'id': 1, 'action': 'Submit', 'assignee': ['user_1'], 'revision': 999};
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': STATUS_API_ROUTE,
            'payload': updateRecordStatusData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The revision is not the latest. Someone may update a record.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_IL26'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordStatus(updateRecordStatusData.app, updateRecordStatusData.id,
          updateRecordStatusData.action, updateRecordStatusData.assignee, updateRecordStatusData.revision);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-21] Error returns when there is invalid id on updateStatusRecords', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordsStatusData = {
        'app': 1,
        'records': [
          {
            'id': 9999,
            'action': 'Submit',
            'assignee': 'user2',
            'revision': 1
          },
          {
            'id': 2,
            'action': 'Confirm'
          },
          {
            'id': 3,
            'action': 'Decline',
            'revision': 5
          }
        ]
      };
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': '/k/v1/records/status.json',
            'payload': updateRecordsStatusData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The record (ID: 99999) not found. The record may have been deleted',
              'id': '1505999166-1721668264',
              'code': 'GAIA_IL26'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordsStatus(updateRecordsStatusData.app, updateRecordsStatusData.records);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-22] Error returns when there is invalid status on updateStatusRecords', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordsStatusData = {
        'app': 1,
        'records': [
          {
            'id': 1,
            'action': 'INVALIDSTATUS',
            'assignee': 'user2',
            'revision': 1
          },
          {
            'id': 2,
            'action': 'Confirm'
          },
          {
            'id': 3,
            'action': 'Decline',
            'revision': 5
          }
        ]
      };
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': '/k/v1/records/status.json',
            'payload': updateRecordsStatusData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'Failed to update the status. The settings or the status itself may have been changed by someone.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_IL26'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordsStatus(updateRecordsStatusData.app, updateRecordsStatusData.records);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-23] Error returns when there is invalid asignee on updateStatusRecords', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordsStatusData = {
        'app': 1,
        'records': [
          {
            'id': 1,
            'action': 'Submit',
            'assignee': 'user_99999',
            'revision': 1
          },
          {
            'id': 2,
            'action': 'Confirm'
          },
          {
            'id': 3,
            'action': 'Decline',
            'revision': 5
          }
        ]
      };
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': '/k/v1/records/status.json',
            'payload': updateRecordsStatusData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The specified user (code：user_99999) not found.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_IL26'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordsStatus(updateRecordsStatusData.app, updateRecordsStatusData.records);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });

    it('[BulkRequest-24] Error returns when there is invalid revision on updateStatusRecords', () => {
      const addRecordData = {app: 1, record: {Number: {value: 5}}};
      const updateRecordsStatusData = {
        'app': 1,
        'records': [
          {
            'id': 1,
            'action': 'Submit',
            'assignee': 'user_1',
            'revision': 9999
          },
          {
            'id': 2,
            'action': 'Confirm'
          },
          {
            'id': 3,
            'action': 'Decline',
            'revision': 5
          }
        ]
      };
      const expectBody = {
        'requests': [
          {
            'method': 'POST',
            'api': RECORD_API_ROUTE,
            'payload': addRecordData
          },
          {
            'method': 'PUT',
            'api': '/k/v1/records/status.json',
            'payload': updateRecordsStatusData
          }
        ]
      };
      const expectResult = {
        'results':
          [
            {},
            {
              'message': 'The revision is not the latest. Someone may update a record.',
              'id': '1505999166-1721668264',
              'code': 'GAIA_IL26'
            }
          ]
      };
      nock(URI)
        .post(BULK_REQUEST_API_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const bulkRequest = new BulkRequest(conn);
      bulkRequest.addRecord(addRecordData.app, addRecordData.record)
        .updateRecordsStatus(updateRecordsStatusData.app, updateRecordsStatusData.records);
      return bulkRequest.execute().catch((err) => {
        expect(err[0]).toEqual(expectResult.results[0]);
        expect(err[1].get()).toMatchObject(expectResult.results[1]);
      });
    });
  });
});