
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

describe('addFormFields function', () => {
  describe('common function', () => {
    const app = 1;
    it('should return promise', () => {
      nock(URI)
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`)
        .reply(200, {});

      const getAppResult = appModule.addFormFields(app);
      expect(getAppResult).toHaveProperty('then');
      expect(getAppResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Form-28] - Valid request - should add successfully the app formfield', () => {
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
        'revision': '2'
      };
      nock(URI)
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, (rqBody) => {
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

      const addFormFieldsResult = appModule.addFormFields(data.app, data.properties, data.revision);
      return addFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-29] - Valid data - Without revision', () => {
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
        'revision': '2'
      };
      nock(URI)
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, (rqBody) => {
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

      const addFormFieldsResult = appModule.addFormFields(data.app, data.properties, undefined);
      return addFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-30] - Valid data - Ignore revision -1', () => {
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
        'revision': '2'
      };
      nock(URI)
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, (rqBody) => {
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

      const addFormFieldsResult = appModule.addFormFields(data.app, data.properties, data.revision);
      return addFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-32] - Verify the app deploy status is still displayed when executing with ID as string type', () => {
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
        revision: 1
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, (rqBody) => {
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

      const addFormFieldsResult = appModule.addFormFields(data.app, data.properties, data.revision);
      return addFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-31] - Verify add form fields for app in guest space successfully', () => {
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
        revision: 1
      };
      const expectResult = {
        'revision': '2'
      };
      nock(URI)
        .post(`${APP_FORM_FIELD_GUEST_SPACE_ROUTE}`, (rqBody) => {
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

      const addFormFieldsResult = guestFormModule.addFormFields(data.app, data.properties, data.revision);
      return addFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[Form-27] - Verify should return error when using API token authentication ', () => {
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'lzQPJ1hkW3Aj4iVebWCG',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`)
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(common.API_TOKEN);
          return true;
        })
        .reply(520, expectResult);
      const addFormFieldsResult = appUsingToken.addFormFields(10);
      return addFormFieldsResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-33] - Verify error will be displayed when using method without app ID', () => {
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
        revision: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'ZPClIAwkXV1qd2BRB4TM',
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
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, (rqBody) => {
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

      const addFormFieldsResult = appModule.addFormFields(undefined, data.properties, data.revision);
      return addFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-34] - Verify error will be displayed when using method without fields properties', () => {
      const data = {
        'app': 1,
        revision: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'bND4RRQUaYAhparzun86',
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
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, (rqBody) => {
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

      const addFormFieldsResult = appModule.addFormFields(data.app, undefined, data.revision);
      return addFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-35] - Verify error will be displayed when using invalid app ID', () => {
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
        revision: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'DK1r5WLs04wwvcuqfP4P',
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
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, (rqBody) => {
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

      const addFormFieldsResult = appModule.addFormFields(data.app, data.properties, data.revision);
      return addFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-36] - Verify error will display when user input invalid fields type', () => {
      const data = {
        'app': 1,
        'properties': {
          'Text__single_line_1': {
            'type': '10000',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true
          }
        },
        revision: -1
      };
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'Ty07w5txHYvBAnvxjhyT',
        'message': 'Missing or invalid input.',
        'errors': {
          'properties[Text__single_line_1].type': {
            'messages': [
              'must be one of the enum value'
            ]
          }
        }
      };
      nock(URI)
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, (rqBody) => {
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

      const addFormFieldsResult = appModule.addFormFields(data.app, data.properties, data.revision);
      return addFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-37] - Verify error is displayed when input invalid revision', () => {
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
        'id': '8LImrSKPmYS4shSa9UEJ',
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
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, (rqBody) => {
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

      const addFormFieldsResult = appModule.addFormFields(data.app, data.properties, data.revision);
      return addFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-38] - Verify error will display when user does not have App Management Permissions', () => {
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
        .post(`${APP_FORM_FIELD_PREVIEW_ROUTE}`, (rqBody) => {
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
        .reply(403, expectResult);

      const addFormFieldsResult = appModule.addFormFields(data.app, data.properties, data.revision);
      return addFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
