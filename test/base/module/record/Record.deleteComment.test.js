import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, USERNAME, PASSWORD, DOMAIN} from './common';
import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

const ROUTE = '/k/v1/record/comment.json';

describe('Check Record.deleteComment', () => {
  it('should be called successfully', () => {
    const data = {
      app: 1,
      record: 1,
      comment: 1
    };

    nock(URI)
      .delete(ROUTE, reqBody => {
        expect(reqBody).toHaveProperty('app');
        return true;
      })
      .reply(200, {});

    const actualResult = recordModule.deleteComment(data);
    return actualResult.then(response => {
      expect(response).toMatchObject({});
    });
  });

  it('should throw error when called with empty param', ()=>{
    const expectedError = {
      'code': 'CB_IL02',
      'id': 'dW6xRq9xjBnvBg99uLAK',
      'message': 'Illegal request.'
    };

    nock(URI)
      .delete(ROUTE)
      .reply(400, expectedError);

    return recordModule.deleteComment().catch((err)=>{
      expect(err).toBeInstanceOf(KintoneAPIException);
      expect(err.errorResponse).toMatchObject(expectedError);
    });
  });
});