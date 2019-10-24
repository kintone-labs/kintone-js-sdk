import AddRecordRequest from '../../../../../src/base/model/record/record/AddRecordRequest';
import GetRecordRequest from '../../../../../src/base/model/record/record/GetRecordRequest';
import RecordUpdateKey from '../../../../../src/base/model/record/record/RecordUpdateKey';
import RecordUpdateItem from '../../../../../src/base/model/record/record/RecordUpdateItem';
import UpdateRecordAssigneesRequest from '../../../../../src/base/model/record/record/UpdateRecordAssigneesRequest';
import UpdateRecordRequest from '../../../../../src/base/model/record/record/UpdateRecordRequest';
import UpdateRecordStatusItem from '../../../../../src/base/model/record/record/UpdateRecordStatusItem';
import UpdateRecordStatusRequest from '../../../../../src/base/model/record/record/UpdateRecordStatusRequest';

describe('Check Record model', () => {
  it('verify AddRecordRequest.toJSONString() function', () => {
    const data = {
      record: {
        field1: {
          value: 123
        }
      },
      app: '1'
    };

    const model = new AddRecordRequest(data.app, data.record);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify RecordUpdateKey.toJSONString() function', () => {
    const data = {
      field: 'MY_FIELD',
      value: 123
    };

    const model = new RecordUpdateKey(data.field, data.value);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify UpdateRecordAssigneesRequest.toJSONString() function', () => {
    const data = {
      app: '1',
      id: '1',
      assignees: ['ASSIGNEES'],
      revision: '1'
    };

    const model = new UpdateRecordAssigneesRequest(data.app, data.id, data.assignees, data.revision);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify GetRecordRequest.toJSONString() function', () => {
    const data = {
      app: '1',
      id: '1'
    };

    const model = new GetRecordRequest(data.app, data.id);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify RecordUpdateItem.toJSONString() function', () => {
    const data = {
      revision: '1',
      record: {
        field1: {
          value: 123
        }
      },
      id: 1
    };

    const model = new RecordUpdateItem();
    model.setID(data.id);
    model.setRecord(data.record);
    model.setRevision(data.revision);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify UpdateRecordRequest.toJSONString() function', () => {
    const data = {
      revision: '1',
      record: {
        field1: {
          value: 123
        }
      },
      id: 1,
      app: '1'
    };

    const model = new UpdateRecordRequest(data.app);
    model.setID(data.id);
    model.setRecord(data.record);
    model.setRevision(data.revision);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify UpdateRecordStatusItem.toJSONString() function', () => {
    const data = {
      id: 1,
      action: 'MY_ACTION',
      assignee: 'ASSIGNEE',
      revision: 1
    };

    const model = new UpdateRecordStatusItem(data.id, data.action, data.assignee, data.revision);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify UpdateRecordStatusRequest.toJSONString() function', () => {
    const data = {
      id: 1,
      action: 'MY_ACTION',
      assignee: 'ASSIGNEE',
      revision: 1,
      app: 1
    };

    const model = new UpdateRecordStatusRequest(data.app, data.id, data.action, data.assignee, data.revision);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });
});