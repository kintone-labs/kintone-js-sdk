import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
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
    const recordsDataLength = 560;
    const expectResponsePerRequest = [];
    for (let index = 0; index < recordsDataLength; index++) {
      recordsData.push(
        {
          'recordID': {
            'type': 'RECORD_NUMBER',
            'value': index + 1
          }
        });
    }

    for (let index = 0; index < Math.ceil(recordsDataLength / GET_RECORDS_LIMIT); index++) {
      const start = index * GET_RECORDS_LIMIT;
      const end = recordsDataLength - start < GET_RECORDS_LIMIT ? recordsDataLength : start + GET_RECORDS_LIMIT;
      expectResponsePerRequest.push({
        'records': recordsData.slice(start, end)
      });
    }

    const expectResponse = {
      'records': recordsData,
      'totalCount': recordsDataLength
    };

    const expectQuery1 = {
      app: body.app,
      query: `${body.query} limit ${GET_RECORDS_LIMIT} offset 0`,
      fields: body.fields,
      totalCount: body.totalCount
    };
    const expectQuery2 = {
      app: body.app,
      query: `${body.query} limit ${GET_RECORDS_LIMIT} offset ${GET_RECORDS_LIMIT}`,
      fields: body.fields,
      totalCount: body.totalCount
    };
    nock(URI)
      .get(RECORDS_ROUTE)
      .query(expectQuery1)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResponsePerRequest[0])
      .get(RECORDS_ROUTE)
      .query(expectQuery2)
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
        expect(err.message).toEqual('app is a required argument.');
      });
  });

  it('should be called successfully with no query and no totalCount', () => {
    const body = {
      app: 844,
      fields: ['recordID']
    };

    const recordsData = [];
    const recordsDataLength = 560;
    const expectResponsePerRequest = [];
    for (let index = 0; index < recordsDataLength; index++) {
      recordsData.push(
        {
          'recordID': {
            'type': 'RECORD_NUMBER',
            'value': index + 1
          }
        });
    }

    for (let index = 0; index < Math.ceil(recordsDataLength / GET_RECORDS_LIMIT); index++) {
      const start = index * GET_RECORDS_LIMIT;
      const end = recordsDataLength - start < GET_RECORDS_LIMIT ? recordsDataLength : start + GET_RECORDS_LIMIT;
      expectResponsePerRequest.push({
        'records': recordsData.slice(start, end)
      });
    }

    const expectResponse = {
      'records': recordsData,
      'totalCount': null
    };

    const expectQuery1 = {
      app: body.app,
      query: `limit ${GET_RECORDS_LIMIT} offset 0`,
      fields: body.fields,
    };
    const expectQuery2 = {
      app: body.app,
      query: `limit ${GET_RECORDS_LIMIT} offset ${GET_RECORDS_LIMIT}`,
      fields: body.fields,
    };
    nock(URI)
      .get(RECORDS_ROUTE)
      .query(expectQuery1)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResponsePerRequest[0])
      .get(RECORDS_ROUTE)
      .query(expectQuery2)
      .reply(200, expectResponsePerRequest[1]);
    return recordModule.getAllRecordsByQuery(body)
      .then(rsp => {
        expect(rsp).toHaveProperty('records');
        expect(rsp).toMatchObject(expectResponse);
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
    const recordsDataLength = 560;
    const expectResponsePerRequest = [];
    for (let index = 0; index < recordsDataLength; index++) {
      recordsData.push(
        {
          'recordID': {
            'type': 'RECORD_NUMBER',
            'value': index + 1
          },
          '$id': {
            type: '__ID__',
            value: index + 1
          }
        });
    }

    for (let index = 0; index < Math.ceil(recordsDataLength / GET_RECORDS_LIMIT); index++) {
      const start = index * GET_RECORDS_LIMIT;
      const end = recordsDataLength - start < GET_RECORDS_LIMIT ? recordsDataLength : start + GET_RECORDS_LIMIT;
      expectResponsePerRequest.push({
        'records': recordsData.slice(start, end)
      });
    }

    const expectResponse = {
      'records': recordsData,
      'totalCount': recordsDataLength
    };

    const expectQuery1 = {
      app: body.app,
      query: `$id > 0 and (${body.query}) order by $id asc limit ${GET_RECORDS_LIMIT}`,
      fields: ['recordID', '$id'],
      totalCount: body.totalCount,
    };
    const expectQuery2 = {
      app: body.app,
      query: `$id > ${GET_RECORDS_LIMIT} and (${body.query}) order by $id asc limit ${GET_RECORDS_LIMIT}`,
      fields: ['recordID', '$id'],
      totalCount: body.totalCount,
    };

    nock(URI)
      .get(RECORDS_ROUTE)
      .query(expectQuery1)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResponsePerRequest[0])
      .get(RECORDS_ROUTE)
      .query(expectQuery2)
      .reply(200, expectResponsePerRequest[1]);

    return recordModule.getAllRecordsByQuery(body)
      .then(rsp => {
        expect(rsp).toHaveProperty('records');
        expect(rsp).toMatchObject(expectResponse);
      });
  });

  it('should be called successfully with seek flag and no query', () => {
    const body = {
      app: 844,
      totalCount: true,
      fields: ['recordID'],
      seek: true
    };

    const recordsData = [];
    const recordsDataLength = 560;
    const expectResponsePerRequest = [];
    for (let index = 0; index < recordsDataLength; index++) {
      recordsData.push(
        {
          'recordID': {
            'type': 'RECORD_NUMBER',
            'value': index + 1
          },
          '$id': {
            type: '__ID__',
            value: index + 1
          }
        });
    }

    for (let index = 0; index < Math.ceil(recordsDataLength / GET_RECORDS_LIMIT); index++) {
      const start = index * GET_RECORDS_LIMIT;
      const end = recordsDataLength - start < GET_RECORDS_LIMIT ? recordsDataLength : start + GET_RECORDS_LIMIT;
      expectResponsePerRequest.push({
        'records': recordsData.slice(start, end)
      });
    }

    const expectResponse = {
      'records': recordsData,
      'totalCount': recordsDataLength
    };
    const expectQuery1 = {
      app: body.app,
      query: `$id > 0 order by $id asc limit ${GET_RECORDS_LIMIT}`,
      fields: ['recordID', '$id'],
      totalCount: body.totalCount,
    };
    const expectQuery2 = {
      app: body.app,
      query: `$id > ${GET_RECORDS_LIMIT} order by $id asc limit ${GET_RECORDS_LIMIT}`,
      fields: ['recordID', '$id'],
      totalCount: body.totalCount,
    };
    nock(URI)
      .get(RECORDS_ROUTE)
      .query(expectQuery1)
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResponsePerRequest[0])
      .get(RECORDS_ROUTE)
      .query(expectQuery2)
      .reply(200, expectResponsePerRequest[1]);

    return recordModule.getAllRecordsByQuery(body)
      .then(rsp => {
        expect(rsp).toHaveProperty('records');
        expect(rsp).toMatchObject(expectResponse);
      });
  });
});