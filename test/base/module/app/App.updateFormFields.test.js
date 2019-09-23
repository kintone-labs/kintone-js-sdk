import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_FORM_FIELD_PREVIEW_API_ROUTE = '/k/v1/preview/app/form/fields.json';

describe('Checking App.updateFormFields', () => {

  it('Should update successfully the app formfield', () => {
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
      .put(APP_FORM_FIELD_PREVIEW_API_ROUTE, (rqBody) => {
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
    const updateFormFieldsResult = appModule.updateFormFields(dataToRequest);
    return updateFormFieldsResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });
});