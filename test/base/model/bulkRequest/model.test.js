import BulkRequest from '../../../../src/base/model/bulkRequest/BulkRequest';

describe('Check BulkRequest model', () => {
  it('addRequest should be called with param of any type', () => {
    const model = new BulkRequest();
    const result = model.addRequest(123);
    expect(result).toBeInstanceOf(BulkRequest);
  });
});