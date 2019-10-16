import AddPreviewAppRequest from '../../../../src/base/model/app/app/AddPreviewAppRequest';
import DeployAppSettingsRequest from '../../../../src/base/model/app/app/DeployAppSettingsRequest';
import GetAppDeployStatusRequest from '../../../../src/base/model/app/app/GetAppDeployStatusRequest';
import GetAppRequest from '../../../../src/base/model/app/app/GetAppRequest';
import GetAppsRequest from '../../../../src/base/model/app/app/GetAppsRequest';
import GetViewsRequest from '../../../../src/base/model/app/app/GetViewsRequest';
import UpdateViewsRequest from '../../../../src/base/model/app/app/UpdateViewsRequest';
import GetGeneralSettingsRequest from '../../../../src/base/model/app/app/GetGeneralSettingsRequest';
import UpdateGeneralSettingsRequest from '../../../../src/base/model/app/app/UpdateGeneralSettingsRequest';

describe('Checking App app model', () => {
  it('verify AddPreviewAppRequest functions', () => {
    const data = {
      name: 'app 1',
      space: 1,
      thread: 1
    };

    const model = new AddPreviewAppRequest();
    model.setAppName(data.name);
    model.setSpace(data.space);
    model.setThread(data.thread);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify DeployAppSettingsRequest functions', () => {
    const data = {
      'apps': [
        {
          'app': 1,
          'revision': 57
        },
        {
          'app': 1001,
          'revision': 22
        }
      ],
      'revert': true
    };

    const model = new DeployAppSettingsRequest();
    model.setApps(data.apps);
    model.setRevert(data.revert);

    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify GetAppDeployStatusRequest functions', () => {
    const dataForGet = {
      'apps': [1, 2]
    };

    const dataForSet = {
      'apps': [1, 2, 3]
    };

    const model = new GetAppDeployStatusRequest(dataForGet.apps);
    expect(model.getApps()).toEqual(dataForGet.apps);

    model.setApps(dataForSet.apps);
    expect(model.toJSONString()).toEqual(JSON.stringify(dataForSet));
  });

  it('verify GetAppRequest functions', () => {
    const dataForGet = {id: 1};
    const dataForSet = {id: 2};

    const model = new GetAppRequest(dataForGet.id);
    expect(model.getAppID()).toEqual(dataForGet.id);

    model.setAppID(dataForSet.id);
    expect(model.toJSONString()).toEqual(JSON.stringify(dataForSet));
  });

  it('verify GetAppsRequest functions', () => {
    const data = {
      offset: 1,
      limit: 3
    };

    const model = new GetAppsRequest(data.offset, data.limit);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify UpdateViewsRequest functions', () => {
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
      },
      revision: 1
    };

    const model = new UpdateViewsRequest(data.app, data.views, data.revision);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify GetViewsRequest functions', () => {
    const data = {
      app: 1,
      lang: 'en'
    };

    const model = new GetViewsRequest(data.app, data.lang);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });


  it('verify GetGeneralSettingsRequest functions', () => {
    const data = {
      app: 1,
      lang: 'en'
    };

    const model = new GetGeneralSettingsRequest(data.app, data.lang);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify UpdateGeneralSettingsRequest functions', () => {
    const data = {
      'app': 1,
      'name': 'APP_NAME',
      'description': 'Here is app description.',
      'icon': {
        'type': 'PRESET',
        'key': 'APP72'
      },
      'theme': 'WHITE',
      'revision': 1
    };

    const emptyModel = new UpdateGeneralSettingsRequest();
    expect(emptyModel.toJSONString()).toEqual(JSON.stringify({}));

    const model = new UpdateGeneralSettingsRequest(data);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
    // TODO: This model should content set/get functions for all properties
  });
});