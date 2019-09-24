import CreateRecordCursorRequest from '../../../../../src/base/model/cursor/recordCursor/CreateRecordCursorRequest';
import GetRecordCursorRequest from '../../../../../src/base/model/cursor/recordCursor/GetRecordCursorRequest';
import DeleteCursorRequest from '../../../../../src/base/model/cursor/recordCursor/DeleteCursorRequest';

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

  it('verify GetRecordCursorRequest.cursorID is undefined', () => {
    const model = new GetRecordCursorRequest();
    expect(model.toJSON()).toEqual({});
  });

  it('verify DeleteCursorRequest.toJSONString() function', () => {
    const data = {
      id: 'CURSOR-ID'
    };

    const model = new DeleteCursorRequest(data.id);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });
});