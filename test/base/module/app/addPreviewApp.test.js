
/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');

const common = require('../../utils/common');

const {App, Auth, Connection, KintoneAPIException} = require(common.MAIN_PATH);
const URI = 'https://' + common.DOMAIN;
const APP_PREVIEW_ROUTE = '/k/v1/preview/app.json';
const GUEST_APP_PREVIEW_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/preview/app.json`;

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

const generateCharacters = (quantity) => {
  let result = '';
  const arrayAlphabet = (() => {
    const a = [];
    let i = 'a'.charCodeAt(0);
    const j = 'z'.charCodeAt(0);
    for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
    }
    return a;
  })();
  for (let i = 0; i < quantity; i++) {
    result += arrayAlphabet[Math.floor(Math.random() * arrayAlphabet.length)];
  }
  return result;
};

describe('addPreviewApp function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock(URI)
        .post('/k/v1/preview/app.json')
        .reply(200, {});

      const addPreviewAppResult = appModule.addPreviewApp();
      expect(addPreviewAppResult).toHaveProperty('then');
      expect(addPreviewAppResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[App-127]should add successfully a new app', () => {
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
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(200, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[App-128]should add successfully a new app without space and thread', () => {
      const data = {
        name: 'app 1'
      };
      const expectResult = {
        'app': '23',
        'revision': '2'
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(200, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name);
      return addPreviewAppResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[App-129]should add successfully a new app when input name 64 characters', () => {
      const data = {
        name: generateCharacters(64),
        space: 1,
        thread: 1
      };
      const expectResult = {
        'app': '23',
        'revision': '2'
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(200, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[App-130]should add successfully a new app in GUEST SPACE', () => {
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
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(200, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[App-131]should add successfully a new app without space and thread in GUEST SPACE', () => {
      const data = {
        name: 'app 1'
      };
      const expectResult = {
        'app': '23',
        'revision': '2'
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(200, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name);
      return addPreviewAppResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[App-132]should add successfully a new app when input name 64 characters in GUEST SPACE', () => {
      const data = {
        name: generateCharacters(64),
        space: 1,
        thread: 1
      };
      const expectResult = {
        'app': '23',
        'revision': '2'
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(200, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[App-133]should return error when use API Token', () => {
      const data = {
        name: 'app 1',
        space: 1,
        thread: 1
      };
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'LmxUdaeog9p4xukkEAqu',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(403, expectResult);
      const addPreviewAppResult = appModuleAPI.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-134]should return error when use API Token in GUEST SPACE', () => {
      const data = {
        name: 'app 1',
        space: 1,
        thread: 1
      };
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'LmxUdaeog9p4xukkEAqu',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(403, expectResult);
      const addPreviewAppResult = appModuleAPIGuestSpace.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-135]should return error when do not specify app name', () => {
      const expectResult = {
        'code': 'CB_VA01',
        'id': '0maHPzr1u2yaaWTzN3V3',
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
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
          expect(rqBody).toEqual({});
          return true;
        })
        .reply(400, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp();
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-136]should return error when input name more than 64 characters', () => {
      const data = {
        name: generateCharacters(65),
        space: 1,
        thread: 1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'B9LRP7NB2O54glDQ9udo',
        'message': 'Missing or invalid input.',
        'errors': {
          'name': {
            'messages': [
              'Name must be between 1 and 64 characters.'
            ]
          }
        }
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-137]should return error when do not specify space', () => {
      const data = {
        name: 'app 1',
        thread: 1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'rXpruV4jykINxfPfl5Zm',
        'message': 'Missing or invalid input.',
        'errors': {
          'space': {
            'messages': [
              'Space parameter is required to create an app in space.'
            ]
          }
        }
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name, undefined, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-138]should return error when input space is none exist ', () => {
      const data = {
        name: 'app 1',
        space: 9999999999,
        thread: 1
      };
      const expectResult = {
        'code': 'OC_NO01',
        'id': 'pxZWdKuhBvlmCCd5NRBe',
        'message': 'The space (id: 9,999,999,999) could not be found, or no longer exists.'
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-139]should return error when input space negative', () => {
      const data = {
        name: 'app 1',
        space: -1,
        thread: 1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': '2MZHL3ZTAnDnKdGVAMoQ',
        'message': 'Missing or invalid input.',
        'errors': {
          'space': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-140]should return error when do not specify thread', () => {
      const data = {
        name: 'app 1',
        space: 1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'svFkhaxlNo9nAcNyWyXh',
        'message': 'Missing or invalid input.',
        'errors': {
          'thread': {
            'messages': [
              'Thread parameter is required to create an app in space.'
            ]
          }
        }
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name, data.space);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-141]should return error when input thread is none exist', () => {
      const data = {
        name: 'app 1',
        space: 1,
        thread: 1000,
      };
      const expectResult = {
        'code': 'OC_NO02',
        'id': 'xziiHV1MxONmI7V24CDT',
        'message': 'The thread (id: 1,000) could not be found, or no longer exists.'
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(520, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-142]should return error when input thread negative', () => {
      const data = {
        name: 'app 1',
        space: 1,
        thread: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'l8zYpwztUumSw49iXoCJ',
        'message': 'Missing or invalid input.',
        'errors': {
          'thread': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-143]should return error when do not specify app name in GUEST SPACE', () => {
      const expectResult = {
        'code': 'CB_VA01',
        'id': '0maHPzr1u2yaaWTzN3V3',
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
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
          expect(rqBody).toEqual({});
          return true;
        })
        .reply(400, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp();
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-144]should return error when input name more than 64 characters in GUEST SPACE', () => {
      const data = {
        name: generateCharacters(65),
        space: 1,
        thread: 1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'B9LRP7NB2O54glDQ9udo',
        'message': 'Missing or invalid input.',
        'errors': {
          'name': {
            'messages': [
              'Name must be between 1 and 64 characters.'
            ]
          }
        }
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-145]should return error when do not specify space in GUEST SPACE', () => {
      const data = {
        name: 'app 1',
        thread: 1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'rXpruV4jykINxfPfl5Zm',
        'message': 'Missing or invalid input.',
        'errors': {
          'space': {
            'messages': [
              'Space parameter is required to create an app in space.'
            ]
          }
        }
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name, undefined, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-146]should return error when input space is none exist in GUEST SPACE', () => {
      const data = {
        name: 'app 1',
        space: 9999999999,
        thread: 1
      };
      const expectResult = {
        'code': 'OC_NO01',
        'id': 'pxZWdKuhBvlmCCd5NRBe',
        'message': 'The space (id: 9,999,999,999) could not be found, or no longer exists.'
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-147]should return error when input space negative in GUEST SPACE', () => {
      const data = {
        name: 'app 1',
        space: -1,
        thread: 1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': '2MZHL3ZTAnDnKdGVAMoQ',
        'message': 'Missing or invalid input.',
        'errors': {
          'space': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-148]should return error when do not specify thread in GUEST SPACE', () => {
      const data = {
        name: 'app 1',
        space: 1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'svFkhaxlNo9nAcNyWyXh',
        'message': 'Missing or invalid input.',
        'errors': {
          'thread': {
            'messages': [
              'Thread parameter is required to create an app in space.'
            ]
          }
        }
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name, data.space);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-149]should return error when input thread is none exist in GUEST SPACE', () => {
      const data = {
        name: 'app 1',
        space: 1,
        thread: 1000
      };
      const expectResult = {
        'code': 'OC_NO02',
        'id': 'xziiHV1MxONmI7V24CDT',
        'message': 'The thread (id: 1,000) could not be found, or no longer exists.'
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(520, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-150]should return error when input thread negative in GUEST SPACE', () => {
      const data = {
        name: 'app 1',
        space: 1,
        thread: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'l8zYpwztUumSw49iXoCJ',
        'message': 'Missing or invalid input.',
        'errors': {
          'thread': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(400, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-151]should return error permission deny ', () => {
      const data = {
        name: 'app 1',
        space: 1,
        thread: 1
      };
      const expectResult = {
        'code': 'CB_NO02',
        'id': 'BTV4Yuc7VnVb7eoce0N6',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .post(APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(403, expectResult);
      const addPreviewAppResult = appModule.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[App-152]should return error permission deny in GUEST SPACE', () => {
      const data = {
        name: 'app 1',
        space: 1,
        thread: 1
      };
      const expectResult = {
        'code': 'CB_NO02',
        'id': 'BTV4Yuc7VnVb7eoce0N6',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .post(GUEST_APP_PREVIEW_ROUTE, (rqBody) => {
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
        .reply(403, expectResult);
      const addPreviewAppResult = appModuleGuestSpace.addPreviewApp(data.name, data.space, data.thread);
      return addPreviewAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
