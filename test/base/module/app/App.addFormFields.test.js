import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_FORM_FIELD_PREVIEW_API_ROUTE = '/k/v1/preview/app/form/fields.json';

describe('Checking App.addFormFields', () => {
  it('should add successfully the app formfield', () => {
    const dataForNock = {
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

    const dataToRequest = {
      'app': 1,
      'fields': {
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
      'revision': '3'
    };
    nock(URI)
      .post(APP_FORM_FIELD_PREVIEW_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual(dataForNock);
        return true;
      })
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    return appModule.addFormFields(dataToRequest)
      .then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
  });

  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_IL02',
      'id': 'fY0nuklF16LsztA9FfM0',
      'message': 'Illegal request.'
    };
    nock(URI)
      .post(APP_FORM_FIELD_PREVIEW_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual({});
        return true;
      })
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(520, expectResult);

    return appModule.addFormFields()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });
});