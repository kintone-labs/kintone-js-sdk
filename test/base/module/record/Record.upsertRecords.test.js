import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, USERNAME, PASSWORD, PASSWORD_AUTH_HEADER, DOMAIN, GET_RECORDS_LIMIT, API_ROUTE, UPDATE_RECORDS_LIMIT} from './common';
import nock from 'nock';
import {KintoneAPIException} from '../../../../src/base/main';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const appID = 84;
const LIMIT_UPSERT_RECORD = 1500;

describe('Check upsertRecords', () => {
  it('should be called successfully', () => {
    const expectBodys = {'requests': []};
    const expectResults = {'results': []};
    const recordsDataLenght = 10;
    const recordsWithUpd8Key = [];
    const recordsForPut = [];
    const recordsForPost = [];
    const resultsForPut = [];
    const resultsForPost = {ids: [], revisions: []};
    for (let index = 0; index < recordsDataLenght; index++) {
      const recordForPut = {
        updateKey: {
          field: 'Text_0',
          value: 'update' + index
        },
        record: {
          Text_1: {
            value: index
          }
        }
      };
      const recordForPost = {
        updateKey: {
          field: 'Text_0',
          value: 'add' + index
        },
        record: {
          Text_1: {
            value: index
          }
        }
      };
      recordsForPut.push(recordForPut);
      recordsForPost.push({
        Text_0: {
          value: 'add' + index
        },
        Text_1: {
          value: index
        }
      });
      resultsForPut.push({
        id: 1 + index,
        revision: index > 100 ? 3 : 2,
      });
      resultsForPost.ids.push(recordsDataLenght + index);
      resultsForPost.revisions.push(1);
      recordsWithUpd8Key.push(recordForPut);
      recordsWithUpd8Key.push(recordForPost);
    }
    for (let index = 0; index < Math.ceil(recordsDataLenght / UPDATE_RECORDS_LIMIT); index++) {
      const start = index * UPDATE_RECORDS_LIMIT;
      const end = start + UPDATE_RECORDS_LIMIT;
      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'POST',
        'payload': {
          'app': appID,
          'records': recordsForPost.slice(start, end)
        }
      });
      expectResults.results.push({
        'ids': resultsForPost.ids.slice(start, end),
        'revisions': resultsForPost.revisions.slice(start, end)
      });
    }
    for (let index = 0; index < Math.ceil(recordsDataLenght / UPDATE_RECORDS_LIMIT); index++) {
      const start = index * UPDATE_RECORDS_LIMIT;
      const end = start + UPDATE_RECORDS_LIMIT;
      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'PUT',
        'payload': {
          'app': appID,
          'records': recordsForPut.slice(start, end)
        }
      });
      expectResults.results.push({
        'records': resultsForPut.slice(start, end)
      });
    }
    const recordsForGet = [];
    for (let index = 0; index < 499; index++) {
      const record = {
        record_id: {
          type: 'RECORD_NUMBER',
          value: index + 1
        },
        Text_0: {
          type: 'String',
          value: 'update' + index
        },
        Text_1: {
          type: 'String',
          value: index
        }
      };
      recordsForGet.push(record);
    }
    const body = {
      app: appID,
      query: `limit ${GET_RECORDS_LIMIT} offset 0`
    };
    const expectResponsePerRequest = [{'records': recordsForGet}];
    nock(URI)
      .get(API_ROUTE.RECORDS)
      .query(body)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResponsePerRequest[0])
      .post(API_ROUTE.BULK, (rqBody) => {
        expect(rqBody).toEqual(expectBodys);
        return true;
      })
      .reply(200, expectResults);

    return recordModule.upsertRecords({app: appID, records: recordsWithUpd8Key}).then((resp) => {
      expect(resp.results.length).toEqual(expectResults.results.length);
    });
  });

  it('should return error when upsert over 1500 records', async () => {
    const recordsDataLenght = 1501;
    const recordsWithUpd8Key = [];
    for (let index = 0; index < recordsDataLenght; index++) {
      const recordForPut = {
        updateKey: {
          field: 'Text_0',
          value: 'update' + index
        },
        record: {
          Text_1: {
            value: index
          }
        }
      };
      recordsWithUpd8Key.push(recordForPut);
    }
    const message = `upsertRecords can't handle over ${LIMIT_UPSERT_RECORD} records.`;
    try {
      await recordModule.upsertRecords({app: appID, records: recordsWithUpd8Key});
    } catch (e) {
      expect(e).toBeInstanceOf(KintoneAPIException);
      expect(e.message).toEqual(message);
    }
  });
});