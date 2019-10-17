import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_VIEW_API_ROUTE = '/k/v1/app/views.json';
const APP_VIEW_PREVIEW_API_ROUTE = '/k/v1/preview/app/views.json';

describe('Checking App.getViews', () => {
  it('Valid request', () => {
    const dataForNock = {
      'app': 1,
      'lang': 'en'
    };

    const dataToRequest = {
      'app': 1,
      'lang': 'en',
      isPreview: true
    };

    const expectResult = {
      'views': {
        'View1': {
          'type': 'LIST',
          'name': 'View1',
          'id': '20733',
          'filterCond': 'Date_2 > LAST_WEEK()',
          'sort': 'Record_number asc',
          'index': '1',
          'fields': ['Record_number', 'Author']
        }
      }
    };
    nock(URI)
      .get(APP_VIEW_PREVIEW_API_ROUTE)
      .query(dataForNock)
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const getViewsResult = appModule.getViews(dataToRequest);
    return getViewsResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('Verify the list of views of an live App without pre-live settings are returned', () => {
    const data = {
      'app': 1,
      'lang': 'en'
    };

    const expectResult = {
      'views': {
        'View1': {
          'type': 'LIST',
          'name': 'View1',
          'id': '20733',
          'filterCond': 'Date_2 > LAST_WEEK()',
          'sort': 'Record_number asc',
          'index': '1',
          'fields': ['Record_number', 'Author']
        }
      },
      'revision': '3'
    };
    nock(URI)
      .get(APP_VIEW_API_ROUTE)
      .query(data)
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectResult);

    const appModule = createAppToSendRequest();
    const getViewsResult = appModule.getViews(data);
    return getViewsResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });

  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_VA01',
      'id': '2JXrM1PqbIjhqfQieG1Y',
      'message': 'Missing or invalid input.',
      'errors': {
        'app': {
          'messages': ['Required field.']
        }
      }
    };
    nock(URI)
      .get(APP_VIEW_API_ROUTE)
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(400, expectResult);
    return appModule.getViews()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });
});