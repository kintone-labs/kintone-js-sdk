import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_PREVIEW_DEPLOY_API_ROUTE = '/k/v1/preview/app/deploy.json';

describe('Checking App.deployAppSettings', () => {
  it('should deploy successfully the app', () => {
    const data = {
      'apps': [
        {
          'app': 1,
          'revision': 57
        },
        {
          'app': 1001,
          'revision': 22
        }
      ],
      'revert': true
    };
    nock(URI)
      .post(APP_PREVIEW_DEPLOY_API_ROUTE, (rqBody) => {
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
      .reply(200, {});

    const appModule = createAppToSendRequest();
    const deployAppSettingsResult = appModule.deployAppSettings(data);
    return deployAppSettingsResult.then((rsp) => {
      expect(rsp).toMatchObject({});
    });
  });

  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_VA01',
      'id': 'eH1w9UHl3ItjFu85en7C',
      'message': 'Missing or invalid input.',
      'errors': {
        'apps': {
          'messages': ['Required field.']
        }
      }
    };
    nock(URI)
      .post(APP_PREVIEW_DEPLOY_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual({});
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(400, expectResult);

    return appModule.deployAppSettings()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });
});