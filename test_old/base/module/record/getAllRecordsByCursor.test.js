/**
 * kintone api - nodejs client
 * test record cursor module
 */
const nock = require('nock');
const common = require('../../../utils/common');
const {URI} = require('../../../utils/constant');
const {Record, Connection, Auth} = require('../../../../cjs/base/main');

const auth = new Auth();
auth.setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});

const conn = new Connection({domain: common.DOMAIN, auth: auth});

const CURSOR_ROUTE = '/k/v1/records/cursor.json';

describe('getAllRecords function', ()=>{
  describe('Successful case', () => {
    it('All records are get successfully', ()=>{
      const app = 1;
      const fields = [];
      const query = '';

      const EXPECTED_GET_RECORDS_RESPONSE = {
        records: [
          {
            'Record_number': {
              'type': 'RECORD_NUMBER',
              'value': '1'
            }
          }
        ],
        next: false
      };

      const EXPECTED_CREATE_CURSOR_RESPONSE = {
        id: '123',
        totalCount: 1
      };

      nock(URI)
        .post(CURSOR_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(app);
          expect(rqBody.fields).toEqual(fields);
          expect(rqBody.query).toEqual(query);
          return true;
        })
        .reply(200, EXPECTED_CREATE_CURSOR_RESPONSE)
        .get(`${CURSOR_ROUTE}?id=${EXPECTED_CREATE_CURSOR_RESPONSE.id}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, EXPECTED_GET_RECORDS_RESPONSE);

      const record = new Record({connection: conn});
      return record.getAllRecordsByCursor({app, query, fields})
        .then((recordsResponse)=>{
          expect(recordsResponse).toHaveProperty('records');
          expect(Array.isArray(recordsResponse.records)).toBe(true);
          expect(recordsResponse).toHaveProperty('totalCount');
          expect(recordsResponse.records.length).toEqual(recordsResponse.totalCount);
        })
        .catch((err)=>{
          expect(false).toEqual(true);
        });
    });
  });
});