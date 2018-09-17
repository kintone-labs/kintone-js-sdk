/**
 * kintone api - nodejs client
 * kintone-nodeks-SDK
 */

import {Connection} from './module/connection/Connection';
import {File} from './module/file/File';
import {Auth, App, Record, BulkRequest, KintoneAPIException} from 'kintone-basejs-sdk';

window.kintoneJSSDK = {
  Auth,
  Connection,
  App,
  Record,
  BulkRequest,
  File,
  KintoneAPIException,
};
