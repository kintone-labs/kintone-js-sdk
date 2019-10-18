import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, USERNAME, PASSWORD, DOMAIN} from './common';
import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const RECORDS_ROUTE = `/k/v1/records.json`;

describe('Check Record.deleteRecordsWithRevision', () => {
  it('should be called successfully', () => {
    const data = {
      app: 1,
      idsWithRevision: {
        '1': 1
      }
    };

    const expectBody = {
      'app': 1,
      'ids': ['1'],
      'revisions': [1]
    };


    nock(URI)
      .delete(RECORDS_ROUTE, (rqBody) => {
        expect(rqBody).toEqual(expectBody);
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json;charset=utf-8'));
        return true;
      })
      .reply(200, {});

    return recordModule.deleteRecordsWithRevision(data).then((rsp) => {
      expect(rsp).toEqual({});
    });
  });

  it('should throw error when called with empty param', () => {
    const expectedError = {
      'code': 'CB_IL02',
      'id': 'dW6xRq9xjBnvBg99uLAK',
      'message': 'Illegal request.'
    };

    nock(URI)
      .delete(RECORDS_ROUTE)
      .reply(400, expectedError);
    return recordModule.deleteRecordsWithRevision().catch((err) => {
      expect(err).toBeInstanceOf(KintoneAPIException);
      expect(err.errorResponse).toMatchObject(expectedError);
    });
  });
});