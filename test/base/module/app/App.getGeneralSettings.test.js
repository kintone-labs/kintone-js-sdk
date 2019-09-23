import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_SETTINGS_API_ROUTE = '/k/v1/app/settings.json';
const APP_PREVIEW_SETTINGS_API_ROUTE = '/k/v1/preview/app/settings.json';

describe('Checking App.getGeneralSettings', () => {
  it('[General setting-4]should get successfully the app general settings information', () => {
    const data = {
      'app': 1,
      'lang': 'en'
    };

    const expectResult = {
      'name': 'San Francisco Lunch Map',
      'description': 'A list of great places to go!',
      'icon': {
        'type': 'PRESET',
        'key': 'APP60'
      },
      'theme': 'WHITE',
      'revision': '24'
    };
    nock(URI)
      .get(APP_SETTINGS_API_ROUTE)
      .query(data)
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const getGeneralSettingsResult = appModule.getGeneralSettings(data);
    return getGeneralSettingsResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('should get successfully the PRE-LIVE app general settings information', () => {
    const dataForNock = {
      'app': 1,
      'lang': 'en'
    };

    const dataToRequest = {
      'app': 1,
      'lang': 'en',
      isPreview: true
    };

    const expectResult = {
      'name': 'San Francisco Lunch Map',
      'description': 'A list of great places to go!',
      'icon': {
        'type': 'PRESET',
        'key': 'APP60'
      },
      'theme': 'WHITE',
      'revision': '24'
    };
    nock(URI)
      .get(APP_PREVIEW_SETTINGS_API_ROUTE)
      .query(dataForNock)
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const getGeneralSettingsResult = appModule.getGeneralSettings(dataToRequest);
    return getGeneralSettingsResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    return appModule.getGeneralSettings().then((resp) => {
      // TODO: verify the resp
    }).catch((error) => {
      // TODO: verify the error
    });
  });
});