
/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');

const common = require('../../utils/common');

const {Connection, Auth, App, KintoneAPIException} = require(common.MAIN_PATH);
const APP_VIEW_ROUTE = '/k/v1/preview/app/views.json';
const APP_VIEW_GUEST_SPACE_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/preview/app/views.json`;

const URI = 'https://' + common.DOMAIN;

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

const appModule = new App(conn);

const connGuest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const guestViewModule = new App(connGuest);

const authToken = new Auth();
authToken.setApiToken(common.API_TOKEN);
const connUsingToken = new Connection(common.DOMAIN, authToken);
const appUsingToken = new App(connUsingToken);

describe('updateViews function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock(URI)
        .put(`${APP_VIEW_ROUTE}`)
        .reply(200, {});

      const updateViewsResult = appModule.updateViews();
      expect(updateViewsResult).toHaveProperty('then');
      expect(updateViewsResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[View-17] Valid request - should update successfully the app views', () => {
      const data = {
        'app': 1,
        'views': {
          'My List View': {
            'index': 0,
            'type': 'LIST',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        }
      };

      const expectResult = {
        'views': {
          'My List View': {
            'id': '5520254'
          }
        },
        'revision': '2'
      };
      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, data.views);
      return updateViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-29] Valid request - Revision -1', () => {
      const data = {
        'app': 1,
        'views': {
          'My List View': {
            'index': 0,
            'type': 'LIST',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: -1
      };

      const expectResult = {
        'views': {
          'My List View': {
            'id': '5520254'
          }
        },
        'revision': '2'
      };
      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, data.views, data.revision);
      return updateViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-18] The method still work correctly when executing with interger as string type', () => {
      const data = {
        'app': '1',
        'views': {
          'My List View': {
            'index': 0,
            'type': 'LIST',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: -1
      };

      const expectResult = {
        'views': {
          'My List View': {
            'id': '5520254'
          }
        },
        'revision': '2'
      };
      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, data.views, data.revision);
      return updateViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-19] Verify using this method with guest space successfully', () => {
      const data = {
        'app': '1',
        'views': {
          'My List View': {
            'index': 0,
            'type': 'LIST',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: -1
      };

      const expectResult = {
        'views': {
          'My List View': {
            'id': '5520254'
          }
        },
        'revision': '2'
      };
      nock(URI)
        .put(`${APP_VIEW_GUEST_SPACE_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, expectResult);
      const updateViewsResult = guestViewModule.updateViews(data.app, data.views, data.revision);
      return updateViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[View-16] Error happens when running the command with API token', () => {
      const appID = 1;
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'lzQPJ1hkW3Aj4iVebWCG',
        'message': 'Using this API token, you cannot run the specified API.'
      };

      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody.app).toEqual(appID);
          return true;
        })
        .reply(520, expectResult);
      const updateViewsResult = appUsingToken.updateViews(appID);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-25] should return error when the appID is unexist', () => {
      const appID = '444444';
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'K45k0CEPV5802MKyPcu1',
        'message': 'The app (ID: 444444) not found. The app may have been deleted.'
      };

      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody.app).toEqual(appID);
          return true;
        })
        .reply(404, expectResult);
      const updateViewsResult = appModule.updateViews(appID);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-20] should return error when using method without app ID', () => {
      const data = {
        'views': {
          'My List View': {
            'index': 0,
            'type': 'LIST',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'SymrRydtYovWQRSM2YVo',
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
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);
      const updateViewsResult = appModule.updateViews(undefined, data.views, data.revision);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-21] should return error when using without views', () => {
      const data = {
        'app': 1,
        revision: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': '3X2AtZvR92GpXdN4bRSC',
        'message': 'Missing or invalid input.',
        'errors': {
          'views': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };

      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, undefined, data.revision);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-22] The error will be displayed when using without views index', () => {
      const data = {
        'app': 1,
        'views': {
          'My List View': {
            'type': 'LIST',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'qkKkSv7NxmiZousHNFWP',
        'message': 'Missing or invalid input.',
        'errors': {
          'views[My List View].index': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };

      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, data.views, data.revision);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-23] The error will be displayed when using without views type', () => {
      const data = {
        'app': 1,
        'views': {
          'My List View': {
            'index': 0,
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'modRH1Jbwil0FVG9apjA',
        'message': 'Missing or invalid input.',
        'errors': {
          'views[My List View].type': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };

      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, data.views, data.revision);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-24] The error will be displayed when input view name unexisted', () => {
      const data = {
        'app': 1,
        'views': {
          'Unexist_View': {
            'index': 0,
            'type': 'LIST',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: -1
      };
      const expectResult = {
        'code': 'GAIA_IN01',
        'id': '6J4fimXOSy52ktvtQ4aB',
        'message': 'Failed to update view. Key Unexist_View does not match the value of My List View in the name parameter.'
      };

      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, data.views, data.revision);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-26] Verify error is displayed when input invalid revision', () => {
      const data = {
        'app': 1,
        'views': {
          'My List View': {
            'index': 0,
            'type': 'LIST',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: 'abc'
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'wUGDGKjFJt1EsdUyU2Zl',
        'message': 'Missing or invalid input.',
        'errors': {
          'revision': {
            'messages': [
              'Enter an integer value.'
            ]
          }
        }
      };

      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, data.views, data.revision);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-27] The error will be displayed when using invalid View type', () => {
      const data = {
        'app': 1,
        'views': {
          'My List View': {
            'index': 0,
            'type': 'ERROR',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'WMVdR2fQXDkANG7fTn5A',
        'message': 'Missing or invalid input.',
        'errors': {
          'views[My List View].type': {
            'messages': [
              'must be one of the enum value'
            ]
          }
        }
      };

      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, data.views, data.revision);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-28] The error will be displayed when using invalid View index', () => {
      const data = {
        'app': 1,
        'views': {
          'My List View': {
            'index': 'abc',
            'type': 'CALENDAR',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'fRU7IE78RnIXPCMCsVix',
        'message': 'Missing or invalid input.',
        'errors': {
          'views[My List View].index': {
            'messages': [
              'Enter an integer value.'
            ]
          }
        }
      };

      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, data.views, data.revision);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-30] Error will be displayed when using this method with user who does not have Permission to manage the App', () => {
      const data = {
        'app': 1,
        'views': {
          'My List View': {
            'index': 0,
            'type': 'LIST',
            'name': 'My List View',
            'fields': [
              'Record_number',
              'Text_single_line'
            ],
            'filterCond': 'Updated_datetime > LAST_WEEK()',
            'sort': 'Record_number asc'
          }
        },
        revision: -1
      };
      const expectResult = {
        'code': 'CB_NO02',
        'id': 'znxMA8JNWGXAtWvC5HEc',
        'message': 'No privilege to proceed.'
      };

      nock(URI)
        .put(`${APP_VIEW_ROUTE}`, (rqBody) => {
          expect(rqBody).toEqual(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(400, expectResult);
      const updateViewsResult = appModule.updateViews(data.app, data.views, data.revision);
      return updateViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
