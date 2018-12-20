
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

const generateItemsInArray = (array, quantity)=> {
  for (let i = 0; i < quantity; i++) {
    array.push(i + 1);
  }
};

describe('getAppDeployStatus function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock(URI)
        .get(APP_PREVIEW_DEPLOY_ROUTE)
        .reply(200, {});

      const getAppDeployStatusResult = appModule.getAppDeployStatus();
      expect(getAppDeployStatusResult).toHaveProperty('then');
      expect(getAppDeployStatusResult).toHaveProperty('catch');
    });
    it('should return promise - GUEST SPACE', () => {
      nock(URI)
        .get(GUEST_APP_PREVIEW_DEPLOY_ROUTE)
        .reply(200, {});

      const getAppDeployStatusResult = appModuleGuestSpace.getAppDeployStatus();
      expect(getAppDeployStatusResult).toHaveProperty('then');
      expect(getAppDeployStatusResult).toHaveProperty('catch');
    });
  });
  describe('success case', () => {
    it('[App-107]should get successfully the app deploy status', () => {
      const data = {
        'apps': [1, 2]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'apps': [
          {
            'app': '1',
            'status': 'SUCCESS'
          },
          {
            'app': '2',
            'status': 'SUCCESS'
          }
        ]
      };
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectedResult);
      const getAppDeployStatusResult = appModule.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectedResult);
      });
    });
    it('[App-108]should get successfully the app deploy status when input 300 appID', () => {
      const data = {
        'apps': []
      };
      generateItemsInArray(data.apps, 300);
      const params = common.serializeParams(data);
      const expectedResult = {
        'apps': []
      };
      const appsStatus = ['PROCESSING', 'SUCCESS', 'FAIL', 'CANCEL'];
      for (let i = 0; i < 300; i++) {
        expectedResult.apps.push({
          'app': `${i + 1}`,
          'status': `${appsStatus[Math.floor(Math.random() * appsStatus.length)]}`
        });
      }
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectedResult);
      const getAppDeployStatusResult = appModule.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectedResult);
      });
    });
    it('[App-109]should get successfully the app deploy status in GUEST SPACE', () => {
      const data = {
        'apps': [1, 2]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'apps': [
          {
            'app': '1',
            'status': 'SUCCESS'
          },
          {
            'app': '2',
            'status': 'SUCCESS'
          }
        ]
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectedResult);
      const getAppDeployStatusResult = appModuleGuestSpace.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectedResult);
      });
    });
    it('[App-110]should get successfully the app deploy status when input 300 appID in GUEST SPACE', () => {
      const data = {
        'apps': []
      };
      generateItemsInArray(data.apps, 300);
      const params = common.serializeParams(data);
      const expectedResult = {
        'apps': []
      };
      const appsStatus = ['PROCESSING', 'SUCCESS', 'FAIL', 'CANCEL'];
      for (let i = 0; i < 300; i++) {
        expectedResult.apps.push({
          'app': `${i + 1}`,
          'status': `${appsStatus[Math.floor(Math.random() * appsStatus.length)]}`
        });
      }
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectedResult);
      const getAppDeployStatusResult = appModuleGuestSpace.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.then((rsp) => {
        expect(rsp).toMatchObject(expectedResult);
      });
    });
  });
  describe('error case', () => {
    it('[App-111]should return error when use API token', () => {
      const data = {
        'apps': [1, 2]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'code': 'GAIA_NO01',
        'id': 'TQlNrvAWQSBmQf7hTBHs',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(authAPI.getApiToken());
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModuleAPI.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-112]should return error when use API token in GUEST SPACE', () => {
      const data = {
        'apps': [1, 2]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'code': 'GAIA_NO01',
        'id': 'TQlNrvAWQSBmQf7hTBHs',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(authAPI.getApiToken());
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModuleAPIGuestSpace.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-113]should return error when input no appID', () => {
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'b8mLxY4d96WXnfJmdoPi',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModule.getAppDeployStatus(undefined);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-114]should return error when the appId is none exist', () => {
      const data = {
        'apps': [444444]
      };
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'K45k0CEPV5802MKyPcu1',
        'message': 'The app (ID: 444444) not found. The app may have been deleted.'
      };
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}?apps[0]=${data.apps[0]}`)
        .reply(404, expectResult);
      const getAppDeployStatusResult = appModule.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-115]should return error when input duplicated appID', () => {
      const data = {
        'apps': [1, 1]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'e8eqDlrkMad4YvuzOo9f',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps[1].app': {
            'messages': [
              'App ID is duplicated.'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModule.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-116]should return error when input appID is negative', () => {
      const data = {
        'apps': [-1, 2]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'code': 'CB_VA01',
        'id': '8p8p33oWqBXmk7Zo6TgS',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModule.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-117]should return error when input appID is zero', () => {
      const data = {
        'apps': [0, 2]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'code': 'CB_VA01',
        'id': '8p8p33oWqBXmk7Zo6TgS',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModule.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-118]should return error when input more than 300 appID', () => {
      const data = {
        'apps': []
      };
      generateItemsInArray(data.apps, 301);
      const params = common.serializeParams(data);
      const expectedResult = {
        'id': 'S0S77sTXDD7ngqHZNW3i',
        'code': 'GAIA_TO03',
        'message': 'The number of parameters exceeds the limit. - apps[300]'
      };
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModule.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-119]should return error when input no appID GUEST SPACE', () => {
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'b8mLxY4d96WXnfJmdoPi',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_DEPLOY_ROUTE}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModuleGuestSpace.getAppDeployStatus(undefined);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-120]should return error when the appId is none exist GUEST SPACE', () => {
      const data = {
        'apps': [444444]
      };
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'K45k0CEPV5802MKyPcu1',
        'message': 'The app (ID: 444444) not found. The app may have been deleted.'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_DEPLOY_ROUTE}?apps[0]=${data.apps[0]}`)
        .reply(404, expectResult);
      const getAppDeployStatusResult = appModuleGuestSpace.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-121]should return error when input duplicated appID GUEST SPACE', () => {
      const data = {
        'apps': [1, 1]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'e8eqDlrkMad4YvuzOo9f',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps[1].app': {
            'messages': [
              'App ID is duplicated.'
            ]
          }
        }
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModuleGuestSpace.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-122]should return error when input appID is negative GUEST SPACE', () => {
      const data = {
        'apps': [-1, 2]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'code': 'CB_VA01',
        'id': '8p8p33oWqBXmk7Zo6TgS',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModuleGuestSpace.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-123]should return error when input appID is zero GUEST SPACE', () => {
      const data = {
        'apps': [0, 2]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'code': 'CB_VA01',
        'id': '8p8p33oWqBXmk7Zo6TgS',
        'message': 'Missing or invalid input.',
        'errors': {
          'apps': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModuleGuestSpace.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-124]should return error when input more than 300 appID GUEST SPACE', () => {
      const data = {
        'apps': []
      };
      generateItemsInArray(data.apps, 301);
      const params = common.serializeParams(data);
      const expectedResult = {
        'id': 'S0S77sTXDD7ngqHZNW3i',
        'code': 'GAIA_TO03',
        'message': 'The number of parameters exceeds the limit. - apps[300]'
      };
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectedResult);
      const getAppDeployStatusResult = appModule.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-125]should return error permission deny', () => {
      const data = {
        'apps': [1, 2]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'code': 'CB_NO02',
        'id': 'QuohWmIy6j6L7IM0S6QP',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(`${APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(403, expectedResult);
      const getAppDeployStatusResult = appModule.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-126]should return error permission deny GUEST SPACE', () => {
      const data = {
        'apps': [1, 2]
      };
      const params = common.serializeParams(data);
      const expectedResult = {
        'code': 'CB_NO02',
        'id': 'QuohWmIy6j6L7IM0S6QP',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_DEPLOY_ROUTE}?${params}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(403, expectedResult);
      const getAppDeployStatusResult = appModuleGuestSpace.getAppDeployStatus(data.apps);
      return getAppDeployStatusResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
  });
});
