import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_FORM_LAYOUT_API_ROUTE = '/k/v1/app/form/layout.json';
const APP_FORM_LAYOUT_PREVIEW_API_ROUTE = '/k/v1/preview/app/form/layout.json';

describe('Checking App.getFormLayout', () => {
  it('should return the app formfield base on full data by getFormLayout function', () => {
    const app = 10;
    const isPreview = false;
    const expectResult = {
      'revision': '2',
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
        }
      ]
    };
    nock(URI)
      .get(APP_FORM_LAYOUT_API_ROUTE)
      .query({app})
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const getFormLayoutResult = appModule.getFormLayout({app, isPreview});
    return getFormLayoutResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('Verify the app form field by getFormLayout function with a pre-live settings is returned when setting isPreview true', () => {
    const app = 10;
    const isPreview = true;
    const expectResult = {
      'layout': [
        {
          'type': 'ROW',
          'fields': [
            {
              'type': 'SINGLE_LINE_TEXT',
              'code': 'Text',
              'size': {
                'width': '193'
              }
            },
            {
              'type': 'NUMBER',
              'code': 'Number',
              'size': {
                'width': '193'
              }
            }
          ]
        }
      ],
      'revision': '20'
    };
    nock(URI)
      .get(APP_FORM_LAYOUT_PREVIEW_API_ROUTE)
      .query({app})
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const getFormLayoutResult = appModule.getFormLayout({app, isPreview});
    return getFormLayoutResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    return appModule.getFormLayout().then((resp) => {
      // TODO: verify the resp
    }).catch((error) => {
      // TODO: verify the error
    });
  });
});