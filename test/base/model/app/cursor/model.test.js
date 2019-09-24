import CreateRecordCursorRequest from '../../../../../src/base/model/cursor/recordCursor/CreateRecordCursorRequest';
import GetRecordCursorRequest from '../../../../../src/base/model/cursor/recordCursor/GetRecordCursorRequest';

describe('Checking RecordCursor model', () => {
  it('verify CreateRecordCursorRequest.toJSONString() function', () => {
    const data = {
      app: 1,
      fields: [],
      query: '',
      size: 2
    };

    const model = new CreateRecordCursorRequest(data);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify GetRecordCursorRequest.toJSONString() function', () => {

    const data = {
      id: 'CURSOR-ID'
    };

    const model = new GetRecordCursorRequest(data.id);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });
});