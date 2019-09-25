import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {USERNAME, PASSWORD, DOMAIN} from './common';
import RecordsUpdateItem from '../../../../src/base/model/record/record/RecordUpdateItem';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

describe('Checking Record.createRecordItemWithUpdateKey', () => {
  it('should be called successfully', () => {
    const recordData = {
      name: {
        value: 'Name Value'
      }
    };

    const updateKey = {
      field: 'key',
      value: '123'
    };
    const rsp = recordModule.createRecordItemWithUpdateKey(updateKey, recordData, 2);
    expect(rsp).toBeInstanceOf(RecordsUpdateItem);
    expect(rsp).toHaveProperty('updateKey', updateKey);
    expect(rsp).toHaveProperty('revision', 2);
    expect(rsp).toHaveProperty('record', recordData);
  });

  it('should be called successfully without revision', () => {
    const recordData = {
      name: {
        value: 'Name Value'
      }
    };

    const updateKey = {
      field: 'key',
      value: '123'
    };
    const rsp = recordModule.createRecordItemWithUpdateKey(updateKey, recordData);
    expect(rsp).toBeInstanceOf(RecordsUpdateItem);
    expect(rsp).toHaveProperty('updateKey', updateKey);
    expect(rsp).toHaveProperty('revision', 0);
    expect(rsp).toHaveProperty('record', recordData);
  });
});