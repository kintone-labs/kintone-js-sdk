
/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');

const common = require('../../utils/common');

const {Connection, Auth, App, KintoneAPIException} = require(common.MAIN_PATH);
const APP_FORM_LAYOUT_GUEST_SPACE = `/k/guest/${common.GUEST_SPACEID}/v1/preview/app/form/layout.json`;
const APP_FORM_LAYOUT_PREVIEW = '/k/v1/preview/app/form/layout.json';

const URI = 'https://' + common.DOMAIN;
const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

const appModule = new App(conn);

const connGuest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const guestFormModule = new App(connGuest);

const authToken = new Auth();
authToken.setApiToken(common.API_TOKEN);
const connUsingToken = new Connection(common.DOMAIN, authToken);
const appUsingToken = new App(connUsingToken);

describe('updateFormLayout function', () => {
  describe('common function', () => {
    const app = 1;
    it('should return promise', () => {
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW)
        .reply(200, {});

      const getAppResult = appModule.updateFormLayout(app);
      expect(getAppResult).toHaveProperty('then');
      expect(getAppResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Form-64] Valid request - should return the app formfield base on full data', () => {
      const data = {
        app: 1,
        'layout': [
          {
            'type': 'ROW',
            'fields': [
              {
                'type': 'SINGLE_LINE_TEXT',
                'code': 'Text__single_line_',
                'size': {
                  'width': '200'
                }
              }
            ]

          }],
        revision: 1
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, data.layout, data.revision);
      return updateFormLayoutResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-65] Valid data - Without revision - Layout type is SUBTABLE', () => {
      const data = {
        app: 1,
        'layout': [
          {
            'type': 'SUBTABLE',
            'code': 'Table_1',
            'fields': [
              {
                'type': 'NUMBER',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, data.layout);
      return updateFormLayoutResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-66] Guest space - Layout type is GROUP', () => {
      const data = {
        app: 1,
        'layout': [
          {
            'type': 'GROUP',
            'code': 'Table_1',
            'fields': [
              {
                'type': 'NUMBER',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_GUEST_SPACE, (rqBody) => {
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
      const updateFormLayoutResult = guestFormModule.updateFormLayout(data.app, data.layout);
      return updateFormLayoutResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-67] Valid data - Ignore revision -1', () => {
      const data = {
        app: 1,
        'layout': [
          {
            'type': 'SUBTABLE',
            'code': 'Table_1',
            'fields': [
              {
                'type': 'NUMBER',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
        revision: -1,
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, data.layout, data.revision);
      return updateFormLayoutResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-68] Verify the app deploy status is still displayed when executing with ID as string type', () => {
      const data = {
        app: '1',
        'layout': [
          {
            'type': 'SUBTABLE',
            'code': 'Table_1',
            'fields': [
              {
                'type': 'NUMBER',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
        revision: -1,
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, data.layout, data.revision);
      return updateFormLayoutResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[Form-63] should return error when using API token authentication ', () => {
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'lzQPJ1hkW3Aj4iVebWCG',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW)
        .reply(520, expectResult);
      const updateFormLayoutResult = appUsingToken.updateFormLayout(10);
      return updateFormLayoutResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-69] Verify error will be displayed when using method without app ID', () => {
      const data = {
        'layout': [
          {
            'type': 'ROW',
            'code': 'Table_1',
            'fields': [
              {
                'type': 'NUMBER',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'XlKuXMLqfuuGTIu1sMMb',
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
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(undefined, data.layout, data.revision);
      return updateFormLayoutResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-70] Verify error will be displayed when using method without layout properties', () => {
      const data = {
        app: 1,
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': '6n4pZsaWBss1whZ7Er6e',
        'message': 'Missing or invalid input.',
        'errors': {
          'layout': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, undefined, data.revision);
      return updateFormLayoutResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-71] Verify error will be displayed when using invalid app ID', () => {
      const data = {
        app: 'abc',
        'layout': [
          {
            'type': 'ROW',
            'code': 'Table_1',
            'fields': [
              {
                'type': 'NUMBER',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'cr1NIhQ9s0pvH2njb06T',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'Enter an integer value.'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, data.layout, data.revision);
      return updateFormLayoutResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-72] Verify error will display when user input invalid layout type', () => {
      const data = {
        app: 1,
        'layout': [
          {
            'type': 'ERROR',
            'code': 'Table_1',
            'fields': [
              {
                'type': 'NUMBER',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'hWyBQFXg4R6npZcpoe9D',
        'message': 'Missing or invalid input.',
        'errors': {
          'layout[0].type': {
            'messages': [
              'must be one of the enum value'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, data.layout, data.revision);
      return updateFormLayoutResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-73] Verify error will display when user input invalid fields code', () => {
      const data = {
        app: 1,
        'layout': [
          {
            'type': 'ROW',
            'code': 'Table_100000',
            'fields': [
              {
                'type': 'NUMBER',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'bDmr1SKg9WleHV0YXfAS',
        'message': 'Missing or invalid input.',
        'errors': {
          'layout[0].fields[0].code': {
            'messages': [
              'Failed to update form. Field (code: Table_100000) is not found.'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, data.layout, data.revision);
      return updateFormLayoutResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-74] Verify error will display when user input invalid fields type', () => {
      const data = {
        app: 1,
        'layout': [
          {
            'type': 'ROW',
            'code': 'Table_1',
            'fields': [
              {
                'type': 'ERROR',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'yHGgueLTOwlwIgNsQyuY',
        'message': 'Missing or invalid input.',
        'errors': {
          'layout[0].fields[0].type': {
            'messages': [
              'must be one of the enum value'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, data.layout, data.revision);
      return updateFormLayoutResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-75] Verify error is displayed when input invalid revision', () => {
      const data = {
        app: 1,
        'layout': [
          {
            'type': 'ROW',
            'code': 'Table_100000',
            'fields': [
              {
                'type': 'NUMBER',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
        revision: 'abc',
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'oWb81zOypzdEVLCCRZc7',
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
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, data.layout, data.revision);
      return updateFormLayoutResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-76] Verify error will display when user does not have App Management Permissions', () => {
      const data = {
        app: 1,
        'layout': [
          {
            'type': 'ROW',
            'code': 'Table_100000',
            'fields': [
              {
                'type': 'NUMBER',
                'code': 'Number',
                'size': {
                  'width': '193'
                }
              }
            ]
          }],
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_NO02',
        'id': 'znxMA8JNWGXAtWvC5HEc',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .put(APP_FORM_LAYOUT_PREVIEW, (rqBody) => {
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

      const updateFormLayoutResult = appModule.updateFormLayout(data.app, data.layout, data.revision);
      return updateFormLayoutResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
