/**
 * kintone api - nodejs client
 * test record cursor module
 */

const common = require('../../../utils/common');
const {RecordCursor, Connection, Auth, KintoneAPIException} = require('../../../../src/base/main');

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

describe('createCursor function', ()=>{
  describe('Successful case', () => {
    it('Record Cursor is created successfully', ()=>{
      const app = 1;
      const fields = [];
      const query = '';
      const size = 2;

      const rc = new RecordCursor(conn);
      return rc.createCursor({app, fields, query, size})
        .then((response)=>{
          expect(response).toHaveProperty('id');
          expect(response).toHaveProperty('totalCount');
          rc.deleteCursor(response.id);
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
        code: 'CB_VA01',
        message: 'Missing or invalid input.',
        errors: {
          app: {
            messages: ['must be greater than or equal to 1']
          }
        }
      };

      const rc = new RecordCursor(conn);
      return rc.createCursor({app, fields, query, size})
        .then((response)=>{
          rc.deleteCursor(response.id);
          expect(1).toEqual(0);
        })
        .catch((err)=>{
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(INVALID_INPUT_RETURN);
        });
    });
  });
});