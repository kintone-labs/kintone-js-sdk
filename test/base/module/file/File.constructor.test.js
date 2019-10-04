import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import File from '../../../../src/base/module/file/File';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';
import {DOMAIN} from './common';

describe('Check File.constructor', () => {
  it('can creating File module', () => {
    const auth = new Auth();
    const connection = new Connection({auth, domain: DOMAIN});
    const file = new File({connection});
    expect(file).toBeInstanceOf(File);
  });

  it('should throw error when created with no param', () => {
    try {
      const file = new File();
      expect(file).toBeInstanceOf(File);
    } catch (error) {
      expect(error).toBeInstanceOf(KintoneAPIException);
    }
  });
});