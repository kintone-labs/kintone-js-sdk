import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, USERNAME, PASSWORD, DOMAIN} from './common';
import nock from 'nock';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const BULK_REQUEST_API_ROUTE = '/k/v1/bulkRequest.json';

describe('Check Record.deleteAllRecords', () => {
  it('should throw error when called with invalid app ID', () => {
    const expectedErrors = {
      'results': [
        {
          'id': 'Jt2jVNMHlZxXPufVeZCz',
          'code': 'CB_VA01',
          'message': 'Missing or invalid input.',
          'errors': {
            'id': {
              'messages': [
                'must be greater than or equal to 1'
              ]
            }
          }
        }
      ]
    };
    nock(URI)
      .post(BULK_REQUEST_API_ROUTE)
      .reply(400, expectedErrors);
    return recordModule.deleteAllRecords(-1, []).catch((err)=>{
      // TODO: deleteAllRecords line 380 is unnecessary
      expect(Array.isArray(err)).toBe(true);
      expect(err[0].errorResponse).toMatchObject(expectedErrors.results[0]);
    });
  });

  it('should be called recursively', () => {
    const appID = 1;
    const ids = [];
    for (let index = 0; index < 3000; index++) {
      ids.push(index);
    }

    const expectedDeleteResults = {
      'results': [{}]
    };

    nock(URI)
      .post(BULK_REQUEST_API_ROUTE)
      .reply(200, expectedDeleteResults)
      .post(BULK_REQUEST_API_ROUTE)
      .reply(200, expectedDeleteResults);

    return recordModule.deleteAllRecords(appID, ids).then((rsp) => {
      expect(rsp).toEqual([{}, {}]);
    });
  });
});