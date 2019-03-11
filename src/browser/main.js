import {Connection} from './module/connection/Connection';
import {File} from './module/file/File';
import {Auth, App, Record, BulkRequest, KintoneAPIException} from '../base/main';

window.kintoneJSSDK = {
  Auth,
  Connection,
  App,
  Record,
  BulkRequest,
  File,
  KintoneAPIException,
};

export {Auth};
export {Connection};
export {App};
export {Record};
export {BulkRequest};
export {File};
export {KintoneAPIException};
