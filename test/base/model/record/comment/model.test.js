import AddCommentRequest from '../../../../../src/base/model/record/comment/AddCommentRequest';
import DeleteCommentRequest from '../../../../../src/base/model/record/comment/DeleteCommentRequest';
import GetCommentRequest from '../../../../../src/base/model/record/comments/GetCommentRequest';

describe('Checking AddCommentRequest model', () => {
  it('verify AddCommentRequest.toJSONString() function', () => {
    const data = {
      app: 1,
      record: 1,
      comment: 'my comment'
    };

    const model = new AddCommentRequest(data.app, data.record, data.comment);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify DeleteCommentRequest.toJSONString() function', () => {
    const data = {
      app: 1,
      record: 1,
      comment: 'my comment'
    };

    const model = new DeleteCommentRequest(data.app, data.record, data.comment);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify GetCommentRequest.toJSONString() function', () => {
    const data = {
      app: 1,
      record: 1,
      order: 'desc',
      offset: 10,
      limit: 10
    };

    const model = new GetCommentRequest(data.app, data.record, data.order, data.offset, data.limit);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });
});