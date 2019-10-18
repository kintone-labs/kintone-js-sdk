import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import RecordCursor from '../../../../src/base/module/cursor/RecordCursor';
import { USERNAME, PASSWORD, DOMAIN, PASSWORD_AUTH_HEADER, getPasswordAuth, URI } from './common'

import nock from 'nock';
import {KintoneAPIException} from '../../../../src/base/main';

const auth = new Auth();
auth.setPasswordAuth({ username: USERNAME, password: PASSWORD });

const conn = new Connection({ domain: DOMAIN, auth: auth });

const CURSOR_ROUTE = '/k/v1/records/cursor.json';

describe('Checking RecordCursor deleteCursor function', () => {
  it('deleteCursor is called successfully', ()=>{

    const cursorID = 'CURSOR-ID';

    nock(URI)
      .delete(CURSOR_ROUTE, (rqBody) => {
        expect(rqBody.id).toEqual(cursorID);
        return true;
      })
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, {});

    const rc = new RecordCursor({connection: conn});
    return rc.deleteCursor({id: cursorID})
      .then((rsp)=>{
        expect(rsp).toEqual({});
      })
      .catch((err)=>{
        expect(false);
      });
  });

  it('should throw error when called with no param', () => {
    const rc = new RecordCursor({ connection: conn });
    const expectedResult = {
      'code': 'CB_VA01',
      'id': 'D5uBnhJtiXkvWYGXAKwg',
      'message': 'Missing or invalid input.',
      'errors': {
        'id': {
          'messages': ['Required field.']
        }
      }
    };

    nock(URI)
      .delete(CURSOR_ROUTE, (rqBody) => {
        expect(rqBody).toEqual({});
        return true;
      })
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(400, expectedResult);

    return rc.deleteCursor()
      .catch((err) => {
        // (Resolved)
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.errorResponse).toMatchObject(expectedResult);
      });
  });
});