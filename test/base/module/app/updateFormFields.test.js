
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


describe('updateFormFields function', () => {
  describe('common function', () => {
    const app = 1;
    it('should return promise', () => {
      nock(URI)
        .put(APP_FORM_FIELD_PREVIEW_ROUTE)
        .reply(200, {});

      const getAppResult = appModule.updateFormFields(app);
      expect(getAppResult).toHaveProperty('then');
      expect(getAppResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Form-52] Valid request - should update successfully the app formfield', () => {
      const data = {
        'app': 1,
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
          }
        },
        revision: 2
      };
      const expectResult = {
        'revision': '1'
      };
      nock(URI)
        .put(APP_FORM_FIELD_PREVIEW_ROUTE, (rqBody) => {
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

      const updateFormFieldsResult = appModule.updateFormFields(data.app, data.properties, data.revision);
      return updateFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-53] Valid data - Without revision', () => {
      const data = {
        'app': 1,
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
          }
        },
      };
      const expectResult = {
        'revision': '3'
      };
      nock(URI)
        .put(APP_FORM_FIELD_PREVIEW_ROUTE, (rqBody) => {
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

      const updateFormFieldsResult = appModule.updateFormFields(data.app, data.properties);
      return updateFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-54] Valid data - Ignore revision -1', () => {
      const data = {
        'app': 1,
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
          }
        },
        revision: -1
      };
      const expectResult = {
        'revision': '3'
      };
      nock(URI)
        .put(APP_FORM_FIELD_PREVIEW_ROUTE, (rqBody) => {
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

      const updateFormFieldsResult = appModule.updateFormFields(data.app, data.properties, data.revision);
      return updateFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-55] Verify add form fields for app in guest space successfully', () => {
      const data = {
        'app': 1,
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
          }
        },
        revision: -1
      };
      const expectResult = {
        'revision': '3'
      };
      nock(URI)
        .put(APP_FORM_FIELD_GUEST_SPACE_ROUTE, (rqBody) => {
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
      const updateFormFieldsResult = guestFormModule.updateFormFields(data.app, data.properties, data.revision);
      return updateFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-56] Verify the app deploy status is still displayed when executing with ID as string type', () => {
      const data = {
        'app': '1',
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
          }
        },
        revision: -1
      };
      const expectResult = {
        'revision': '3'
      };
      nock(URI)
        .put(APP_FORM_FIELD_PREVIEW_ROUTE, (rqBody) => {
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

      const updateFormFieldsResult = appModule.updateFormFields(data.app, data.properties, data.revision);
      return updateFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[Form-51] Verify error will displayed when using API token authentication', () => {
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'lzQPJ1hkW3Aj4iVebWCG',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .put(APP_FORM_FIELD_PREVIEW_ROUTE)
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN);
          return true;
        })
        .reply(403, expectResult);
      const updateFormFieldsResult = appUsingToken.updateFormFields(10);
      return updateFormFieldsResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-57] Verify error will be displayed when using method without app ID', () => {
      const data = {
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
          }
        },
        revision: 2
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'ndfhXS54zXKBDn4ReHtV',
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
        .put(APP_FORM_FIELD_PREVIEW_ROUTE, (rqBody) => {
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

      const updateFormFieldsResult = appModule.updateFormFields(undefined, data.properties, data.revision);
      return updateFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-58] Verify error will be displayed when using method without fields properties', () => {
      const data = {
        'app': 1,
        revision: 2
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'THuBwhx0GjjwGkUgxAxR',
        'message': 'Missing or invalid input.',
        'errors': {
          'properties': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_FORM_FIELD_PREVIEW_ROUTE, (rqBody) => {
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

      const updateFormFieldsResult = appModule.updateFormFields(data.app, undefined, data.revision);
      return updateFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-59] Verify error will be displayed when using invalid app ID', () => {
      const data = {
        'app': 'abc',
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
          }
        },
        revision: 2
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'UNtiX46T818TL4zagnpH',
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
        .put(APP_FORM_FIELD_PREVIEW_ROUTE, (rqBody) => {
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

      const updateFormFieldsResult = appModule.updateFormFields(data.app, data.properties, data.revision);
      return updateFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-60] Verify error will display when user input invalid fields code', () => {
      const data = {
        'app': 1,
        'properties': {
          'Text': {
            'type': '10000',
            'code': 'Text',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
          }
        },
        revision: 2
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'HIWfe9xlrzmOvqMpUfv2',
        'message': 'Missing or invalid input.',
        'errors': {
          'properties[Text].type': {
            'messages': [
              'must be one of the enum value'
            ]
          }
        }
      };
      nock(URI)
        .put(APP_FORM_FIELD_PREVIEW_ROUTE, (rqBody) => {
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

      const updateFormFieldsResult = appModule.updateFormFields(data.app, data.properties, data.revision);
      return updateFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-61] Verify error is displayed when input invalid revision', () => {
      const data = {
        'app': 1,
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
          }
        },
        revision: 'abc'
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'UNtiX46T818TL4zagnpH',
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
        .put(APP_FORM_FIELD_PREVIEW_ROUTE, (rqBody) => {
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

      const updateFormFieldsResult = appModule.updateFormFields(data.app, data.properties, data.revision);
      return updateFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-62] Verify error will display when user does not have App Management Permissions', () => {
      const data = {
        'app': 1,
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
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
        .put(APP_FORM_FIELD_PREVIEW_ROUTE, (rqBody) => {
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

      const updateFormFieldsResult = appModule.updateFormFields(data.app, data.properties, data.revision);
      return updateFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
