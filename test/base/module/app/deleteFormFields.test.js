
/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');

const common = require('../../utils/common');

const {Connection, Auth, App, KintoneAPIException} = require(common.MAIN_PATH);
const APP_FORM_FIELD_GUEST_SPACE_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/preview/app/form/fields.json`;
const APP_FORM_FIELD_PREVIEW_ROUTE = '/k/v1/preview/app/form/fields.json';

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

describe('deleteFormFields function', () => {
  describe('common function', () => {
    const app = 1;
    it('should return promise', () => {
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE')
        .reply(200, {});

      const getAppResult = appModule.deleteFormFields(app);
      expect(getAppResult).toHaveProperty('then');
      expect(getAppResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Form-40] Valid request - should update successfully the app form field', () => {
      const data = {
        'app': 1,
        'fields': [
          'Text__single_line_1',
          'Number'
        ],
        revision: 12
      };
      const expectResult = {
        'revision': '13'
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
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

      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, data.fields, data.revision);
      return deleteFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-41] Valid data - Without revision', () => {
      const data = {
        'app': 1,
        'fields': [
          'Text__single_line_1',
          'Number'
        ],
      };
      const expectResult = {
        'revision': '13'
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
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

      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, data.fields, undefined);
      return deleteFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-42] Valid data - Ignore revision -1', () => {
      const data = {
        'app': 1,
        'fields': [
          'Text__single_line_1',
          'Number'
        ],
        revision: -1,
      };
      const expectResult = {
        'revision': '13'
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
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

      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, data.fields, data.revision);
      return deleteFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-43] Verify delete form fields for app in guest space successfully', () => {
      const data = {
        'app': 1,
        'fields': [
          'Text__single_line_1',
          'Number'
        ],
        revision: -1,
      };
      const expectResult = {
        'revision': '13'
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_GUEST_SPACE_ROUTE}`, 'DELETE', (rqBody) => {
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

      const deleteFormFieldsResult = guestFormModule.deleteFormFields(data.app, data.fields, data.revision);
      return deleteFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-44] Verify the app deploy status is still displayed when executing with ID as string type', () => {
      const data = {
        'app': '1',
        'fields': [
          'Text__single_line_1',
          'Number'
        ],
        revision: -1,
      };
      const expectResult = {
        'revision': '13'
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
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

      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, data.fields, data.revision);
      return deleteFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-50] Verify fields will deleted successfully when items in array fields = 100', () => {
      const number = 100;
      const data = {
        'app': '1',
        'fields': 'Text__single_line_1',
        revision: -1,
      };
      const expectResult = {
        'revision': '13'
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.fields).toEqual(common.generateRecord(number, data.fields));
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
      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, common.generateRecord(number, data.fields), data.revision);
      return deleteFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[Form-39] Should return error when using API token authentication ', () => {
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'lzQPJ1hkW3Aj4iVebWCG',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE')
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN);
          return true;
        })
        .reply(520, expectResult);
      const deleteFormFieldsResult = appUsingToken.deleteFormFields(10);
      return deleteFormFieldsResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-45] Verify error will be displayed when using method without app ID', () => {
      const data = {
        'fields': [
          'Text__single_line_1',
          'Number'
        ],
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'hhI8wpbzFOZ0EqG9O7cH',
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
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
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

      const deleteFormFieldsResult = appModule.deleteFormFields(undefined, data.fields, data.revision);
      return deleteFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-46] Verify error will be displayed when using method without fields properties', () => {
      const data = {
        'app': 1,
        'fields': [],
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'TLR8F3XyMKxOpBfLpry2',
        'message': 'Missing or invalid input.',
        'errors': {
          'fields': {
            'messages': [
              'Required field.',
              'size must be between 1 and 100'
            ]
          }
        }
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
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

      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, undefined, data.revision);
      return deleteFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-47] Verify error will be displayed when using invalid app ID', () => {
      const data = {
        'app': 'abc',
        'fields': [
          'Text__single_line_1',
          'Number'
        ],
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'xyuCWKupR9wOlZIpyrh8',
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
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
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

      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, data.fields, data.revision);
      return deleteFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-48] Verify error will display when user input invalid fields code', () => {
      const data = {
        'app': 1,
        'fields': [
          'Text__single_line_1',
          'Error_field_code'
        ],
        revision: -1,
      };
      const expectResult = {
        'code': 'GAIA_FC01',
        'id': 'LcabXzdjAOgkoL7J5SSd',
        'message': 'The field (code: Error_field_code) not found.'
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
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
        .reply(520, expectResult);

      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, data.fields, data.revision);
      return deleteFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-49] Verify error will display when user input invalid revision', () => {
      const data = {
        'app': 1,
        'fields': [
          'Text__single_line_1',
          'Error_field_code'
        ],
        revision: 'abc',
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'FszSqvf3ABeIxuA1W5aY',
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
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
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

      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, data.fields, data.revision);
      return deleteFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-51] Verify error will displayed when items in array fields > 100', () => {
      const number = 105;
      const data = {
        'app': 1,
        'fields': 'Text__single_line_1',
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': '0ryJt8K03M8WfRdtOj1Z',
        'message': 'Missing or invalid input.',
        'errors': {
          'fields': {
            'messages': [
              'size must be between 1 and 100'
            ]
          }
        }
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.fields).toMatchObject(common.generateRecord(number, data.fields));
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

      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, common.generateRecord(number, data.fields), data.revision);
      return deleteFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-52] Verify error will display when user does not have App Management Permissions', () => {
      const data = {
        'app': 1,
        'fields': [
          'Text__single_line_1',
          'Error_field_code'
        ],
        revision: -1,
      };
      const expectResult = {
        'code': 'CB_NO02',
        'id': 'znxMA8JNWGXAtWvC5HEc',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .intercept(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, 'DELETE', (rqBody) => {
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

      const deleteFormFieldsResult = appModule.deleteFormFields(data.app, data.fields, data.revision);
      return deleteFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});