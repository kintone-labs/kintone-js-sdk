import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_FORM_FIELD_PREVIEW_API_ROUTE = '/k/v1/preview/app/form/fields.json';

describe('Checking App.deleteFormFields', () => {
  it('should delete successfully the app form fields', () => {
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
      .delete(APP_FORM_FIELD_PREVIEW_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual(data);
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
    const deleteFormFieldsResult = appModule.deleteFormFields(data);
    return deleteFormFieldsResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_VA01',
      'id': 'eFsuhe5Wjb7kvTprvtjT',
      'message': 'Missing or invalid input.',
      'errors': {
        'app': {
          'messages': [
            'Required field.'
          ]
        },
        'fields': {
          'messages': [
            'Required field.',
            'size must be between 1 and 100'
          ]
        }
      }
    };
    nock(URI)
      .delete(APP_FORM_FIELD_PREVIEW_API_ROUTE, (rqBody) => {
        expect(rqBody).toEqual({fields: []});
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
      .reply(400, expectResult);

    return appModule.deleteFormFields()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });
});