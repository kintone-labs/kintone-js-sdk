import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_FORM_LAYOUT_PREVIEW_API_ROUTE = '/k/v1/preview/app/form/layout.json';

describe('Checking App.updateFormLayout', () => {
  it('should update the app form layout successfully by updateFormLayout function', () => {
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
      .put(APP_FORM_LAYOUT_PREVIEW_API_ROUTE, (rqBody) => {
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
    const updateFormLayoutResult = appModule.updateFormLayout(data);
    return updateFormLayoutResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });
});