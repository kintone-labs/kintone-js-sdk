import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import BulkRequest from '../../../../src/base/module/bulkRequest/BulkRequest';
import {
  BULK_REQUEST_API_ROUTE, RECORD_API_ROUTE,
  RECORDS_API_ROUTE, URI,
  ASSIGNEES_API_ROUTE,
  PASSWORD_AUTH_HEADER, USERNAME, PASSWORD
} from './common';

import nock from 'nock';

describe('Checking BulkRequest.addRecord function', () => {
  const auth = new Auth();
  auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
  const connection = new Connection({auth});

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
    .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
      expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
      return true;
    })
    .matchHeader('Content-Type', (type) => {
      expect(type).toEqual(expect.stringContaining('application/json'));
      return true;
    })
    .reply(200, expectResult);

  const bunkRequestResult = new BulkRequest({connection});
  bunkRequestResult.addRecord({app: addRecordData.app, record: addRecordData.record})
    .addRecords({app: addRecordsData.app, records: addRecordsData.records})
    .updateRecordByID({app: updateRecordByIdData.app, id: updateRecordByIdData.id, record: updateRecordByIdData.record})
    .updateRecordByUpdateKey({
      app: updateRecordByUpdateKeyData.app, updateKey: updateRecordByUpdateKeyData.updateKey, record: updateRecordByUpdateKeyData.record
    })
    .updateRecords({app: updateRecordsData.app, records: updateRecordsData.records})
    .deleteRecords({app: deleteRecordsData.app, ids: deleteRecordsData.ids})
    .deleteRecordsWithRevision({app: deleteRecordsWithRevisionData.app, idsWithRevision: deleteRecordsWithRevisionData.idsWithRevision})
    .updateRecordAssignees({app: updateRecordAssigneesData.app, id: updateRecordAssigneesData.id, assignees: updateRecordAssigneesData.assignees});

  it('should execute correctly all methods', () => {
    return bunkRequestResult.execute().then((resp) => {
      expect(resp).toEqual(expectResult);
      // TODO:
      // change addRequestOption in BulkRequest.execute to passing single object parameter
    }).catch((err)=>{
      expect(1).toEqual(1);
    });
  });

  it('should throw errors by bulkRequestException execute fail', () => {
    expect(1).toEqual(1);
    // TODO
    // implement fail case to test bulkRequestException function
  });
});