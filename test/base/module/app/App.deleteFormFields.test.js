import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_FORM_FIELD_PREVIEW_API_ROUTE = '/k/v1/preview/app/form/fields.json';

describe('Checking App.deleteFormFields', () => {
  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    return appModule.deleteFormFields().then((resp) => {
      // TODO: verify the resp
    }).catch((error) => {
      // TODO: verify the error
    });
  });

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
});