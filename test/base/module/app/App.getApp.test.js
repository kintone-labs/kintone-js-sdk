import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_API_ROUTE = '/k/v1/app.json';

describe('Checking App.getApp', () => {
  it('Can get successfully the app infomation by getApp function', () => {
    const appID = 1;
    const expectResult = {
      'appId': '1',
      'code': '',
      'name': 'ToDo App',
      'description': 'This is a great app!',
      'spaceId': '2',
      'threadId': '3',
      'createdAt': '2015-03-06T02:24:03.000Z',
      'creator': {
        'code': 'user1',
        'name': 'User1'
      },
      'modifiedAt': '2015-03-06T03:06:57.000Z',
      'modifier': {
        'code': 'login-name',
        'name': 'Display Name'
      }
    };
    nock(URI)
      .get(APP_API_ROUTE)
      .query({id: appID})
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const getAppResult = appModule.getApp({id: appID});
    return getAppResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_VA01',
      'id': 'i6A0C71CEthGwQrYoYwT',
      'message': 'Missing or invalid input.',
      'errors': {
        'id': {
          'messages': ['Required field.']
        }
      }
    };
    nock(URI)
      .get(APP_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual('');
        return true;
      })
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(400, expectResult);
    return appModule.getApp()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });
});