import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_PREVIEW_SETTINGS_API_ROUTE = '/k/v1/preview/app/settings.json';

describe('Checking App.updateGeneralSettings', () => {
  it('should update successfully the general settings', () => {
    const expectBody = {
      'app': 1,
      'name': 'APP_NAME',
      'description': 'Here is app description.',
      'icon': {
        'type': 'PRESET',
        'key': 'APP72'
      },
      'theme': 'WHITE',
      'revision': 1
    };
    const expectResult = {
      'revision': '2'
    };
    nock(URI)
      .put(APP_PREVIEW_SETTINGS_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual(expectBody);
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
    const updateGeneralSettingsResult = appModule.updateGeneralSettings(expectBody);
    return updateGeneralSettingsResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_VA01',
      'id': 'Iq51O0sSCh8TFfspTVTX',
      'message': 'Missing or invalid input.',
      'errors': {
        'app': {
          'messages': ['Required field.']
        }
      }
    };
    nock(URI)
      .put(APP_PREVIEW_SETTINGS_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual({});
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
      .reply(400, expectResult);
    return appModule.updateGeneralSettings()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });
});