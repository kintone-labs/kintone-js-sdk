import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_PREVIEW_DEPLOY_API_ROUTE = '/k/v1/preview/app/deploy.json';

describe('Checking App.deployAppSettings', () => {
  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    return appModule.deployAppSettings().then((resp) => {
      // TODO: verify the resp
    }).catch((error) => {
      // TODO: verify the error
    });
  });

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
});