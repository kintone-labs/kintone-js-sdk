/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');
const common = require('../../utils/common');
const {Connection, Auth, App} = require(common.MAIN_PATH);

const auth = new Auth().setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const appModule = new App(conn);

const URI = 'https://' + common.DOMAIN;
const ROUTE = '/k/v1/apps.json';
const GUEST_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/apps.json`;

const connGuestSpace = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const appModuleGuestSpace = new App(connGuestSpace);

describe('[TestSuite] getAppsByIDs', () => {
  describe('Common functions', () => {
    it('should return promise', () => {
      const ids = [1];
      nock(URI)
        .get(ROUTE + `?ids[0]=${ids[0]}`)
        .reply(200, {});

      const actualResult = appModule.getAppsByIDs(ids);
      expect(actualResult).toHaveProperty('then');
      expect(actualResult).toHaveProperty('catch');
    });
  });

  describe('Success cases', () => {
    it('[App-22] should return the app information based on the list of id (without limit, offset)', () => {
      const appIds = [1];
      const expectedResult = {
        apps: [
          {
            appId: '1',
            code: 'task',
            name: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              name: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              name: 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(ROUTE + `?ids[0]=${appIds[0]}`)
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, expectedResult);
      const actualResult = appModule.getAppsByIDs(appIds);
      return actualResult.then(rsp => {
        expect(rsp).toMatchObject(expectedResult);
      });
    });

    it('[App-23-31] should return the app information based on the list of ids and the limit', () => {
      const expectedResult = {
        apps: [
          {
            appId: '1',
            code: 'task',
            name: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              name: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              name: 'user1'
            }
          },
          {
            appId: '2',
            code: 'task',
            name: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              name: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              name: 'user1'
            }
          }
        ]
      };
      const limit = 2;
      const appIDs = [1, 2, 3, 4, 5];
      nock(URI)
        .get(
          ROUTE +
          `?limit=${limit}&ids[0]=${appIDs[0]}&ids[1]=${appIDs[1]}&ids[2]=${
            appIDs[2]
          }&ids[3]=${appIDs[3]}&ids[4]=${appIDs[4]}`
        )
        .reply(200, expectedResult);

      const actualResult = appModule.getAppsByIDs(appIDs, undefined, limit);
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[App-24-30] should return the app information based on the list of ids and the offset', () => {
      const expectedResult = {
        apps: [
          {
            appId: '1',
            code: 'task',
            name: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              name: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              name: 'user1'
            }
          },
          {
            appId: '3',
            code: 'task',
            name: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              name: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              name: 'user1'
            }
          }
        ]
      };
      const offset = 2;
      const appIDs = [1, 2, 3];
      nock(URI)
        .get(
          ROUTE +
          `?offset=${offset}&ids[0]=${appIDs[0]}&ids[1]=${
            appIDs[1]
          }&ids[2]=${appIDs[2]}`
        )
        .reply(200, expectedResult);

      const actualResult = appModule.getAppsByIDs(appIDs, offset, undefined);
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[App-26] Verify the app information of guest space is returned', () => {
      const appIds = [1];
      const expectedResult = {
        apps: [
          {
            appId: '1',
            code: 'task',
            name: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              name: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              name: 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(GUEST_ROUTE + `?ids[0]=${appIds[0]}`)
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, expectedResult);
      const actualResult = appModuleGuestSpace.getAppsByIDs(appIds);
      return actualResult.then(rsp => {
        expect(rsp).toMatchObject(expectedResult);
      });
    });

    it('[App-25] should get maximum 100 apps for the limit value', () => {
      const limit = 100;
      const appIDs = [1, 2, 3, 4, 5];
      const expectedResult = {
        apps: [
          {
            appId: '1',
            code: 'task',
            name: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              name: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              name: 'user1'
            }
          },
          {
            appId: '2',
            code: 'task',
            name: 'My Test App',
            description: 'Testing this app',
            spaceId: null,
            threadId: null,
            createdAt: '2014-06-02T05:14:05.000Z',
            creator: {
              code: 'user1',
              name: 'user1'
            },
            modifiedAt: '2014-06-02T05:14:05.000Z',
            modifier: {
              code: 'user1',
              name: 'user1'
            }
          }
        ]
      };
      nock(URI)
        .get(
          ROUTE +
          `?limit=${limit}&ids[0]=${appIDs[0]}&ids[1]=${appIDs[1]}&ids[2]=${appIDs[2]}&ids[3]=${appIDs[3]}&ids[4]=${appIDs[4]}`
        )
        .reply(200, expectedResult);
      const actualResult = appModule.getAppsByIDs(appIDs, undefined, limit);
      return actualResult.then((rsp) => {
        expect(rsp).toEqual(expectedResult);
      });
    });
  });

  describe('error case', () => {
    it('[App-21] should return error when using API token authentication ', () => {
      const expectedResult = {
        code: 'GAIA_NO01',
        id: 'lzQPJ1hkW3Aj4iVebWCG',
        message: 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(ROUTE + `?ids[0]=1`)
        .reply(403, expectedResult);
      const getAppsResult = appModule.getAppsByIDs([1]);
      return getAppsResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
    it('[App-27] should return an error when the param limit has value of 0', () => {
      const appIDs = [1, 2, 3];
      const limit = 0;
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
        .get(
          ROUTE +
          `?limit=${limit}&ids[0]=${appIDs[0]}&ids[1]=${appIDs[1]}&ids[2]=${
            appIDs[2]
          }`
        )
        .reply(400, expectedResult);

      const actualResult = appModule.getAppsByIDs(appIDs, undefined, limit);
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-28] should return an error when the param limit has value greater than 100', () => {
      const limit = 101;
      const appIDs = [1, 2, 3];
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
        .get(
          ROUTE +
          `?limit=${limit}&ids[0]=${appIDs[0]}&ids[1]=${appIDs[1]}&ids[2]=${
            appIDs[2]
          }`
        )
        .reply(400, expectedResult);

      const actualResult = appModule.getAppsByIDs(appIDs, undefined, limit);
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-29] should return an error when the param offset has value less than 0', () => {
      const offset = -1;
      const appIDs = [1, 2, 3];
      const expectedResult = {
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
        .get(
          ROUTE +
          `?offset=${offset}&ids[0]=${appIDs[0]}&ids[1]=${appIDs[1]}&ids[2]=${
            appIDs[2]
          }`
        )
        .reply(400, expectedResult);

      const actualResult = appModule.getAppsByIDs(appIDs, offset, undefined);
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-32] should return an error when the param offset has value greater than max value 2147483647', () => {
      const appIDs = [1, 2, 3];
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
        .get(
          ROUTE +
          `?offset=${common.MAX_VALUE + 1}&ids[0]=${appIDs[0]}&ids[1]=${
            appIDs[1]
          }&ids[2]=${appIDs[2]}`
        )
        .reply(400, expectedResult);

      const actualResult = appModule.getAppsByIDs(
        appIDs,
        common.MAX_VALUE + 1,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-33] should return an error when the param limit has value greater than max value 2147483647', () => {
      const appIDs = [1, 2, 3];
      const expectedResult = {};
      nock(URI)
        .get(
          ROUTE +
          `?limit=${common.MAX_VALUE + 1}&ids[0]=${appIDs[0]}&ids[1]=${
            appIDs[1]
          }&ids[2]=${appIDs[2]}`
        )
        .reply(400, expectedResult);

      const actualResult = appModule.getAppsByIDs(
        appIDs,
        undefined,
        common.MAX_VALUE + 1
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
  });
});
