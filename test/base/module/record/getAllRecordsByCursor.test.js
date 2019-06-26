/**
 * kintone api - nodejs client
 * test record cursor module
 */

const common = require('../../../utils/common');
const {Record, Connection, Auth} = require('../../../../src/base/main');

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

describe('getAllRecords function', ()=>{
  describe('Successful case', () => {
    it('All records are get successfully', ()=>{
      const app = 1;
      const fields = [];
      const query = '';

      const record = new Record(conn);
      return record.getAllRecordsByCursor({app, query, fields})
        .then((recordsResponse)=>{
          expect(recordsResponse).toHaveProperty('records');
          expect(Array.isArray(recordsResponse.records)).toBe(true);
          expect(recordsResponse).toHaveProperty('totalCount');
          expect(recordsResponse.records.length).toEqual(recordsResponse.totalCount);
        });
    });
  });
});