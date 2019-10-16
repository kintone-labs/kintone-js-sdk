import {KintoneAPIException, Auth, Connection, Record, BulkRequest, RecordCursor, File, App} from '../../src/base/main';

import BaseException from '../../src/base/exception/KintoneAPIException';
import BaseAuth from '../../src/base/authentication/Auth';
import BaseConnection from '../../src/base/connection/Connection';
import BaseRecord from '../../src/base/module/record/Record';
import BaseBulkRequest from '../../src/base/module/bulkRequest/BulkRequest';
import BaseRecordCursor from '../../src/base/module/cursor/RecordCursor';
import BaseFile from '../../src/base/module/file/File';
import BaseApp from '../../src/base/module/app/App';

describe('Checking base main', () => {
  it('should be instance of KintoneAPIException', () => {
    expect(KintoneAPIException).toEqual(BaseException);
  });

  it('should be instance of Auth', () => {
    expect(Auth).toEqual(BaseAuth);
  });

  it('should be instance of Connection', () => {
    expect(Connection).toEqual(BaseConnection);
  });

  it('should be instance of Record', () => {
    expect(Record).toEqual(BaseRecord);
  });

  it('should be instance of BulkRequest', () => {
    expect(BulkRequest).toEqual(BaseBulkRequest);
  });

  it('should be instance of RecordCursor', () => {
    expect(RecordCursor).toEqual(BaseRecordCursor);
  });

  it('should be instance of File', () => {
    expect(File).toEqual(BaseFile);
  });

  it('should be instance of App', () => {
    expect(App).toEqual(BaseApp);
  });
});
