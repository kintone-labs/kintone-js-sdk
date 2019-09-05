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

describe('createCursor function', ()=>{
  describe('Successful case', () => {
    it('Record Cursor is created successfully', ()=>{
      const app = 1;
      const fields = [];
      const query = '';
      const size = 2;

      const EXPECTED_RESPONSE = {
        id: '9a9716fe-1394-4677-a1c7-2199a5d28215',
        totalCount: 123456
      };

      nock(URI)
        .post(CURSOR_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(app);
          expect(rqBody.fields).toEqual(fields);
          expect(rqBody.query).toEqual(query);
          expect(rqBody.size).toEqual(size);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, EXPECTED_RESPONSE);

      const rc = new RecordCursor({connection: conn});
      return rc.createCursor({app, fields, query, size})
        .then((response)=>{
          expect(response).toHaveProperty('id');
          expect(response).toHaveProperty('totalCount');
          expect(response.id).toEqual(EXPECTED_RESPONSE.id);
          expect(response.totalCount).toEqual(EXPECTED_RESPONSE.totalCount);
        });
    });
  });

  describe('Error case', () => {
    it('Record Cursor create fail', () => {
      const app = -1;
      const fields = [];
      const query = '';
      const size = 2;

      const INVALID_INPUT_RETURN = {
        id: 'RWt7OV6Pa40r1E3a2hgb',
        code: 'CB_VA01',
        message: 'Missing or invalid input.',
        errors: {
          app: {
            messages: ['must be greater than or equal to 1']
          }
        }
      };

      nock(URI)
        .post(CURSOR_ROUTE)
        .reply(400, INVALID_INPUT_RETURN);

      const rc = new RecordCursor({connection: conn});
      return rc.createCursor({app, fields, query, size})
        .catch((err)=>{
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(INVALID_INPUT_RETURN);
        });
    });
  });
});