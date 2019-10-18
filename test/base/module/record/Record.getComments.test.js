import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, USERNAME, PASSWORD, DOMAIN, getPasswordAuth} from './common';
import nock from 'nock';

const RECORD_COMMENT_ROUTE = '/k/v1/record/comments.json';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

describe('Checking Record.getComments', () => {
  it('should return correctly the comments of record once valid data, app + record only', () => {
    const data = {
      app: 1,
      record: 2
    };
    const expectResponse = {
      'comments': [{
        'id': '1',
        'text': 'user13 Global Sales APAC Taskforce \nHere is today\'s report.',
        'createdAt': '2019-10-18T03:18:29Z',
        'creator': {
          'code': 'user14',
          'name': 'user14'
        },
        'mentions': []
      }],
      'older': false,
      'newer': false
    };
    nock(URI)
      .get(RECORD_COMMENT_ROUTE)
      .query(data)
      .matchHeader('X-Cybozu-Authorization', authHeader => {
        expect(authHeader).toBe(getPasswordAuth(USERNAME, PASSWORD));
        return true;
      })
      .reply(200, expectResponse);
    const actualResult = recordModule.getComments(data);
    return actualResult.then(response => {
      expect(response).toHaveProperty('comments');
      expect(Array.isArray(response.comments)).toBe(true);
      expect(response).toMatchObject(expectResponse);
    });
  });
});
