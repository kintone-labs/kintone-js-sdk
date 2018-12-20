
/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');
const common = require('../../utils/common');
const {KintoneAPIException, Connection, Auth, App} = require(common.MAIN_PATH);

const auth = new Auth();
auth.setPasswordAuth(common.USERAPP_NAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);
const AppModule = new App(conn);

const MAX_VALUE = 2147483647;
const URI = 'https://' + common.DOMAIN;
const APPS_API_ROUTE = '/k/v1/apps.json';
const APPS_API_GUEST_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/apps.json`;
const APP_NAME = 'test';

describe('getAppsByName function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock(URI)
        .get(`${APPS_API_ROUTE}?name=${APP_NAME}`)
        .reply(200, {});

      const getAppResult = AppModule.getAppsByName(APP_NAME);
      expect(getAppResult).toHaveProperty('then');
      expect(getAppResult).toHaveProperty('catch');
    });
  });

  describe('success common', () => {
    it('[App-45] should return the app information based on the app APP_NAME (without limit, offset)', () => {
      const expectResult = {
        apps: [
          {
            'appId': '1',
            'code': 'task',
            'APP_NAME': 'My Test App',
            'description': 'Testing this app',
            'spaceId': null,
            'threadId': null,
            'createdAt': '2014-06-02T05:14:05.000Z',
            'creator': {
              'code': 'user1',
              'APP_NAME': 'user1'
            },
            'modifiedAt': '2014-06-02T05:14:05.000Z',
            'modifier': {
              'code': 'user1',
              'APP_NAME': 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?name=${APP_NAME}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERAPP_NAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME);
      return getAppsResult.then((rsp) => {
        expect(rsp).toEqual(expectResult);
      });
    });

    it('[App-46] number of the apps is returned based on the limit', () => {
      const limit = 2;
      const expectResult = {
        apps: [
          {
            appId: '1',
            code: 'task',
            APP_NAME: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              APP_NAME: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              APP_NAME: 'user1'
            }
          },
          {
            appId: '2',
            code: 'task',
            APP_NAME: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              APP_NAME: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              APP_NAME: 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?limit=${limit}&name=${APP_NAME}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERAPP_NAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME, undefined, limit);
      return getAppsResult.then((rsp) => {
        expect(rsp).toEqual(expectResult);
      });
    });

    it('[App-47] number of the apps is returned based on the offset', () => {
      const offset = 2;
      const expectResult = {
        apps: [
          {
            appId: '1',
            code: 'task',
            APP_NAME: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              APP_NAME: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              APP_NAME: 'user1'
            }
          },
          {
            appId: '2',
            code: 'task',
            APP_NAME: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              APP_NAME: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              APP_NAME: 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?offset=${offset}&name=${APP_NAME}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERAPP_NAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME, offset, undefined);
      return getAppsResult.then((rsp) => {
        expect(rsp).toEqual(expectResult);
      });
    });

    it('[App-48] get maximum 100 apps for the limit value', () => {
      const limit = 100;
      const numberOfApps = 100;
      const app = {
        'appId': '1',
        'code': 'task',
        'APP_NAME': 'My Test App',
        'description': 'Testing this app',
        'spaceId': null,
        'threadId': null,
        'createdAt': '2014-06-02T05:14:05.000Z',
        'creator': {
          'code': 'user1',
          'APP_NAME': 'user1'
        },
        'modifiedAt': '2014-06-02T05:14:05.000Z',
        'modifier': {
          'code': 'user1',
          'APP_NAME': 'user1'
        }
      };
      const expectResult = {
        apps: common.generateRecord(numberOfApps, app)
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?limit=${limit}&name=${APP_NAME}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERAPP_NAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME, undefined, limit);
      return getAppsResult.then((rsp) => {
        expect(rsp).toEqual(expectResult);
      });
    });

    it('[App-49] the app information of guest space is returned', () => {
      const expectResult = {
        apps: [
          {
            'appId': '1',
            'code': 'task',
            'APP_NAME': 'My Test App',
            'description': 'Testing this app',
            'spaceId': null,
            'threadId': null,
            'createdAt': '2014-06-02T05:14:05.000Z',
            'creator': {
              'code': 'user1',
              'APP_NAME': 'user1'
            },
            'modifiedAt': '2014-06-02T05:14:05.000Z',
            'modifier': {
              'code': 'user1',
              'APP_NAME': 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(`${APPS_API_GUEST_ROUTE}?name=${APP_NAME}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERAPP_NAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const conn1 = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
      const AppModuleGuestSpace = new App(conn1);
      const getAppsResult = AppModuleGuestSpace.getAppsByName(APP_NAME);
      return getAppsResult.then((rsp) => {
        expect(rsp).toEqual(expectResult);
      });
    });

    it('[App-53] when not specifying the limit, the default limit value is 100', () => {
      const numberOfApps = 100;
      const app = {
        'appId': '1',
        'code': 'task',
        'APP_NAME': 'My Test App',
        'description': 'Testing this app',
        'spaceId': null,
        'threadId': null,
        'createdAt': '2014-06-02T05:14:05.000Z',
        'creator': {
          'code': 'user1',
          'APP_NAME': 'user1'
        },
        'modifiedAt': '2014-06-02T05:14:05.000Z',
        'modifier': {
          'code': 'user1',
          'APP_NAME': 'user1'
        }
      };
      const expectResult = {
        apps: common.generateRecord(numberOfApps, app)
      };

      nock(URI)
        .get(`${APPS_API_ROUTE}?name=${APP_NAME}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERAPP_NAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME);
      return getAppsResult.then((rsp) => {
        expect(rsp).toEqual(expectResult);
      });
    });

    it('[App-54] when not specifying the limit, the default offset value is 0', () => {
      const expectResult = {
        apps: [
          {
            'appId': '1',
            'code': 'task',
            'APP_NAME': 'My Test App',
            'description': 'Testing this app',
            'spaceId': null,
            'threadId': null,
            'createdAt': '2014-06-02T05:14:05.000Z',
            'creator': {
              'code': 'user1',
              'APP_NAME': 'user1'
            },
            'modifiedAt': '2014-06-02T05:14:05.000Z',
            'modifier': {
              'code': 'user1',
              'APP_NAME': 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?name=${APP_NAME}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERAPP_NAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME);
      return getAppsResult.then((rsp) => {
        expect(rsp).toEqual(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[App-45]should return error when using API token authentication ', () => {
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'lzQPJ1hkW3Aj4iVebWCG',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?name=${APP_NAME}`)
        .reply(403, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME);
      return getAppsResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[App-38] Error will be displayed when input 0 to the limit', () => {
      const limit = 0;
      const expectResult = {
        code: 'CB_VA01',
        id: 'u5raHo9ugggi6JhuwaBN',
        message: '入力内容が正しくありません。',
        errors: {
          limit: {
            messages: ['最小でも1以上です。']
          }
        }
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?limit=${limit}&name=${APP_NAME}`)
        .reply(400, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME, undefined, limit);
      return getAppsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[App-39] Error will be displayed when input number > 100 to the limit', () => {
      const limit = 101;
      const expectResult = {
        code: 'CB_VA01',
        id: 'rhfkAm75Cs0AJw0jpUU3',
        message: '入力内容が正しくありません。',
        errors: {
          limit: {
            messages: ['最大でも100以下です。']
          }
        }
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?limit=${limit}&name=${APP_NAME}`)
        .reply(400, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME, undefined, limit);
      return getAppsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[App-40] Error will be displayed when input number < 0 to the offset', () => {
      const offset = -1;
      const expectResult = {
        code: 'CB_VA01',
        id: 'k6cykYqDofAjHMmq40w1',
        message: '入力内容が正しくありません。',
        errors: {
          offset: {
            messages: ['最小でも0以上です。']
          }
        }
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?offset=${offset}&name=${APP_NAME}`)
        .reply(400, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME, offset, undefined);
      return getAppsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[App-43] Error will be displayed when input > 2147483647 to the offset', () => {
      const expectResult = {
        code: 'CB_VA01',
        id: 'OcOVMlF0yn6jSkvKctSI',
        message: '入力内容が正しくありません。',
        errors: {
          offset: {
            messages: ['最大でも2,147,483,647以下です。']
          }
        }
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?limit=${MAX_VALUE + 1}&name=${APP_NAME}`)
        .reply(400, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME, undefined, MAX_VALUE + 1);
      return getAppsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[App-44] the error will be displayed when input > 2147483647 to limit', () => {
      const expectResult = {
        code: 'CB_VA01',
        id: 'OcOVMlF0yn6jSkvKctSI',
        message: '入力内容が正しくありません。',
        errors: {
          offset: {
            messages: ['最大でも2,147,483,647以下です。']
          }
        }
      };
      nock(URI)
        .get(`${APPS_API_ROUTE}?offset=${MAX_VALUE + 1}&name=${APP_NAME}`)
        .reply(400, expectResult);
      const getAppsResult = AppModule.getAppsByName(APP_NAME, MAX_VALUE + 1, undefined);
      return getAppsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
