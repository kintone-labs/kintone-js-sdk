import AddRecordsRequest from '../../../../../src/base/model/record/records/AddRecordsRequest';
import DeleteRecordsRequest from '../../../../../src/base/model/record/records/DeleteRecordsRequest';
import GetRecordsRequest from '../../../../../src/base/model/record/records/GetRecordsRequest';
import UpdateRecordsRequest from '../../../../../src/base/model/record/records/UpdateRecordsRequest';

describe('Check Records model', () => {
  describe('Check AddRecordsRequest model', () => {
    it('getAppID should return correct value', () => {
      const appID = 1;
      const model = new AddRecordsRequest(appID);
      expect(model.getAppID()).toEqual(appID);
    });

    it('addRecord should be called successfully', () => {
      const appID = 1;
      const model = new AddRecordsRequest(appID);

      const record = {
        field: {
          value: 'MY_VALUE'
        }
      };
      const result = model.addRecord(record);
      expect(result).toBeInstanceOf(AddRecordsRequest);
    });

    it('toJSONString should be called successfully', () => {
      const data = {
        records: [],
        app: 1
      };
      const model = new AddRecordsRequest(data.app);
      expect(model.toJSONString()).toEqual(JSON.stringify(data));
    });
  });

  describe('Check DeleteRecordsRequest model', () => {
    it('toJSONString should be called successfully', () => {
      const data = {
        app: 1,
        ids: [1]
      };
      const model = new DeleteRecordsRequest(data.app);

      model.setIDs(data.ids);
      expect(model.toJSONString()).toEqual(JSON.stringify(data));
    });
  });

  describe('Check GetRecordsRequest model', () => {
    it('toJSONString should be called successfully', () => {
      const data = {
        app: 1,
        query: 'my query',
        fields: ['field'],
        totalCount: true
      };
      const model = new GetRecordsRequest(data.app, data.query, data.fields, data.totalCount);

      expect(model.toJSONString()).toEqual(JSON.stringify(data));
    });
  });

  describe('Check UpdateRecordsRequest model', () => {
    it('toJSONString should be called successfully', () => {
      const data = {
        records: ['recordItem'],
        app: 1
      };
      const model = new UpdateRecordsRequest(data.app, data.records);

      expect(model.toJSONString()).toEqual(JSON.stringify(data));
    });
  });
});