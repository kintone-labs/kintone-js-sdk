
/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');

const common = require('../../utils/common');

const {Connection, Auth, App, KintoneAPIException} = require(common.MAIN_PATH);
const APP_VIEW_ROUTE = '/k/v1/app/views.json';
const APP_VIEW_GUEST_SPACE_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/app/views.json`;
const APP_VIEW_PREVIEW_ROUTE = '/k/v1/preview/app/views.json';

const URI = 'https://' + common.DOMAIN;

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

const appModule = new App(conn);

const connGuest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const guestViewModule = new App(connGuest);

const authToken = new Auth();
authToken.setApiToken('a2386gf84gd663a12s32s');
const connUsingToken = new Connection(common.DOMAIN, authToken);
const appUsingToken = new App(connUsingToken);

describe('getViews function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=1`)
        .reply(200, {});

      const getViewsResult = appModule.getViews(1);
      expect(getViewsResult).toHaveProperty('then');
      expect(getViewsResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[View-3] Valid request', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const isPreview = true;

      const expectResult = {
        'views': {
          'View1': {
            'type': 'LIST',
            'name': 'View1',
            'id': '20733',
            'filterCond': 'Date_2 > LAST_WEEK()',
            'sort': 'Record_number asc',
            'index': '1',
            'fields': ['Record_number', 'Author']
          }
        }
      };
      nock(URI)
        .get(`${APP_VIEW_PREVIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-4] Verify the list of views of an live App without pre-live settings are returned', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };

      const expectResult = {
        'views': {
          'View1': {
            'type': 'LIST',
            'name': 'View1',
            'id': '20733',
            'filterCond': 'Date_2 > LAST_WEEK()',
            'sort': 'Record_number asc',
            'index': '1',
            'fields': ['Record_number', 'Author']
          }
        },
        'revision': '3'
      };
      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang);
      return getViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-7] Verify the app views with a pre-live settings is returned when setting isPreview true', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const isPreview = true;

      const expectResult = {
        'views': {
          'View1': {
            'type': 'LIST',
            'name': 'View1',
            'id': '20733',
            'filterCond': 'Date_2 > LAST_WEEK()',
            'sort': 'Record_number asc',
            'index': '1',
            'fields': ['Record_number', 'Author']
          }
        },
        'revision': '3'
      };
      nock(URI)
        .get(`${APP_VIEW_PREVIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-8] Verify the app views with a pre-live settings is not returned when setting isPreview false', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const isPreview = false;

      const expectResult = {
        'views': {
          'View1': {
            'type': 'LIST',
            'name': 'View1',
            'id': '20733',
            'filterCond': 'Date_2 > LAST_WEEK()',
            'sort': 'Record_number asc',
            'index': '1',
            'fields': ['Record_number', 'Author']
          }
        },
        'revision': '3'
      };
      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-12] The method still work correctly when executing with interger as string type', () => {
      const data = {
        'app': '1',
        'lang': 'en'
      };
      const isPreview = false;

      const expectResult = {
        'views': {
          'View1': {
            'type': 'LIST',
            'name': 'View1',
            'id': '20733',
            'filterCond': 'Date_2 > LAST_WEEK()',
            'sort': 'Record_number asc',
            'index': '1',
            'fields': ['Record_number', 'Author']
          }
        },
        'revision': '3'
      };
      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-5] localized language - JA', () => {
      const data = {
        'app': '1',
        'lang': 'ja'
      };
      const isPreview = false;

      const expectResult = {
        'views': {
          'My List View': {
            'type': 'CALENDAR',
            'name': '私のリストビュー',
            'id': '5520267',
            'filterCond': '',
            'sort': 'Record_number asc',
            'index': '1',
            'fields': ['Record_number', 'Author']
          }
        },
        'revision': '3'
      };
      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-5] localized language - EN', () => {
      const data = {
        'app': '1',
        'lang': 'en'
      };
      const isPreview = false;

      const expectResult = {
        'views': {
          'My List View': {
            'type': 'CALENDAR',
            'name': 'New Name',
            'id': '5520267',
            'filterCond': '',
            'sort': 'Record_number asc',
            'index': '1',
            'fields': ['Record_number', 'Author']
          }
        },
        'revision': '3'
      };
      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-5] localized language - ZH', () => {
      const data = {
        'app': '1',
        'lang': 'zh'
      };
      const isPreview = false;

      const expectResult = {
        'views': {
          '一覧1': {
            'type': 'LIST',
            'name': '一覧1',
            'id': '5393788',
            'filterCond': '',
            'sort': 'レコード番号 desc',
            'index': '1',
            'fields': ['Record_number', 'Author']
          }
        },
        'revision': '3'
      };
      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-5] localized language - USER BROWSER LANGUAGE', () => {
      const data = {
        'app': '1',
        'lang': 'user'
      };
      const isPreview = false;

      const expectResult = {
        'views': {
          'My List View': {
            'type': 'CALENDAR',
            'name': 'New Name',
            'id': '5520267',
            'filterCond': '',
            'sort': 'Record_number asc',
            'index': '1',
            'fields': ['Record_number', 'Author']
          }
        },
        'revision': '3'
      };
      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[View-13] Verify using this method with guest space successfully', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const isPreview = false;

      const expectResult = {
        'views': {
          'View1': {
            'type': 'LIST',
            'name': 'View1',
            'id': '20733',
            'filterCond': 'Date_2 > LAST_WEEK()',
            'sort': 'Record_number asc',
            'index': '1',
            'fields': ['Record_number', 'Author']
          }
        }
      };
      nock(URI)
        .get(`${APP_VIEW_GUEST_SPACE_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getViewsResult = guestViewModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[View-2] should return error when using API token authentication ', () => {
      const data = {
        'app': 1,
        'lang': 'EN'
      };
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'lzQPJ1hkW3Aj4iVebWCG',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${data.app}`)
        .reply(520, expectResult);
      const addFormFieldsResult = appUsingToken.getViews(data.app);
      return addFormFieldsResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-9] Invalid request - should return error when the appID is unexist', () => {
      const appID = '444444';
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'K45k0CEPV5802MKyPcu1',
        'message': 'The app (ID: 444444) not found. The app may have been deleted.'
      };

      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${appID}`)
        .reply(404, expectResult);
      const getViewsResult = appModule.getViews(appID);
      return getViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-10] The error will be displayed when using method without app ID', () => {
      const data = {
        'lang': 'en'
      };
      const isPreview = false;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'jtAmebldtGKc5ZR3RSx6',
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
        .get(`${APP_VIEW_ROUTE}?lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectResult);
      const getViewsResult = appModule.getViews(undefined, data.lang, isPreview);
      return getViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-11] The error will be displayed when input invalid language', () => {
      const data = {
        'app': 1,
        'lang': 'error'
      };
      const isPreview = false;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'EBwYU4Qof2OeUBzXMG9a',
        'message': 'Missing or invalid input.',
        'errors': {
          'lang': {
            'messages': [
              'must be one of the enum value'
            ]
          }
        }
      };

      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-14] Error will be displayed when using this method with live app with user who does not have Permission to view Records', () => {
      const data = {
        'app': 1,
        'lang': 'error'
      };
      const isPreview = false;
      const expectResult = {
        'code': 'CB_NO02',
        'id': 'znxMA8JNWGXAtWvC5HEc',
        'message': 'No privilege to proceed.'
      };

      nock(URI)
        .get(`${APP_VIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[View-15] Error will be displayed when using this method with pre-live settings with user not have App Management Permissions', () => {
      const data = {
        'app': 1,
        'lang': 'error'
      };
      const isPreview = true;
      const expectResult = {
        'code': 'CB_NO02',
        'id': 'znxMA8JNWGXAtWvC5HEc',
        'message': 'No privilege to proceed.'
      };

      nock(URI)
        .get(`${APP_VIEW_PREVIEW_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectResult);
      const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
      return getViewsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
