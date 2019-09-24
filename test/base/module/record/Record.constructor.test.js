import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

describe('Checking Record.constructor', () => {
  it('can creating Record module', () => {
    const auth = new Auth();
    const connection = new Connection({auth});
    const record = new Record({connection});
    expect(record).toBeInstanceOf(Record);
  });

  it('should throw error if there is no params', () => {
    try {
      const record = new Record();
      expect(record).toBeInstanceOf(Record);
    } catch (error) {
      expect(error).toBeInstanceOf(KintoneAPIException);
    }
  });
});