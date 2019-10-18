import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';
import {DOMAIN} from './common';

describe('Checking Record.constructor', () => {
  it('can creating Record module', () => {
    const auth = new Auth();
    const connection = new Connection({auth, domain: DOMAIN});
    const record = new Record({connection});
    expect(record).toBeInstanceOf(Record);
  });

  it('should throw error if there is no params', () => {
    try {
      new Record();
    } catch (error) {
      expect(error).toBeInstanceOf(KintoneAPIException);
    }
  });
});