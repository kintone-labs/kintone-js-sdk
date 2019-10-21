import GetFileRequest from '../../../../src/base/model/file/GetFileRequest';

describe('Checking RecordCursor model', () => {
  it('verify CreateRecordCursorRequest.toJSONString() function', () => {
    const data = {
      fileKey: 'MY_FILE_KEY'
    };

    const model = new GetFileRequest(data.fileKey);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });
});