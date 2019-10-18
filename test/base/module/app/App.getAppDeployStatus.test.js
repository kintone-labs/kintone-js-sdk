import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_PREVIEW_DEPLOY_API_ROUTE = '/k/v1/preview/app/deploy.json';

describe('Checking App.getAppDeployStatus', () => {
  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    const expectResult = {
      'code': 'CB_VA01',
      'id': '9uydRVZKFebAvfWxsDW2',
      'message': 'Missing or invalid input.',
      'errors': {
        'apps': {
          'messages': ['Required field.']
        }
      }
    };
    nock(URI)
      .get(APP_PREVIEW_DEPLOY_API_ROUTE)
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(400, expectResult);
    return appModule.getAppDeployStatus()
      .catch((error) => {
        // (Resolved)TODO: verify the error
        expect(error.errorResponse).toMatchObject(expectResult);
      });
  });

  it('[App-107]should get successfully the app deploy status', () => {
    const data = {
      'apps': [1, 2]
    };
    const expectedResult = {
      'apps': [
        {
          'app': '1',
          'status': 'SUCCESS'
        },
        {
          'app': '2',
          'status': 'SUCCESS'
        }
      ]
    };
    nock(URI)
      .get(APP_PREVIEW_DEPLOY_API_ROUTE)
      .query(data)
      .matchHeader(PASSWORD_AURH_HEADER, (authHeader) => {
        expect(authHeader).toBe(createPasswordAuthToCheck());
        return true;
      })
      .reply(200, expectedResult);

    const appModule = createAppToSendRequest();
    const getAppDeployStatusResult = appModule.getAppDeployStatus(data);
    return getAppDeployStatusResult.then((rsp) => {
      expect(rsp).toMatchObject(expectedResult);
    });
  });
});