import KintoneAPIException from '../../../src/base/exception/KintoneAPIException';

describe('Checking KintoneAPIException object', () => {
  it('Can create new instance of KintoneAPIException with Buffer data', () => {
    const errors = {
      response: {
        data: Buffer.from('hello buffer')
      }
    };

    const kException = new KintoneAPIException(undefined, errors);
    expect(kException).toBeInstanceOf(KintoneAPIException);
  });

  it('Can create new instance of KintoneAPIException with ArrayBuffer data', () => {
    const errors = {
      response: {
        data: new ArrayBuffer('hello buffer')
      }
    };

    const kException = new KintoneAPIException(undefined, errors);
    expect(kException).toBeInstanceOf(KintoneAPIException);
  });

  it('Can getOriginError()', () => {
    const errors = new Error('ERROR_MESSAGE');
    const kException = new KintoneAPIException(undefined, errors);

    const originError = kException.getOriginError();
    expect(originError.message).toEqual('ERROR_MESSAGE');
  });

  it('Can getErrorResponse()', () => {
    const errors = new Error('ERROR_MESSAGE');
    const kException = new KintoneAPIException(undefined, errors);

    const errorResp = kException.getErrorResponse();
    expect(errorResp.message).toEqual('ERROR_MESSAGE');
  });

  it('Can getHttpErrorCode()', () => {
    const errors = {
      response: {
        status: 400
      }
    };
    const kException = new KintoneAPIException(undefined, errors);
    const httpErrorCode = kException.getHttpErrorCode();
    expect(httpErrorCode).toEqual(400);
  });

  it('Can create a kintone error', () => {
    const errors = {
      response:
      {
        data: {
          code: 'CB_VA01',
          id: 'u5raHo9ugggi6JhuwaBN',
          message: '入力内容が正しくありません。',
          errors: {
            limit: {
              messages: ['最小でも1以上です。']
            }
          }
        }
      }
    };
    const kException = new KintoneAPIException(undefined, errors);
    const errorResponse = kException.get();
    expect(errorResponse.id).toEqual('u5raHo9ugggi6JhuwaBN');
  });

  it('Can create an empty error', () => {
    const errors = {
      response:
      {
        data: {
          id: -1,
        }
      }
    };

    const kException = new KintoneAPIException(undefined, errors);
    const errorResponse = kException.getErrorResponse();
    expect(errorResponse.errors).toEqual(null);
  });
});