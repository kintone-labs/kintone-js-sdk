
/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');

const common = require('../../utils/common');

const {App, Auth, Connection, KintoneAPIException} = require(common.MAIN_PATH);
const URI = 'https://' + common.DOMAIN;
const APP_PREVIEW_DEPLOY_ROUTE = '/k/v1/preview/app/deploy.json';
const GUEST_APP_PREVIEW_DEPLOY_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/preview/app/deploy.json`;

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

describe('deployAppSettings function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE)
        .reply(200, {});

      const deployAppSettingsResult = appModule.deployAppSettings();
      expect(deployAppSettingsResult).toHaveProperty('then');
      expect(deployAppSettingsResult).toHaveProperty('catch');
    });
    it('should return promise - GUEST SPACE', () => {
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE)
        .reply(200, {});

      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings();
      expect(deployAppSettingsResult).toHaveProperty('then');
      expect(deployAppSettingsResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[App-77]should deploy successfully the app', () => {
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
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {});
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject({});
      });
    });
    it('[App-78]should deploy successfully the app when input revert =  false', () => {
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
        'revert': false
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {});
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject({});
      });
    });
    it('[App-79]should deploy successfully the app without revert', () => {
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
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {});
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps);
      return deployAppSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject({});
      });
    });
    it('[App-80]should deploy successfully the app when input revision = -1', () => {
      const data = {
        'apps': [
          {
            'app': 1,
            'revision': -1
          },
          {
            'app': 1001,
            'revision': -1
          }
        ],
        'revert': true
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {});
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject({});
      });
    });
    it('[App-81]should deploy successfully the app without revision', () => {
      const data = {
        'apps': [
          {
            'app': 1
          },
          {
            'app': 1001
          }
        ],
        'revert': true
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {});
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject({});
      });
    });
    it('[App-82]should deploy successfully the app in GUEST SPACE', () => {
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
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {});
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject({});
      });
    });
    it('[App-83]should deploy successfully the app when input revert =  false in GUEST SPACE', () => {
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
        'revert': false
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {});
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject({});
      });
    });
    it('[App-84]should deploy successfully the app without revert in GUEST SPACE', () => {
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
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {});
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps);
      return deployAppSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject({});
      });
    });
    it('[App-85]should deploy successfully the app when input revision = -1 in GUEST SPACE', () => {
      const data = {
        'apps': [
          {
            'app': 1,
            'revision': -1
          },
          {
            'app': 1001,
            'revision': -1
          }
        ],
        'revert': true
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {});
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject({});
      });
    });
    it('[App-86]should deploy successfully the app without revision in GUEST SPACE', () => {
      const data = {
        'apps': [
          {
            'app': 1
          },
          {
            'app': 1001
          }
        ],
        'revert': true
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(200, {});
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject({});
      });
    });
  });

  describe('error case', () => {
    it('[App-87]should return error when use API token', () => {
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
      const expectedResult = {
        'code': 'GAIA_NO01',
        'id': 'bXSDa6JGjydfaUFvccSE',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(403, expectedResult);
      const deployAppSettingsResult = appModuleAPI.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-88]should return error when use API token in GUEST SPACE', () => {
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
      const expectedResult = {
        'code': 'GAIA_NO01',
        'id': 'bXSDa6JGjydfaUFvccSE',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(403, expectedResult);
      const deployAppSettingsResult = appModuleAPIGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-89]should return error when the appId is none exist', () => {
      const data = {
        'apps': [
          {
            'app': 444444
          }
        ]
      };
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'K45k0CEPV5802MKyPcu1',
        'message': 'The app (ID: 444444) not found. The app may have been deleted.'
      };

      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .reply(404, expectResult);
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-90]should return error when input revision is incorrectly', () => {
      const data = {
        'apps': [
          {
            'app': 1,
            'revision': 9999999999
          },
        ],
        'revert': true
      };
      const expectedResult = {
        'code': 'GAIA_CO03',
        'id': 'WI3yLUgRs3C9mhAkVDZZ',
        'message': 'The revision is not the latest. Someone may update the app settings (ID: 1).'
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(409, expectedResult);
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-91]should return error when input revision is invalid', () => {
      const data = {
        'apps': [
          {
            'app': 1,
            'revision': 'testInvalidRevision'
          },
        ],
        'revert': true
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'uxntJCN4bHwC91IRNcAr',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps[0].revision': {
            'messages': [
              'Enter an integer value.'
            ]
          }
        }
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectedResult);
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-92]should return error when input no appID', () => {
      const data = {
        'apps': [
          {
          },
        ],
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'ZD42Oyn994arW3csc2E9',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps[0].app': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectedResult);
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-93]should return error when the appID is none exist', () => {
      const data = {
        'apps': [
          {
            'app': 99999999999
          },
        ],
      };
      const expectedResult = {
        'code': 'CB_NO02',
        'id': 'aXzlDsMdnPX4ADL5ZSJU',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(403, expectedResult);
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-94]should return error when the appID is zero', () => {
      const data = {
        'apps': [
          {
            'app': 0
          },
        ],
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'KyfR3L70T39EP2pBHm6a',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps[0].app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectedResult);
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-95]should return error when the appID is negative', () => {
      const data = {
        'apps': [
          {
            'app': -1
          },
        ],
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'KyfR3L70T39EP2pBHm6a',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps[0].app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectedResult);
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-96]should return error when input invalid revert', () => {
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
        'revert': 'testInvalidRevert'
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'ebMGFHrvJHhFlo5EoJZK',
        'message': 'Missing or invalid input.',
        'errors': {
          'revert': {
            'messages': [
              'must be boolean.'
            ]
          }
        }
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectedResult);
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-97]should return error when the appId is none exist in GUEST SPACE', () => {
      const data = {
        'apps': [
          {
            'app': 444444
          }
        ]
      };
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'K45k0CEPV5802MKyPcu1',
        'message': 'The app (ID: 444444) not found. The app may have been deleted.'
      };

      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .reply(404, expectResult);
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-98]should return error when input revision is incorrectly in GUEST SPACE', () => {
      const data = {
        'apps': [
          {
            'app': 1,
            'revision': 9999999999
          },
        ],
        'revert': true
      };
      const expectedResult = {
        'code': 'GAIA_CO03',
        'id': 'WI3yLUgRs3C9mhAkVDZZ',
        'message': 'The revision is not the latest. Someone may update the app settings (ID: 1).'
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(409, expectedResult);
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-99]should return error when input revision is invalid in GUEST SPACE', () => {
      const data = {
        'apps': [
          {
            'app': 1,
            'revision': 'testInvalidRevision'
          },
        ],
        'revert': true
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'uxntJCN4bHwC91IRNcAr',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps[0].revision': {
            'messages': [
              'Enter an integer value.'
            ]
          }
        }
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectedResult);
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-100]should return error when input no appID in GUEST SPACE', () => {
      const data = {
        'apps': [
          {
          },
        ],
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'ZD42Oyn994arW3csc2E9',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps[0].app': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectedResult);
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-101]should return error when the appID is none exist in GUEST SPACE', () => {
      const data = {
        'apps': [
          {
            'app': 99999999999
          },
        ],
      };
      const expectedResult = {
        'code': 'CB_NO02',
        'id': 'aXzlDsMdnPX4ADL5ZSJU',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(403, expectedResult);
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-102]should return error when the appID is zero in GUEST SPACE', () => {
      const data = {
        'apps': [
          {
            'app': 0
          },
        ],
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'KyfR3L70T39EP2pBHm6a',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps[0].app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectedResult);
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-103]should return error when the appID is negative in GUEST SPACE', () => {
      const data = {
        'apps': [
          {
            'app': -1
          },
        ],
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'KyfR3L70T39EP2pBHm6a',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps[0].app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectedResult);
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-104]should return error when input invalid revert in GUEST SPACE', () => {
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
        'revert': 'testInvalidRevert'
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'ebMGFHrvJHhFlo5EoJZK',
        'message': 'Missing or invalid input.',
        'errors': {
          'revert': {
            'messages': [
              'must be boolean.'
            ]
          }
        }
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(400, expectedResult);
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-105]should return error permission deny', () => {
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
      const expectedResult = {
        'code': 'CB_NO02',
        'id': 'QuohWmIy6j6L7IM0S6QP',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .post(APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(403, expectedResult);
      const deployAppSettingsResult = appModule.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-106]should return error permission deny in GUEST SPACE', () => {
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
      const expectedResult = {
        'code': 'CB_NO02',
        'id': 'QuohWmIy6j6L7IM0S6QP',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_DEPLOY_ROUTE, (rqBody) => {
          expect(rqBody).toEqual(data);
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
        .reply(403, expectedResult);
      const deployAppSettingsResult = appModuleGuestSpace.deployAppSettings(data.apps, data.revert);
      return deployAppSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
  });
});
