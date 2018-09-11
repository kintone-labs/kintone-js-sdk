/**
 * kintone api - nodejs client
 * kintone-nodeks-SDK
 */

import {Connection} from './module/connection/Connection';
import {Auth, App, Record, BulkRequest, KintoneException} from 'kintone-basejs-sdk';

window.kintoneJSSDK = {
  Auth,
  Connection,
  App,
  Record,
  BulkRequest,
  KintoneException,
};
