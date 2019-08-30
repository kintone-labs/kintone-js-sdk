import _DeleteRecordCursorRequest from "./recordCursor/DeleteCursorRequest";
import _GetRecordCursorRequest from "./recordCursor/GetRecordCursorRequest";
import _CreateRecordCursorRequest from "./recordCursor/CreateRecordCursorRequest";
/**
 * kintone api - nodejs client
 * Cursor models
 */

const CreateRecordCursorRequest = _CreateRecordCursorRequest;
const GetRecordCursorRequest = _GetRecordCursorRequest;
;
const DeleteRecordCursorRequest = _DeleteRecordCursorRequest;
export default {
  // TODO: Write unit test
  CreateRecordCursorRequest,
  GetRecordCursorRequest,
  DeleteRecordCursorRequest
};