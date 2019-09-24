import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import RecordCursor from '../../../../src/base/module/cursor/RecordCursor';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

describe('Checking RecordCursor', () => {
  it('Can create new instance of RecordCursor', () => {
    const auth = new Auth();
    const connection = new Connection({auth});
    const recordCursor = new RecordCursor({connection});
    expect(recordCursor).toBeInstanceOf(RecordCursor);
  });

  it('should throw error if there is no params', () => {
    try {
      const recordCursor = new RecordCursor();
      expect(recordCursor).toBeInstanceOf(RecordCursor);
    } catch (error) {
      expect(error).toBeInstanceOf(KintoneAPIException);
    }
  });
});