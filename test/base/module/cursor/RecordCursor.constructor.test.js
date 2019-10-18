import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import RecordCursor from '../../../../src/base/module/cursor/RecordCursor';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';
import {DOMAIN} from './common';

describe('Checking RecordCursor', () => {
  it('Can create new instance of RecordCursor', () => {
    const auth = new Auth();
    const connection = new Connection({auth, domain: DOMAIN});
    const recordCursor = new RecordCursor({connection});
    expect(recordCursor).toBeInstanceOf(RecordCursor);
  });

  it('should throw error if there is no params', () => {
    try {
      new RecordCursor();
    } catch (error) {
      expect(error).toBeInstanceOf(KintoneAPIException);
    }
  });
});