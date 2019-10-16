import {URI, PASSWORD_AURH_HEADER, createPasswordAuthToCheck, createAppToSendRequest} from './common';
import nock from 'nock';

const APP_PREVIEW_DEPLOY_API_ROUTE = '/k/v1/preview/app/deploy.json';

describe('Checking App.getAppDeployStatus', () => {
  it('verify call app function without params', () => {
    const appModule = createAppToSendRequest();
    return appModule.getAppDeployStatus().then((resp) => {
      // TODO: verify the resp
    }).catch((error) => {
      // TODO: verify the error
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