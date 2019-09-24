import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, PASSWORD_AUTH_HEADER, USERNAME, PASSWORD, DOMAIN, GET_RECORDS_LIMIT} from './common';
import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const RECORDS_ROUTE = '/k/v1/records.json';

describe('Checking Record.getAllRecordsByQuery', () => {
  it('should be called successfully', () => {
    const body = {
      app: 844,
      query: 'Created_datetime = TODAY()',
      totalCount: true,
      fields: ['recordID']
    };

    const recordsData = [];
    const recordsDataLenght = 560;
    const expectResponsePerRequest = [];
    for (let index = 0; index < recordsDataLenght; index++) {
      recordsData.push(
        {
          'recordID': {
            'type': 'RECORD_NUMBER',
            'value': index + 1
          }
        });
    }

    for (let index = 0; index < Math.ceil(recordsDataLenght / GET_RECORDS_LIMIT); index++) {
      const start = index * GET_RECORDS_LIMIT;
      const end = recordsDataLenght - start < GET_RECORDS_LIMIT ? recordsDataLenght : start + GET_RECORDS_LIMIT;
      expectResponsePerRequest.push({
        'records': recordsData.slice(start, end)
      });
    }

    const expectResponse = {
      'records': recordsData,
      'totalCount': recordsDataLenght
    };

    let expectURL1 = `${RECORDS_ROUTE}?app=${body.app}`;
    expectURL1 += `&query=${encodeURIComponent(`${body.query} limit ${GET_RECORDS_LIMIT} offset 0`)}`;
    expectURL1 += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
    let expectURL2 = `${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent(body.query + ' limit 500 offset 500')}`;
    expectURL2 += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
    nock(URI)
      .get(expectURL1)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResponsePerRequest[0])
      .get(expectURL2)
      .reply(200, expectResponsePerRequest[1]);
    return recordModule.getAllRecordsByQuery(body)
      .then(rsp => {
        expect(rsp).toHaveProperty('records');
        expect(rsp).toMatchObject(expectResponse);
      });
  });

  it('should throw error when called with empty parameters', () => {
    return recordModule.getAllRecordsByQuery()
      .catch((err)=>{
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
  });

  it('should be called successfully with seek flag and query', () => {
    const body = {
      app: 844,
      query: 'Created_datetime = TODAY()',
      totalCount: true,
      fields: ['recordID'],
      seek: true
    };

    const recordsData = [];
    const recordsDataLenght = 560;
    const expectResponsePerRequest = [];
    for (let index = 0; index < recordsDataLenght; index++) {
      recordsData.push(
        {
          'recordID': {
            'type': 'RECORD_NUMBER',
            'value': index + 1
          }
        });
    }

    for (let index = 0; index < Math.ceil(recordsDataLenght / GET_RECORDS_LIMIT); index++) {
      const start = index * GET_RECORDS_LIMIT;
      const end = recordsDataLenght - start < GET_RECORDS_LIMIT ? recordsDataLenght : start + GET_RECORDS_LIMIT;
      expectResponsePerRequest.push({
        'records': recordsData.slice(start, end)
      });
    }

    const expectResponse = {
      'records': recordsData,
      'totalCount': recordsDataLenght
    };

    let expectURL1 = `${RECORDS_ROUTE}?app=${body.app}`;
    expectURL1 += `&query=${encodeURIComponent(`($id > 0) and ${body.query} order by $id asc limit ${GET_RECORDS_LIMIT} offset 0`)}`;
    expectURL1 += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
    let expectURL2 = `${RECORDS_ROUTE}?app=${body.app}&query=${encodeURIComponent('($id > 0) and ' + body.query + ' order by $id asc limit 500 offset 500')}`;
    expectURL2 += `&fields[0]=${body.fields[0]}&totalCount=${body.totalCount}`;
    nock(URI)
      .get(expectURL1)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResponsePerRequest[0])
      .get(expectURL2)
      .reply(200, expectResponsePerRequest[1]);

    return recordModule.getAllRecordsByQuery(body)
      .then(rsp => {
        expect(rsp).toHaveProperty('records');
        expect(rsp).toMatchObject(expectResponse);
      });
  });
});