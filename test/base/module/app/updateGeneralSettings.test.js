/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');

const common = require('../../utils/common');

const {App, Auth, Connection, KintoneAPIException} = require(common.MAIN_PATH);

const URI = 'https://' + common.DOMAIN;
const APP_PREVIEW_SETTINGS_ROUTE = '/k/v1/preview/app/settings.json';
const GUEST_APP_PREVIEW_SETTINGS_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/preview/app/settings.json`;

// Init Connection
const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const appModule = new App(conn);

// Init API Connection
const authAPI = new Auth();
authAPI.setApiToken('testAPIToken');
const connAPI = new Connection(common.DOMAIN, authAPI);
const appModuleAPI = new App(connAPI);

// Init Connection Guest Space
const connGuestSpace = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const appModuleGuestSpace = new App(connGuestSpace);

// Init API Connection Guest Space
const connAPIGuestSpace = new Connection(common.DOMAIN, authAPI, common.GUEST_SPACEID);
const appModuleAPIGuestSpace = new App(connAPIGuestSpace);

describe('updateGeneralSettings function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE)
        .reply(200, {});

      const updateGeneralSettingsResult = appModule.updateGeneralSettings();
      expect(updateGeneralSettingsResult).toHaveProperty('then');
      expect(updateGeneralSettingsResult).toHaveProperty('catch');
    });
    it('should return promise - GUEST SPACE', () => {
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE)
        .reply(200, {});

      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings();
      expect(updateGeneralSettingsResult).toHaveProperty('then');
      expect(updateGeneralSettingsResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[General Setting-44]should update successfully the general settings', () => {
      const appId = 1;
      const generalSetings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const revision = 1;
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
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings, revision);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-45]should update successfully the name', () => {
      const appId = 1;
      const generalSetings = {
        'name': 'APP_NAME',
      };
      const expectBody = {
        'app': 1,
        'name': 'APP_NAME',
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-46]should update successfully the description', () => {
      const appId = 1;
      const generalSetings = {
        'description': 'Here is app description.'
      };
      const expectBody = {
        'app': 1,
        'description': 'Here is app description.'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-47]should update successfully the icon', () => {
      const appId = 1;
      const generalSetings = {
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        }
      };
      const expectBody = {
        'app': 1,
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        }
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-48]should update successfully the theme = WHITE', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'WHITE'
      };
      const expectBody = {
        'app': 1,
        'theme': 'WHITE'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-49]should update successfully the theme = RED', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'RED'
      };
      const expectBody = {
        'app': 1,
        'theme': 'RED'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-50]should update successfully the theme = BLUE', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'BLUE'
      };
      const expectBody = {
        'app': 1,
        'theme': 'BLUE'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-51]should update successfully the theme = GREEN', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'GREEN'
      };
      const expectBody = {
        'app': 1,
        'theme': 'GREEN'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-52]should update successfully the theme = YELLOW', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'YELLOW'
      };
      const expectBody = {
        'app': 1,
        'theme': 'YELLOW'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-53]should update successfully the theme = BLACK', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'BLACK'
      };
      const expectBody = {
        'app': 1,
        'theme': 'BLACK'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-54]should update successfully without revision', () => {
      const appId = 1;
      const generalSetings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const expectBody = {
        'app': 1,
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings, undefined);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-55]should update successfully when input revision = -1', () => {
      const appId = 1;
      const generalSetings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const revision = -1;
      const expectBody = {
        'app': 1,
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE',
        'revision': -1
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings, revision);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-56]should update successfully without general settings', () => {
      const appId = 1;
      const revision = 2;
      const expectBody = {
        'app': 1,
        'revision': 2
      };
      const expectResult = {
        'revision': '3'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, undefined, revision);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-57]should update successfully the general settings in GUEST SPACE', () => {
      const appId = 1;
      const generalSettings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const revision = 1;
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
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSettings, revision);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-58]should update successfully the name in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'name': 'APP_NAME',
      };
      const expectBody = {
        'app': 1,
        'name': 'APP_NAME',
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-59]should update successfully the description in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'description': 'Here is app description.'
      };
      const expectBody = {
        'app': 1,
        'description': 'Here is app description.'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-60]should update successfully the icon in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        }
      };
      const expectBody = {
        'app': 1,
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        }
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-61]should update successfully the theme = WHITE in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'WHITE'
      };
      const expectBody = {
        'app': 1,
        'theme': 'WHITE'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-62]should update successfully the theme = RED in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'RED'
      };
      const expectBody = {
        'app': 1,
        'theme': 'RED'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-63]should update successfully the theme = BLUE in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'BLUE'
      };
      const expectBody = {
        'app': 1,
        'theme': 'BLUE'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-64]should update successfully the theme = GREEN in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'GREEN'
      };
      const expectBody = {
        'app': 1,
        'theme': 'GREEN'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-65]should update successfully the theme = YELLOW in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'YELLOW'
      };
      const expectBody = {
        'app': 1,
        'theme': 'YELLOW'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-66]should update successfully the theme = BLACK in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'BLACK'
      };
      const expectBody = {
        'app': 1,
        'theme': 'BLACK'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-67]should update successfully without revision in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const expectBody = {
        'app': 1,
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings, undefined);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-68]should update successfully when input revision = -1 in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const revision = -1;
      const expectBody = {
        'app': 1,
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE',
        'revision': -1
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings, revision);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[General Setting-69]should update successfully without general settings in GUEST SPACE', () => {
      const appId = 1;
      const revision = 1;
      const expectBody = {
        'app': 1,
        'revision': 1
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(200, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, undefined, revision);
      return updateGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });
  describe('error case', () => {
    it('[General Setting-70]should return error when use API token', () => {
      const appId = 1;
      const expectBody = {
        'app': 1,
      };
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'fjQ4hXjZdiKCadmt3ZKn',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(authAPI.getApiToken());
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(403, expectResult);
      const updateGeneralSettingsResult = appModuleAPI.updateGeneralSettings(appId);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-71]should return error when use API token in GUEST SPACE', () => {
      const appId = 1;
      const expectBody = {
        'app': 1,
      };
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'fjQ4hXjZdiKCadmt3ZKn',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(authAPI.getApiToken());
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(403, expectResult);
      const updateGeneralSettingsResult = appModuleAPIGuestSpace.updateGeneralSettings(appId);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-72]should return error when input revision is incorrectly', () => {
      const appId = 1;
      const generalSettings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const revision = '9999999999';
      const expectBody = {
        'app': 1,
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE',
        'revision': '9999999999'
      };
      const expectResult = {
        'code': 'GAIA_CO03',
        'id': 'ZpGZUiUR4OWHTmNTUETW',
        'message': 'The revision is not the latest. Someone may update the app settings (ID: 32).'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(409, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSettings, revision);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-73]should return error when input revision is invalid', () => {
      const appId = 1;
      const generalSettings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const revision = 'testInvalidRevision';
      const expectBody = {
        'app': 1,
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE',
        'revision': 'testInvalidRevision'
      };
      const expectResult = {
        'code': 'GAIA_CO03',
        'id': 'ZpGZUiUR4OWHTmNTUETW',
        'message': 'The revision is not the latest. Someone may update the app settings (ID: 32).'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSettings, revision);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-74]should return error when input no appID', () => {
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'XRcP1vV2tHV1ikuYHbMC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(404, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings();
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-75]should return error when the appID is none exist', () => {
      const appID = '444444';
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'K45k0CEPV5802MKyPcu1',
        'message': 'The app (ID: 444444) not found. The app may have been deleted.'
      };

      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(appID);
          return true;
        })
        .reply(404, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appID);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-76]should return error when the appID is zero', () => {
      const appID = 0;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'B8GcJ7HlLSwxIEVWktLf',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(appID);
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appID);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-77]should return error when the appID is negative', () => {
      const appID = -1;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'B8GcJ7HlLSwxIEVWktLf',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(appID);
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appID);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-78]should return error when input invalid theme', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'testInvalidTheme'
      };
      const expectBody = {
        'app': 1,
        'theme': 'testInvalidTheme'
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'AfDS5Vm1GyWCylIHznfS',
        'message': 'Missing or invalid input.',
        'errors': {
          'theme': {
            'messages': [
              'must be one of the enum value'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-79]should return error when input no icon.type', () => {
      const appId = 1;
      const generalSetings = {
        'icon': {
          'key': 'APP72'
        }
      };
      const expectBody = {
        'app': 1,
        'icon': {
          'key': 'APP72'
        }
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'dq1sftI6nlPYeNjglyhn',
        'message': 'Missing or invalid input.',
        'errors': {
          'icon.type': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-80]should return error when input no icon.key', () => {
      const appId = 1;
      const generalSetings = {
        'icon': {
          'type': 'PRESET',
        }
      };
      const expectBody = {
        'app': 1,
        'icon': {
          'type': 'PRESET'
        }
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'vC0CS0aTWUHI468jgyl5',
        'message': 'Missing or invalid input.',
        'errors': {
          'icon.key': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-81]should return error when input revision is incorrectly in GUEST SPACE', () => {
      const appId = 1;
      const generalSettings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const revision = '9999999999';
      const expectBody = {
        'app': 1,
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE',
        'revision': '9999999999'
      };
      const expectResult = {
        'code': 'GAIA_CO03',
        'id': 'ZpGZUiUR4OWHTmNTUETW',
        'message': 'The revision is not the latest. Someone may update the app settings (ID: 32).'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(409, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSettings, revision);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-82]should return error when input revision is invalid in GUEST SPACE', () => {
      const appId = 1;
      const generalSettings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const revision = 'testInvalidRevision';
      const expectBody = {
        'app': 1,
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE',
        'revision': 'testInvalidRevision'
      };
      const expectResult = {
        'code': 'GAIA_CO03',
        'id': 'ZpGZUiUR4OWHTmNTUETW',
        'message': 'The revision is not the latest. Someone may update the app settings (ID: 32).'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSettings, revision);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-83]should return error when input no appID in GUEST SPACE', () => {
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'XRcP1vV2tHV1ikuYHbMC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(404, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings();
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-84]should return error when the appID is none exist in GUEST SPACE', () => {
      const appID = '444444';
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'K45k0CEPV5802MKyPcu1',
        'message': 'The app (ID: 444444) not found. The app may have been deleted.'
      };

      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(appID);
          return true;
        })
        .reply(404, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appID);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-85]should return error when the appID is zero in GUEST SPACE', () => {
      const appID = 0;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'B8GcJ7HlLSwxIEVWktLf',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(appID);
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appID);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-86]should return error when the appID is negative in GUEST SPACE', () => {
      const appID = -1;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'B8GcJ7HlLSwxIEVWktLf',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody.app).toEqual(appID);
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appID);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-87]should return error when input invalid theme in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'theme': 'testInvalidTheme'
      };
      const expectBody = {
        'app': 1,
        'theme': 'testInvalidTheme'
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'AfDS5Vm1GyWCylIHznfS',
        'message': 'Missing or invalid input.',
        'errors': {
          'theme': {
            'messages': [
              'must be one of the enum value'
            ]
          }
        }
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-88]should return error when input no icon.type in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'icon': {
          'key': 'APP72'
        }
      };
      const expectBody = {
        'app': 1,
        'icon': {
          'key': 'APP72'
        }
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'dq1sftI6nlPYeNjglyhn',
        'message': 'Missing or invalid input.',
        'errors': {
          'icon.type': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-89]should return error when input no icon.key in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'icon': {
          'type': 'PRESET'
        }
      };
      const expectBody = {
        'app': 1,
        'icon': {
          'type': 'PRESET'
        }
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'dq1sftI6nlPYeNjglyhn',
        'message': 'Missing or invalid input.',
        'errors': {
          'icon.type': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(400, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-90]should return error permission deny', () => {
      const appId = 1;
      const generalSetings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const revision = 1;
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
        'code': 'CB_NO02',
        'id': 's1BFY1N96w0EGndRGLkF',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .put(APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(403, expectResult);
      const updateGeneralSettingsResult = appModule.updateGeneralSettings(appId, generalSetings, revision);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[General Setting-91]should return error permission deny in GUEST SPACE', () => {
      const appId = 1;
      const generalSetings = {
        'name': 'APP_NAME',
        'description': 'Here is app description.',
        'icon': {
          'type': 'PRESET',
          'key': 'APP72'
        },
        'theme': 'WHITE'
      };
      const revision = 1;
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
        'code': 'CB_NO02',
        'id': 's1BFY1N96w0EGndRGLkF',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .put(GUEST_APP_PREVIEW_SETTINGS_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toBe('application/json;charset=utf-8');
          return true;
        })
        .reply(403, expectResult);
      const updateGeneralSettingsResult = appModuleGuestSpace.updateGeneralSettings(appId, generalSetings, revision);
      return updateGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
