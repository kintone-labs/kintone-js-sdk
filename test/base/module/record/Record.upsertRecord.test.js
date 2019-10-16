import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, PASSWORD_AUTH_HEADER, USERNAME, PASSWORD, DOMAIN, getPasswordAuth, API_ROUTE} from './common';
import nock from 'nock';
import {KintoneAPIException} from '../../../../src/base/main';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

describe('Check Record.upsertRecord', () => {
  it('should be called successfully', () => {
    const updateKey = {
      field: 'Text_0',
      value: '1234'
    };
    const recordData = {

      Number: {
        value: 1
      }
    };
    const body = {
      app: 844,
      query: `${updateKey.field} = "${updateKey.value}"`,
      fields: [updateKey.field],
      totalCount: false,
    };
    const data = {
      'app': 844,
      'updateKey': updateKey,
      'revision': 2,
      'record': {
        Text_0: {
          value: '1234'
        },
        Number: {
          value: 1
        }
      }
    };
    nock(URI)
      .get(`${API_ROUTE.RECORDS}?app=${body.app}&query=${encodeURIComponent(body.query)}&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .reply(200, {
        'records': []
      }).post(API_ROUTE.RECORD,
        (rqBody) => {
          expect(rqBody.record).toEqual(data.record);
          return rqBody.app === body.app;
        })
      .reply(200, {'id': '100', 'revision': '1'});

    return recordModule.upsertRecord({app: body.app, updateKey: updateKey, record: recordData})
      .then(rsp => {
        expect(rsp.revision).toBe('1');
        expect(rsp.id).toBe('100');
      });
  });

  it('should throw error when called with empty param', () => {
    return recordModule.upsertRecord()
      .catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
  });
});