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
const connGuest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const appModuleGuest = new App(connGuest);

const URI = 'https://' + common.DOMAIN;
const ROUTE = '/k/v1/apps.json';
const ROUTE_GUEST = '/k/guest/1/v1/apps.json';

describe('[TestSuite] getAppsBySpaceIDs', () => {
  describe('Common functions', () => {
    it('should return promise', () => {
      const spaceIds = [1];
      nock(URI)
        .get(ROUTE + `?spaceIds[0]=${spaceIds[0]}`)
        .reply(200, {});

      const actuaResult = appModule.getAppsBySpaceIDs(spaceIds);
      expect(actuaResult).toHaveProperty('then');
      expect(actuaResult).toHaveProperty('catch');
    });
  });

  describe('Success cases', () => {
    it('[App-58] should return the app information based on the list of space ID (without limit, offset)', () => {
      const spaceIds = [1];
      const expectResult = {
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
        .get(ROUTE + `?spaceIds[0]=${spaceIds[0]}`)
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, expectResult);
      const actualResult = appModule.getAppsBySpaceIDs(spaceIds);
      return actualResult.then(rsp => {
        expect(rsp).toMatchObject(expectResult);
      });
    });

    it('[App-59] should return the app information based on the list of spaceIds and the limit', () => {
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
      const spaceIds = [1, 2];
      nock(URI)
        .get(
          ROUTE +
            `?limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }`
        )
        .reply(200, expectedResult);

      const actualResult = appModule.getAppsBySpaceIDs(
        spaceIds,
        undefined,
        limit
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[App-60] should return the app information based on the list of spaceIds and the offset', () => {
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
      const spaceIds = [1, 2, 3];
      nock(URI)
        .get(
          ROUTE +
            `?offset=${offset}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }&spaceIds[2]=${spaceIds[2]}`
        )
        .reply(200, expectedResult);

      const actualResult = appModule.getAppsBySpaceIDs(
        spaceIds,
        offset,
        undefined
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[App-61] should return the app information based on get maximum 100 apps for the limit value', () => {
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

      const limit = 100;
      const spaceIds = [1, 2];
      nock(URI)
        .get(
          ROUTE +
            `?limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }`
        )
        .reply(200, expectedResult);

      const actualResult = appModule.getAppsBySpaceIDs(
        spaceIds,
        undefined,
        limit
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[App-65] should return the app information when not specifying the limit', () => {
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

      const limit = null;
      const offset = 10;
      const spaceIds = [1, 2];
      nock(URI)
        .get(
          ROUTE +
            `?offset=${offset}&limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${spaceIds[1]}`
        )
        .reply(200, expectedResult);

      const actualResult = appModule.getAppsBySpaceIDs(
        spaceIds,
        offset,
        limit
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[App-66] should return the app information when not specifying the offset', () => {
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

      const limit = 10;
      const offset = null;
      const spaceIds = [1, 2];
      nock(URI)
        .get(
          ROUTE +
            `?offset=${offset}&limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${spaceIds[1]}`
        )
        .reply(200, expectedResult);

      const actualResult = appModule.getAppsBySpaceIDs(
        spaceIds,
        offset,
        limit
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[App-67] should return the app information in guest space', () => {
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

      const limit = 10;
      const offset = 10;
      const spaceIds = [1, 2];
      nock(URI)
        .get(
          ROUTE_GUEST +
            `?offset=${offset}&limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${spaceIds[1]}`
        )
        .reply(200, expectedResult);

      const actualResult = appModuleGuest.getAppsBySpaceIDs(
        spaceIds,
        offset,
        limit
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[App-68] should return maximum 100 apps in guest space', () => {
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

      const limit = 100;
      const offset = 10;
      const spaceIds = [1, 2];
      nock(URI)
        .get(
          ROUTE_GUEST +
            `?offset=${offset}&limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${spaceIds[1]}`
        )
        .reply(200, expectedResult);

      const actualResult = appModuleGuest.getAppsBySpaceIDs(
        spaceIds,
        offset,
        limit
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[App-72] should return the app information when not specifying the limit in guest space', () => {
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

      const limit = null;
      const offset = 10;
      const spaceIds = [1, 2];
      nock(URI)
        .get(
          ROUTE_GUEST +
            `?offset=${offset}&limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${spaceIds[1]}`
        )
        .reply(200, expectedResult);

      const actualResult = appModuleGuest.getAppsBySpaceIDs(
        spaceIds,
        offset,
        limit
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[App-73] should return the app information when not specifying the offset in guest space', () => {
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

      const limit = 10;
      const offset = null;
      const spaceIds = [1, 2];
      nock(URI)
        .get(
          ROUTE_GUEST +
            `?offset=${offset}&limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${spaceIds[1]}`
        )
        .reply(200, expectedResult);

      const actualResult = appModuleGuest.getAppsBySpaceIDs(
        spaceIds,
        offset,
        limit
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });
  });

  describe('error case', () => {
    it('[App-57] should return error when using API token authentication ', () => {
      const spaceIds = [1];
      const expectResult = {
        code: 'GAIA_NO01',
        id: 'lzQPJ1hkW3Aj4iVebWCG',
        message: 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(ROUTE + `?spaceIds[0]=${spaceIds[0]}`)
        .reply(403, expectResult);
      const actualResult = appModule.getAppsBySpaceIDs(spaceIds);
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[App-62] should return an error when the param limit has value of 0', () => {
      const spaceIds = [1, 2, 3];
      const limit = 0;
      const expectedResult = {
        code: 'CB_VA01',
        id: 'DtsFKYOmw2gfIUgOG0Wh',
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
            `?limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }&spaceIds[2]=${spaceIds[2]}`
        )
        .reply(400, expectedResult);

      const actualResult = appModule.getAppsBySpaceIDs(
        spaceIds,
        undefined,
        limit
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-63] should return an error when the param limit has value greater than 100', () => {
      const spaceIds = [1, 2, 3];
      const limit = 101;
      const expectedResult = {
        code: 'CB_VA01',
        id: 'H6bw2ZEUMUvP6fZSfCJL',
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
            `?limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }&spaceIds[2]=${spaceIds[2]}`
        )
        .reply(400, expectedResult);

      const actualResult = appModule.getAppsBySpaceIDs(
        spaceIds,
        undefined,
        limit
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-64] should return an error when the param offset has value less than 0', () => {
      const spaceIds = [1, 2, 3];
      const offset = -1;
      const expectedResult = {
        code: 'CB_VA01',
        id: 'v23TyuqDg6QpEYrU7JpX',
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
            `?offset=${offset}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }&spaceIds[2]=${spaceIds[2]}`
        )
        .reply(400, expectedResult);

      const actualResult = appModule.getAppsBySpaceIDs(
        spaceIds,
        offset,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-74] should return an error when the param offset has value greater than max value 2147483647', () => {
      const spaceIds = [1, 2, 3];
      const offset = common.MAX_VALUE + 1;
      const expectedResult = {
        code: 'CB_VA01',
        id: 'RWue1TbVHvtSYABtAg6V',
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
            `?offset=${offset}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }&spaceIds[2]=${spaceIds[2]}`
        )
        .reply(400, expectedResult);

      const actualResult = appModule.getAppsBySpaceIDs(
        spaceIds,
        offset,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-75] should return an error when the param limit has value greater than max value 2147483647', () => {
      const spaceIds = [1, 2, 3];
      const limit = common.MAX_VALUE + 1;
      const expectedResult = {
        code: 'CB_VA01',
        id: 'ASeFDvLefehJ5IKyLmBJ',
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
            `?limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }&spaceIds[2]=${spaceIds[2]}`
        )
        .reply(400, expectedResult);

      const actualResult = appModule.getAppsBySpaceIDs(
        spaceIds,
        undefined,
        limit
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-69] should return an error when the param offset has value less than 0 in guest space', () => {
      const spaceIds = [1, 2, 3];
      const offset = -1;
      const expectedResult = {
        code: 'CB_VA01',
        id: 'v23TyuqDg6QpEYrU7JpX',
        message: '入力内容が正しくありません。',
        errors: {
          offset: {
            messages: ['最小でも0以上です。']
          }
        }
      };
      nock(URI)
        .get(
          ROUTE_GUEST +
            `?offset=${offset}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }&spaceIds[2]=${spaceIds[2]}`
        )
        .reply(400, expectedResult);

      const actualResult = appModuleGuest.getAppsBySpaceIDs(
        spaceIds,
        offset,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-70] should return an error when the param offset has value greater than max value 2147483647 in guest space', () => {
      const spaceIds = [1, 2, 3];
      const offset = common.MAX_VALUE + 1;
      const expectedResult = {
        code: 'CB_VA01',
        id: 'RWue1TbVHvtSYABtAg6V',
        message: '入力内容が正しくありません。',
        errors: {
          offset: {
            messages: ['最大でも2,147,483,647以下です。']
          }
        }
      };
      nock(URI)
        .get(
          ROUTE_GUEST +
            `?offset=${offset}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }&spaceIds[2]=${spaceIds[2]}`
        )
        .reply(400, expectedResult);

      const actualResult = appModuleGuest.getAppsBySpaceIDs(
        spaceIds,
        offset,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[App-71] should return an error when the param limit has value greater than max value 2147483647 in guest space', () => {
      const spaceIds = [1, 2, 3];
      const limit = common.MAX_VALUE + 1;
      const expectedResult = {
        code: 'CB_VA01',
        id: 'ASeFDvLefehJ5IKyLmBJ',
        message: '入力内容が正しくありません。',
        errors: {
          limit: {
            messages: ['最大でも100以下です。']
          }
        }
      };
      nock(URI)
        .get(
          ROUTE_GUEST +
            `?limit=${limit}&spaceIds[0]=${spaceIds[0]}&spaceIds[1]=${
              spaceIds[1]
            }&spaceIds[2]=${spaceIds[2]}`
        )
        .reply(400, expectedResult);

      const actualResult = appModuleGuest.getAppsBySpaceIDs(
        spaceIds,
        undefined,
        limit
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
  });
});
