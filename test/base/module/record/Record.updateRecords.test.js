import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, PASSWORD_AUTH_HEADER, USERNAME, PASSWORD, DOMAIN, getPasswordAuth} from './common';
import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const RECORDS_ROUTE = '/k/v1/records.json';

describe('Checking Record.updateRecords', () => {
  it('should be called successfully', () => {
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
      .put(RECORDS_ROUTE, (rqBody) => {
        expect(rqBody.app).toEqual(appID);
        expect(rqBody.records).toEqual(recordsData);
        return true;
      })
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
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

  it('should throw error when called with empty parameters', () => {
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
      .put(RECORDS_ROUTE, (rqBody) => {
        expect(rqBody.app).toEqual(appID);
        expect(rqBody.records).toEqual(recordsData);
        return true;
      })
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toBe('application/json;charset=utf-8');
        return true;
      })
      .reply(200, expectResult);

    return recordModule.updateRecords().catch((err) => {
      expect(err).toBeInstanceOf(KintoneAPIException);
    });
  });
});