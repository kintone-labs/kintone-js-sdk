import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_PREVIEW_API_ROUTE = '/k/v1/preview/app.json';

describe('Checking App.addPreviewApp', () => {
  it('should add successfully a new app', () => {
    const data = {
      name: 'app 1',
      space: 1,
      thread: 1
    };
    const expectResult = {
      'app': '23',
      'revision': '2'
    };
    nock(URI)
      .post(APP_PREVIEW_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual(data);
        return true;
      })
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toBe('application/json;charset=utf-8');
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const addPreviewAppResult = appModule.addPreviewApp(data);
    return addPreviewAppResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_VA01',
      'id': 'WnoEhAtGyndxE9MFy0TW',
      'message': 'Missing or invalid input.',
      'errors': {
        'name': {
          'messages': [
            'Required field.'
          ]
        }
      }
    };
    nock(URI)
      .post(APP_PREVIEW_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual({});
        return true;
      })
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(400, expectResult);

    return appModule.addPreviewApp()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });
});