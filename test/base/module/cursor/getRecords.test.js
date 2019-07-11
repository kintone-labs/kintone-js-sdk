/**
 * kintone api - nodejs client
 * test record cursor module
 */

const common = require('../../../utils/common');
const {RecordCursor, Connection, Auth, KintoneAPIException} = require('../../../../src/base/main');

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

describe('getRecords function', ()=>{
  describe('Successful case', () => {
    it('1 record block is get successfully', ()=>{
      const app = 1;
      const fields = [];
      const query = '';
      const size = 2;

      let cursorID;

      const rc = new RecordCursor(conn);
      return rc.createCursor({app, fields, query, size})
        .then((response)=>{
          expect(response).toHaveProperty('id');
          expect(response).toHaveProperty('totalCount');
          cursorID = response.id;
          return rc.getRecords(response.id);
        })
        .then((recordsResponse)=>{
          expect(recordsResponse).toHaveProperty('records');
          expect(Array.isArray(recordsResponse.records)).toBe(true);
          expect(recordsResponse.records.length).toEqual(size);
          expect(recordsResponse).toHaveProperty('next');
          return rc.deleteCursor(cursorID);
        })
        .catch((err)=>{
          expect(false);
        });
    });
  });

  describe('Error case', () => {
    it('Get records of invalid app ID', ()=>{
      const app = -1;

      const ILLEGAL_REQUEST = {
        code: 'CB_IL02',
        message: 'Illegal request.',
        errors: {}
      };

      const rc = new RecordCursor(conn);
      return rc.getAllRecords(app)
        .catch((err)=>{
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(ILLEGAL_REQUEST);
        });
    });
  });
});