import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_VIEW_PREVIEW_API_ROUTE = '/k/v1/preview/app/views.json';

describe('Checking App.updateViews', () => {
  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    return appModule.updateViews().then((resp) => {
      // TODO: verify the resp
    }).catch((error) => {
      // TODO: verify the error
    });
  });

  it('[View-17] Valid request - should update successfully the app views', () => {
    const data = {
      'app': 1,
      'views': {
        'My List View': {
          'index': 0,
          'type': 'LIST',
          'name': 'My List View',
          'fields': [
            'Record_number',
            'Text_single_line'
          ],
          'filterCond': 'Updated_datetime > LAST_WEEK()',
          'sort': 'Record_number asc'
        }
      }
    };

    const expectResult = {
      'views': {
        'My List View': {
          'id': '5520254'
        }
      },
      'revision': '2'
    };
    nock(URI)
      .put(`${APP_VIEW_PREVIEW_API_ROUTE}`, (rqBody) => {
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
    const updateViewsResult = appModule.updateViews(data);
    return updateViewsResult.then((rsp) => {
      expect(rsp).toMatchObject(expectResult);
    });
  });
});