
/**
 * kintone api - nodejs client
 * test record module
 */

const nock = require('nock');
const common = require('../../utils/common');

const {Connection, Auth, App, KintoneAPIException} = require(common.MAIN_PATH);
const APP_FORM_FIELD_ROUTE = '/k/v1/app/form/fields.json';
const APP_FORM_FIELD_GUEST_SPACE_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/app/form/fields.json`;
const APP_FORM_FIELD_PREVIEW_ROUTE = '/k/v1/preview/app/form/fields.json';

const URI = 'https://' + common.DOMAIN;

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

const recordModule = new App(conn);

const connGuest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const guestFormModule = new App(connGuest);

describe('getFormFields function', () => {
  describe('common function', () => {
    const app = 1;
    it('should return promise', () => {
      nock(URI)
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}`)
        .reply(200, {});

      const getAppResult = recordModule.getFormFields(app);
      expect(getAppResult).toHaveProperty('then');
      expect(getAppResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Form-3] Valid request  should return the app formfield base on full data', () => {
      const app = 10;
      const lang = 'en';
      const isPreview = false;
      const expectResult = {
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true,
            'unique': true,
            'maxLength': '64',
            'minLength': '0',
            'defaultValue': '',
            'expression': '',
            'hideExpression': false
          },
          'revision': '2'
        }
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-6] Verify the data in localization - JA', () => {
      const app = 10;
      const lang = 'ja';
      const isPreview = false;
      const expectResult = {
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'テキスト',
            'noLabel': false,
            'required': true,
            'unique': true,
            'maxLength': '64',
            'minLength': '0',
            'defaultValue': '',
            'expression': '',
            'hideExpression': false
          },
        },
        'revision': '2'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-6] Verify the data in localization - EN', () => {
      const app = 10;
      const lang = 'en';
      const isPreview = false;
      const expectResult = {
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text',
            'noLabel': false,
            'required': true,
            'unique': true,
            'maxLength': '64',
            'minLength': '0',
            'defaultValue': '',
            'expression': '',
            'hideExpression': false
          },
        },
        'revision': '2'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-6] Verify the data in localization - ZH', () => {
      const app = 10;
      const lang = 'zh';
      const isPreview = false;
      const expectResult = {
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': '数据采集完成日期和时间',
            'noLabel': false,
            'required': true,
            'unique': true,
            'maxLength': '64',
            'minLength': '0',
            'defaultValue': '',
            'expression': '',
            'hideExpression': false
          },
        },
        'revision': '2'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-6] Verify the data in localization - USER BROWSER LANGUAGE', () => {
      const app = 10;
      const lang = 'user';
      const isPreview = false;
      const expectResult = {
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'テキスト',
            'noLabel': false,
            'required': true,
            'unique': true,
            'maxLength': '64',
            'minLength': '0',
            'defaultValue': '',
            'expression': '',
            'hideExpression': false
          },
        },
        'revision': '2'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-4] Verify the list of fields and field settings of an live App with pre-live settings are returned', () => {
      const app = 10;
      const lang = 'EN';
      const expectResult = {
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true,
            'unique': true,
            'maxLength': '64',
            'minLength': '0',
            'defaultValue': '',
            'expression': '',
            'hideExpression': false
          },
        },
        'revision': '3'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, undefined);
      return getFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-8] Verify the app form field with a pre-live settings is returned when setting isPreview false', () => {
      const app = 10;
      const lang = 'en';
      const isPreview = false;
      const expectResult = {
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true,
            'unique': true,
            'maxLength': '64',
            'minLength': '0',
            'defaultValue': '',
            'expression': '',
            'hideExpression': false
          },
          'Date': {
            'type': 'DATE',
            'code': 'Date',
            'label': 'Date',
            'noLabel': false,
            'required': false,
            'unique': false,
            'defaultValue': '',
            'defaultNowValue': true
          }
        },
        'revision': '2'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-7] Verify the app form field with a pre-live settings is returned when setting isPreview true', () => {
      const app = 10;
      const lang = 'en';
      const isPreview = true;
      const expectResult = {
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true,
            'unique': true,
            'maxLength': '64',
            'minLength': '0',
            'defaultValue': '',
            'expression': '',
            'hideExpression': false
          },
        },
        'revision': '2'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_PREVIEW_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[Form-12] Verify the app of Guest Space is returned', () => {
      const app = 1;
      const lang = 'en';
      const isPreview = false;
      const expectResult = {
        'properties': {
          'Text__single_line_1': {
            'type': 'SINGLE_LINE_TEXT',
            'code': 'Text__single_line_1',
            'label': 'Text (single-line)',
            'noLabel': false,
            'required': true,
            'unique': true,
            'maxLength': '64',
            'minLength': '0',
            'defaultValue': '',
            'expression': '',
            'hideExpression': false
          },
        },
        'revision': '2'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_GUEST_SPACE_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getFormFieldsResult = guestFormModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[Form-9] The error will be displayed when using invalid app ID', () => {
      const app = 'abc';
      const lang = 'en';
      const isPreview = false;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'rd70vRQmhixNIPltBzPa',
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
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-10] The error will be displayed when using method without app ID', () => {
      const lang = 'en';
      const isPreview = false;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'h6QtUmUVbmuPTcZBLf1I',
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
        .get(`${APP_FORM_FIELD_ROUTE}?lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(undefined, lang, isPreview);
      return getFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-11] The error will be displayed when input invalid language', () => {
      const app = 1;
      const lang = '1';
      const isPreview = false;
      const expectResult = {
        'code': 'CB_VA01',
        'id': '7ZQYN2qOgxdUAQ5n2J1j',
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
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-13] Error will be displayed with live app with user who does not have Permission to manage the App', () => {
      const app = 1;
      const lang = 'en';
      const isPreview = false;
      const expectResult = {
        'code': 'CB_NO02',
        'id': '7sqH5vh2McTqtFz0o0LB',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(403, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-14] Error will be displayed with pre-live settings with user who does not have Permission to manage the App', () => {
      const app = 1;
      const lang = 'en';
      const isPreview = true;
      const expectResult = {
        'code': 'CB_NO02',
        'id': '7sqH5vh2McTqtFz0o0LB',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_PREVIEW_ROUTE}?app=${app}&lang=${lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(403, expectResult);

      const getFormFieldsResult = recordModule.getFormFields(app, lang, isPreview);
      return getFormFieldsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[Form-2] should return error when using API token authentication ', () => {
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'lzQPJ1hkW3Aj4iVebWCG',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(`${APP_FORM_FIELD_ROUTE}?app=10`)
        .reply(403, expectResult);
      const getFormFieldsResult = recordModule.getFormFields(10);
      return getFormFieldsResult.catch((err) => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});