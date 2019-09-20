/**
 * kintone api - nodejs client
 * test record cursor module
 */
const nock = require('nock');
const common = require('../../../utils/common');
const {URI} = require('../../../utils/constant');
const {RecordCursor, Connection, Auth, KintoneAPIException} = require('../../../../cjs/base/main');

const auth = new Auth();
auth.setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});

const conn = new Connection({domain: common.DOMAIN, auth: auth});

const CURSOR_ROUTE = '/k/v1/records/cursor.json';

describe('getRecords function', ()=>{
  describe('Successful case', () => {
    it('1 record block is get successfully', ()=>{
      const cursorID = 'CURSOR-ID';

      const EXPECTED_RESPONSE = {
        records: [
          {
            'Record_number': {
              'type': 'RECORD_NUMBER',
              'value': '1'
            }
          }
        ],
        next: true
      };

      nock(URI)
        .get(`${CURSOR_ROUTE}?id=${cursorID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, EXPECTED_RESPONSE);

      const rc = new RecordCursor({connection: conn});
      return rc.getRecords({id: cursorID})
        .then((recordsResponse)=>{
          expect(recordsResponse).toHaveProperty('records');
          expect(Array.isArray(recordsResponse.records)).toBe(true);
          expect(recordsResponse).toHaveProperty('next');
          expect(recordsResponse.next).toEqual(true);
        });
    });
  });

  describe('Error case', () => {
    it('Get records of invalid cursor ID', ()=>{
      const wrongID = 'INVALID-ID';

      const ILLEGAL_REQUEST = {
        id: 'RWt7OV6Pa40r1E3a2hgb',
        code: 'CB_IL02',
        message: 'Illegal request.',
        errors: {}
      };

      nock(URI)
        .get(`${CURSOR_ROUTE}?id=${wrongID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(404, ILLEGAL_REQUEST);

      const rc = new RecordCursor({connection: conn});
      return rc.getRecords({id: wrongID})
        .catch((err)=>{
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(ILLEGAL_REQUEST);
        });
    });
  });
});