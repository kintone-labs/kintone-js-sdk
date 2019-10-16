import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, USERNAME, PASSWORD, DOMAIN} from './common';
import nock from 'nock';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const RECORDS_ROUTE = `/k/v1/records.json`;

describe('Check Record.deleteRecords', () => {
  it('should be called successfully', () => {
    const data = {
      app: 2,
      ids: [1]
    };
    nock(URI + ':443')
      .delete(RECORDS_ROUTE, (rqBody) => {
        expect(rqBody.app).toEqual(data.app);
        expect(rqBody.ids).toEqual(data.ids);
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, {});

    const deleteRecordsResult = recordModule.deleteRecords(data);
    return deleteRecordsResult.then((rsp) => {
      expect(rsp).toEqual({});
    });
  });
});