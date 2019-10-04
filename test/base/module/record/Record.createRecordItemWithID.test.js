import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {USERNAME, PASSWORD, DOMAIN} from './common';
import RecordsUpdateItem from '../../../../src/base/model/record/record/RecordUpdateItem';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

describe('Checking Record.createRecordItemWithID', () => {
  it('should be called successfully', () => {
    const recordData = {
      name: {
        value: 'Name Value'
      }
    };
    const rsp = recordModule.createRecordItemWithID(1, recordData, 2);
    expect(rsp).toBeInstanceOf(RecordsUpdateItem);
    expect(rsp).toHaveProperty('id', 1);
    expect(rsp).toHaveProperty('revision', 2);
    expect(rsp).toHaveProperty('record', recordData);
  });

  it('should be called successfully without revision', () => {
    const recordData = {
      name: {
        value: 'Name Value'
      }
    };
    const rsp = recordModule.createRecordItemWithID(1, recordData);
    expect(rsp).toBeInstanceOf(RecordsUpdateItem);
    expect(rsp).toHaveProperty('id', 1);
    expect(rsp).toHaveProperty('revision', 0);
    expect(rsp).toHaveProperty('record', recordData);
  });
});