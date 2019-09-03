/**
 * kintone api - nodejs client
 * test record cursor module
 */
const nock = require('nock');
const {URI} = require('../../../utils/constant');
const common = require('../../../utils/common');
const {RecordCursor, Connection, Auth, KintoneAPIException} = require('../../../../cjs/base/main');

const auth = new Auth();
auth.setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});

const conn = new Connection({domain: common.DOMAIN, auth: auth});

const CURSOR_ROUTE = '/k/v1/records/cursor.json';

describe('deleteCursor function', ()=>{
  describe('Successful case', () => {
    it('Cursor is deleted successfully', ()=>{

      const cursorID = 'CURSOR-ID';

      nock(URI)
        .delete(CURSOR_ROUTE, (rqBody) => {
          expect(rqBody.id).toEqual(cursorID);
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
        .reply(200, {});

      const rc = new RecordCursor({connection: conn});
      return rc.deleteCursor({id: cursorID})
        .then((rsp)=>{
          expect(rsp).toEqual({});
        })
        .catch((err)=>{
          expect(false);
        });
    });
  });

  describe('Error case', () => {
    it('Cursor is deleted fail with wrong cursor ID', ()=>{
      const wrongID = '123';

      const ILLEGAL_REQUEST = {
        code: 'CB_IL02',
        id: 'RWt7OV6Pa40r1E3a2hgb',
        message: 'Illegal request.',
        errors: {}
      };

      nock(URI)
        .delete(CURSOR_ROUTE, (rqBody) => {
          expect(rqBody.id).toEqual(wrongID);
          return true;
        })
        .reply(400, ILLEGAL_REQUEST);

      const rc = new RecordCursor({connection: conn});
      return rc.deleteCursor({id: wrongID})
        .catch((err)=>{
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(ILLEGAL_REQUEST);
        });
    });
  });
});