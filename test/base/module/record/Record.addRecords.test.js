import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, API_ROUTE, USERNAME, PASSWORD, DOMAIN} from './common';
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
      records: [{Text_0: {value: 1}}, {Text_0: {value: 2}}]
    };

    nock(URI)
      .post(API_ROUTE.RECORDS, (rqBody) => {
        expect(rqBody.record).toEqual(body.record);
        return rqBody.app === body.app;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, {
        'ids': ['1', '2'],
        'revisions': ['1', '1']
      });
    const addRecordsResult = recordModule.addRecords(body);
    return addRecordsResult.then((rsp) => {
      expect(rsp).toHaveProperty('ids');
      expect(rsp.revisions).toEqual(expect.arrayContaining(['1', '1']));
    });
  });
  it('should throw error when fail when missing required field', () => {

    const expectedError = {
      'code': 'CB_IL02',
      'id': 'LWcihB44Xa21wdYFV7aj',
      'message': 'Illegal request.'
    };

    nock(URI)
      .post(API_ROUTE.RECORDS, (rqBody) => {
        expect(rqBody).toEqual({});
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(400, expectedError);
    const addRecordsResult = recordModule.addRecords();
    return addRecordsResult.catch((err) => {
      expect(err).toBeInstanceOf(KintoneAPIException);
      expect(err.httpErrorCode).toEqual(400);
      expect(err.errorResponse).toMatchObject(expectedError);
    });
  });
});