import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, PASSWORD_AUTH_HEADER, API_ROUTE, USERNAME, PASSWORD, DOMAIN, getPasswordAuth} from './common';
import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

describe('Checking Record.addRecord', () => {
  it('should be called successfully', () => {
    const body = {
      app: 1,
      record: {
        Dropdown: {value: 1},
        Text: {value: 'test'},
        Number: {value: 1},
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
      }
    };

    nock(URI)
      .post(API_ROUTE.RECORD, (rqBody) => {
        expect(rqBody.record).toEqual(body.record);
        return rqBody.app === body.app;
      })
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, {'id': '100', 'revision': '1'});
    const addRecordsResult = recordModule.addRecord(body);
    return addRecordsResult.then((rsp) => {
      expect(rsp).toHaveProperty('id');
      expect(rsp).toHaveProperty('revision');
    });
  });
  it('should throw error when fail when missing required field', () => {
    nock(URI)
      .post(API_ROUTE.RECORD, (rqBody) => {
        expect(rqBody).toEqual({});
        return true;
      })
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(400, {});
    const addRecordsResult = recordModule.addRecord();
    return addRecordsResult.catch((err) => {
      expect(err).toBeInstanceOf(KintoneAPIException);
    });
  });
});