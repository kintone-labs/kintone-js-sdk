/**
 * kintone api - nodejs client
 * test record cursor module
 */

const common = require('../../../utils/common');
const {RecordCursor, Connection, Auth, KintoneAPIException} = require('../../../../src/base/main');

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

describe('deleteCursor function', ()=>{
  describe('Successful case', () => {
    it('Cursor is deleted successfully', ()=>{
      const app = 1;
      const fields = [];
      const query = '';
      const size = 2;

      const rc = new RecordCursor(conn);
      return rc.createCursor({app, fields, query, size})
        .then((response)=>{
          expect(response).toHaveProperty('id');
          expect(response).toHaveProperty('totalCount');
          return rc.deleteCursor(response.id);
        })
        .then(()=>{
          expect(true);
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
        message: 'Illegal request.',
        errors: {}
      };

      const rc = new RecordCursor(conn);
      return rc.deleteCursor(wrongID)
        .catch((err)=>{
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(ILLEGAL_REQUEST);
        });
    });
  });
});