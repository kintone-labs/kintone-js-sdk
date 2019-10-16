import GetFormFieldsRequest from '../../../../src/base/model/app/form/GetFormFieldsRequest';
import AddFormFieldsRequest from '../../../../src/base/model/app/form/AddFormFieldsRequest';
import UpdateFormFieldsRequest from '../../../../src/base/model/app/form/UpdateFormFieldsRequest';
import DeleteFormFieldsRequest from '../../../../src/base/model/app/form/DeleteFormFieldsRequest';
import GetFormLayoutRequest from '../../../../src/base/model/app/form/GetFormLayoutRequest';
import UpdateFormLayoutRequest from '../../../../src/base/model/app/form/UpdateFormLayoutRequest';

describe('Checking App from model', () => {
  it('verify GetFormFieldsRequest.toJSONString() function', () => {
    const data = {
      app: 1
    };

    const model = new GetFormFieldsRequest(data.app);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify AddFormFieldsRequest.toJSONString() function', () => {
    const data = {
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

    const model = new AddFormFieldsRequest(data.app, data.properties, data.revision);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify UpdateFormFieldsRequest.toJSONString() function', () => {
    const data = {
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

    const model = new UpdateFormFieldsRequest(data.app, data.properties, data.revision);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify DeleteFormFieldsRequest.toJSONString() function', () => {
    const data = {
      'app': 1,
      'fields': [
        'Text__single_line_1',
        'Number'
      ],
      revision: 12
    };

    const model = new DeleteFormFieldsRequest(data.app, data.fields, data.revision);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify GetFormLayoutRequest.toJSONString() function', () => {
    const data = {
      app: 1
    };

    const model = new GetFormLayoutRequest(data.app);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });

  it('verify UpdateFormFieldsRequest.toJSONString() function', () => {
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

    const model = new UpdateFormLayoutRequest(data.app, data.layout, data.revision);
    expect(model.toJSONString()).toEqual(JSON.stringify(data));
  });
});