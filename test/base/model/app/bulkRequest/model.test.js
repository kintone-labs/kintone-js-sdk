import BulkRequest from '../../../../../src/base/model/bulkRequest/BulkRequest';
import BulkRequestItem from '../../../../../src/base/model/bulkRequest/BulkRequestItem';

describe('Checking BulkRequest model', () => {
  it('verify BulkRequest.toJSONString() function', () => {

    const model = new BulkRequest();
    expect(model.toJSONString()).toEqual(JSON.stringify({
      requests: []
    }));

    // TODO
    // function addRequest of BulkRequest model require param of type BulkRequestItem --> validate param
  });

  it('verify BulkRequestItem.toJSONString() function', () => {

    const data = {
      method: 'MY_METHOD',
      api: 'MY_API',
      payload: 'MY_PAYLOAD',
    };

    const model = new BulkRequestItem(data.method, data.api, data.payload);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });
});