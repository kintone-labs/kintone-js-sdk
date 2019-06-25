/**
 * kintone api - nodejs client
 * test record cursor module
 */

const common = require('../../../utils/common');
const {RecordCursor, Connection, Auth} = require('../../../../src/base/main');

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

describe('deleteCursor function', ()=>{
  describe('Successful case', () => {
    it('Cursor is deleted successfully', ()=>{
      const appID = 1;
      const fields = [];
      const query = '';
      const size = 2;

      const rc = new RecordCursor(conn);
      return rc.createCursor(appID, fields, query, size)
        .then((response)=>{
          expect(response).toHaveProperty('id');
          expect(response).toHaveProperty('totalCount');
          return rc.deleteCursor(response.id);
        })
        .then(()=>{
          expect(true);
        });
    });
  });
});