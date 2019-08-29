
/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');
const common = require('../../../utils/common');
const {API_ROUTE, URI} = require('../../../utils/constant');
const {KintoneAPIException, Connection, Auth, App} = require(common.MAIN_PATH_BASE);
const auth = new Auth().setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});

const conn = new Connection({domain: common.DOMAIN, auth: auth});
const appModule = new App({connection: conn});

describe('getApps function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock(URI)
        .get(API_ROUTE.APPS + '?offset=1&limit=10')
        .reply(200, {});

      const getAppResult = appModule.getApps({offset: 1, limit: 10});
      expect(getAppResult).toHaveProperty('then');
      expect(getAppResult).toHaveProperty('catch');
    });
  });
  describe('success case', () => {
    it('[App-8] - should return the app information based on the limit', () => {
      const limit = 3;
      const offset = 1;
      const expectResult = {
        'apps': [
          {
            'appId': '5',
            'code': '',
            'name': 'Calendar Application',
            'description': '',
            'createdAt': '2018-05-30T04:04:25.000Z',
            'creator': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'modifiedAt': '2018-07-31T10:49:49.000Z',
            'modifier': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'spaceId': '1',
            'threadId': '1'
          },
          {
            'appId': '6',
            'code': '',
            'name': 'Calendar uses Start-End Date - Time',
            'description': '',
            'createdAt': '2018-05-30T06:24:35.000Z',
            'creator': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'modifiedAt': '2018-08-01T12:23:15.000Z',
            'modifier': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'spaceId': '1',
            'threadId': '1'
          },
          {
            'appId': '7',
            'code': '',
            'name': 'New App',
            'description': '',
            'createdAt': '2018-06-04T09:44:59.000Z',
            'creator': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'modifiedAt': '2018-06-06T08:00:07.000Z',
            'modifier': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'spaceId': null,
            'threadId': null
          }
        ]
      };
      nock(URI)
        .get(API_ROUTE.APPS)
        .query({limit, offset})
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });

    it('[App-9] - should return the app information based on the offset', () => {
      const limit = 1;
      const offset = 3;
      const expectResult = {
        'apps': [
          {
            'appId': '5',
            'code': '',
            'name': 'Calendar Application',
            'description': '',
            'createdAt': '2018-05-30T04:04:25.000Z',
            'creator': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'modifiedAt': '2018-07-31T10:49:49.000Z',
            'modifier': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'spaceId': '1',
            'threadId': '1'
          },
          {
            'appId': '6',
            'code': '',
            'name': 'Calendar uses Start-End Date - Time',
            'description': '',
            'createdAt': '2018-05-30T06:24:35.000Z',
            'creator': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'modifiedAt': '2018-08-01T12:23:15.000Z',
            'modifier': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'spaceId': '1',
            'threadId': '1'
          },
          {
            'appId': '7',
            'code': '',
            'name': 'New App',
            'description': '',
            'createdAt': '2018-06-04T09:44:59.000Z',
            'creator': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'modifiedAt': '2018-06-06T08:00:07.000Z',
            'modifier': {
              'code': 'cybozu',
              'name': 'cybozu'
            },
            'spaceId': null,
            'threadId': null
          }
        ]
      };
      nock(URI)
        .get(API_ROUTE.APPS + `?offset=${offset}&limit=${limit}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });

    it('[App-10] should get maximum 100 apps for the limit value', () => {
      const limit = 100;
      const offset = 1;
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
        .get(API_ROUTE.APPS + `?offset=${offset}&limit=${limit}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.then((rsp) => {
        expect(rsp).toEqual(expectResult);
      });
    });


    /**
   * Guest space app
   */
    it('[App-12] - should return the app information of guest space', () => {
      const limit = 3;
      const offset = 1;
      const connGuest = new Connection({domain: common.DOMAIN, auth, guestSpaceID: common.GUEST_SPACEID});
      const appModuleGuest = new App({connection: connGuest});
      const expectResult = {
        'apps': [
          {
            'appId': '1',
            'code': 'task',
            'name': 'My Test App',
            'description': 'Testing this app',
            'spaceId': null,
            'threadId': null,
            'createdAt': '2014-06-02T05:14:05.000Z',
            'creator': {
              'code': 'user1',
              'name': 'user1'
            },
            'modifiedAt': '2014-06-02T05:14:05.000Z',
            'modifier': {
              'code': 'user1',
              'name': 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(`/k/guest/1/v1/apps.json?offset=${offset}&limit=${limit}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = appModuleGuest.getApps({offset, limit});
      return getAppsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    /**
     * Verify when not specifying the limit, the default limit value is 100
     */
    it('[App-16] - should return the app information when not specifying the limit, the default limit value is 100', () => {
      const limit = null;
      const offset = 0;
      const expectResult = {
        'apps': [
          {
            'appId': '1',
            'code': 'task',
            'name': 'My Test App',
            'description': 'Testing this app',
            'spaceId': null,
            'threadId': null,
            'createdAt': '2014-06-02T05:14:05.000Z',
            'creator': {
              'code': 'user1',
              'name': 'user1'
            },
            'modifiedAt': '2014-06-02T05:14:05.000Z',
            'modifier': {
              'code': 'user1',
              'name': 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(API_ROUTE.APPS + `?offset=${offset}&limit=${limit}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    /**
    * Verify when not specifying the offset, the default offset value is 0
    */
    it('[App-17] - should return the app information when not specifying the offset, the default offset value is 100', () => {
      const limit = 10;
      const offset = null;
      const expectResult = {
        'apps': [
          {
            'appId': '1',
            'code': 'task',
            'name': 'My Test App',
            'description': 'Testing this app',
            'spaceId': null,
            'threadId': null,
            'createdAt': '2014-06-02T05:14:05.000Z',
            'creator': {
              'code': 'user1',
              'name': 'user1'
            },
            'modifiedAt': '2014-06-02T05:14:05.000Z',
            'modifier': {
              'code': 'user1',
              'name': 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(API_ROUTE.APPS + `?offset=${offset}&limit=${limit}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[App-7] - should return error when using API token authentication ', () => {
      const limit = 1;
      const offset = 1;
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'lzQPJ1hkW3Aj4iVebWCG',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(API_ROUTE.APPS + `?offset=${offset}&limit=${limit}`)
        .reply(403, expectResult);
      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    /**
    * Verify the error will be displayed when input 0 to the limit
    */
    it('[App-13] - should return error when the param limit has value of 0', () => {
      const limit = 0;
      const offset = 0;
      const expectedResult = {
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
        .get(API_ROUTE.APPS + `?offset=${offset}&limit=${limit}`)
        .reply(400, expectedResult);

      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
     * Verify the error will be displayed when input number > 100 to the limit
     */
    it('[App-14] - should return error when the param limit has value greater than 100', () => {
      const limit = 1000;
      const offset = 0;
      const expectedResult = {
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
        .get(API_ROUTE.APPS + `?offset=${offset}&limit=${limit}`)
        .reply(400, expectedResult);

      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
     * Verify the error will be displayed when input < 0 to the offset
     */
    it('[App-15] - should return error when the param offset has value less than 0', () => {
      const limit = 10;
      const offset = -10;
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'KbFtnLZXgCHFO5wkyQc5',
        'message': 'Missing or invalid input.',
        'errors': {
          'offset': {
            'messages': [
              'must be greater than or equal to 0'
            ]
          }
        }
      };
      nock(URI)
        .get(API_ROUTE.APPS + `?offset=${offset}&limit=${limit}`)
        .reply(400, expectedResult);

      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
     * Verify the error will be displayed when input > 2147483647 to the offset
     */
    it('[App-18] - should return error when the param offset has value greater than max value 2147483647', () => {
      const limit = 10;
      const offset = 2147483648;
      const expectedResult = {
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
        .get(API_ROUTE.APPS + `?offset=${offset}&limit=${limit}`)
        .reply(400, expectedResult);

      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    /**
     * Verify the error will be displayed when input > 2147483647 to limit
     */
    it('[App-19] - should return error when the param limit has value greater than max value 2147483647', () => {
      const limit = 2147483648;
      const offset = 0;
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'WQinacgbUc170jxARGaR',
        'message': 'Missing or invalid input.',
        'errors': {
          'limit': {
            'messages': [
              'must be less than or equal to 100'
            ]
          }
        }
      };
      nock(URI)
        .get(API_ROUTE.APPS + `?offset=${offset}&limit=${limit}`)
        .reply(400, expectedResult);

      const getAppsResult = appModule.getApps({offset, limit});
      return getAppsResult.catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
  });
});