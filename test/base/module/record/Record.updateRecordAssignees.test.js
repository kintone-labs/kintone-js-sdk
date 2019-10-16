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

const RECORDS_ASSIGNEES_ROUTE = '/k/v1/record/assignees.json';

describe('Checking Record.updateRecordAssignees', () => {
  it('should be called successfully', () => {
    const data = {
      app: 1,
      id: 1,
      assignees: ['user1'],
      revision: 2
    };

    const expectResult = {'revision': '3'};

    nock(URI)
      .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
        expect(rqBody).toEqual(data);
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, expectResult);
    const updateRecordAssigneesResult = recordModule.updateRecordAssignees(data);
    return updateRecordAssigneesResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('should throw error when called with empty parameter', () => {
    const data = {
      app: 1,
      id: 1,
      assignees: ['user1'],
      revision: 2
    };

    const expectResult = {'revision': '3'};

    nock(URI)
      .put(`${RECORDS_ASSIGNEES_ROUTE}`, (rqBody) => {
        expect(rqBody).toEqual(data);
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, expectResult);
    const updateRecordAssigneesResult = recordModule.updateRecordAssignees();
    return updateRecordAssigneesResult.catch((err) => {
      expect(err).toBeInstanceOf(KintoneAPIException);
    });
  });
});