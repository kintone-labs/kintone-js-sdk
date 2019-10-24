import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {USERNAME, PASSWORD, DOMAIN} from './common';
import RecordModel from '../../../../src/base/model/record/RecordModels';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

describe('Check Record.createRecordStatusItem', () => {
  it('should be called successfully', () => {
    const result = recordModule.createRecordStatusItem(1, 'MY_ACTION', 1, 1);
    expect(result).toBeInstanceOf(RecordModel.RecordsUpdateStatusItem);
  });
});