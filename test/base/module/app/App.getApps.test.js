import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APPS_API_ROUTE = '/k/v1/apps.json';

describe('Checking App.getApps', () => {
  it('should return the apps information based on the limit', () => {
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
      .get(APPS_API_ROUTE)
      .query({limit, offset})
      .matchHeader('X-Cybozu-Authorization', (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const getAppsResult = appModule.getApps({offset, limit});
    return getAppsResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('should return the app information based on the app code (without limit, offset)', () => {
    const expectResult = {
      apps: [
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
      .get('/k/v1/apps.json')
      .query({codes: ['test']})
      .matchHeader('X-Cybozu-Authorization', (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const getAppsResult = appModule.getAppsByCodes({codes: ['test']});
    return getAppsResult.then((rsp) => {
      expect(rsp).toEqual(expectResult);
    });
  });

  it('should return the app information based on the app APP_NAME (without limit, offset)', () => {
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
      .get(APPS_API_ROUTE)
      .query({name: 'test'})
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const getAppsResult = appModule.getAppsByName({name: 'test'});
    return getAppsResult.then((rsp) => {
      expect(rsp).toEqual(expectResult);
    });
  });

  it('should return the app information based on the list of id (without limit, offset)', () => {
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
      .get(APPS_API_ROUTE)
      .query({ids: [appIds[0]]})
      .matchHeader(PASSWORD_AURH_HEADER, authHeader => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectedResult);

    const appModule = createAppToSendRequest();
    const actualResult = appModule.getAppsByIDs({ids: appIds});
    return actualResult.then(rsp => {
      expect(rsp).toMatchObject(expectedResult);
    });
  });

  it('should return the app information based on the list of space ID (without limit, offset)', () => {
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
      .get(APPS_API_ROUTE)
      .query({spaceIds: [spaceIds[0]]})
      .matchHeader(PASSWORD_AURH_HEADER, authHeader => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const actualResult = appModule.getAppsBySpaceIDs({spaceIds});
    return actualResult.then(rsp => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('verify call getApps function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_IL02',
      'id': 'fY0nuklF16LsztA9FfM0',
      'message': 'Illegal request.'
    };
    nock(URI)
      .get(APPS_API_ROUTE)
      .matchHeader(PASSWORD_AURH_HEADER, authHeader => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(520, expectResult);

    return appModule.getApps()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });

  it('verify call getAppsByCodes function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_IL02',
      'id': 'fY0nuklF16LsztA9FfM0',
      'message': 'Illegal request.'
    };
    nock(URI)
      .get(APPS_API_ROUTE)
      .matchHeader(PASSWORD_AURH_HEADER, authHeader => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(520, expectResult);

    return appModule.getAppsByCodes()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });

  it('verify call getAppsByName function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_IL02',
      'id': 'fY0nuklF16LsztA9FfM0',
      'message': 'Illegal request.'
    };
    nock(URI)
      .get(APPS_API_ROUTE)
      .matchHeader(PASSWORD_AURH_HEADER, authHeader => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(520, expectResult);

    return appModule.getAppsByName()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });

  it('verify call getAppsByIDs function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_IL02',
      'id': 'fY0nuklF16LsztA9FfM0',
      'message': 'Illegal request.'
    };
    nock(URI)
      .get(APPS_API_ROUTE)
      .matchHeader(PASSWORD_AURH_HEADER, authHeader => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(520, expectResult);
    return appModule.getAppsByIDs()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });

  it('verify call getAppsBySpaceIDs function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_IL02',
      'id': 'fY0nuklF16LsztA9FfM0',
      'message': 'Illegal request.'
    };
    nock(URI)
      .get(APPS_API_ROUTE)
      .matchHeader(PASSWORD_AURH_HEADER, authHeader => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(520, expectResult);
    return appModule.getAppsBySpaceIDs()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });
});