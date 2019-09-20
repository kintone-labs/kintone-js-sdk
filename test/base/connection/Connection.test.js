import Auth from '../../../src/base/authentication/Auth';
import Connection from '../../../src/base/connection/Connection';
import CONNECTION_CONST from '../../../src/base/connection/constant';

import nock from 'nock';
import KintoneAPIException from '../../../src/base/exception/KintoneAPIException';

describe('Checking Connection object', () => {
  it('Can create new instance of Connection', () => {
    const auth = new Auth();
    const domain = 'MY_DOMAIN';
    const guestSpaceID = -1;

    const conn = new Connection({domain, auth, guestSpaceID});
    expect(conn).toBeInstanceOf(Connection);
  });

  it('should be throw error when creatting a Connection with wrong Auth instance', () => {
    const auth = null;
    try {
      const conn = new Connection({auth});
      expect(conn).toBeInstanceOf(Connection);
    } catch (error) {
      expect(error.message).toEqual(`${auth} is not an instance of Auth`);
    }
  });

  it('Can send get request', () => {
    nock('https://my_domain')
      .get('/k/v1/app.json')
      .query({id: 1})
      .reply(200, {value: 1});

    const auth = new Auth();
    const username = 'MY_USERNAME';
    const password = 'MY_PASSWORD';
    auth.setPasswordAuth({username, password});

    const domain = 'MY_DOMAIN';
    const guestSpaceID = -1;
    const conn = new Connection({domain, auth, guestSpaceID});
    const result = conn.request('GET', '/k/v1/app.json', {id: 1});
    expect(result).toHaveProperty('then');
    expect(result).toHaveProperty('catch');

    return result.then(resp => {
      expect(resp.value).toEqual(1);
    });
  });

  it('Can send get request with an user_agent', () => {
    nock('https://my_domain')
      .get('/k/v1/app.json')
      .query({id: 1})
      .reply(200, {});

    const auth = new Auth();
    const domain = 'MY_DOMAIN';
    const guestSpaceID = -1;
    const conn = new Connection({domain, auth, guestSpaceID});
    conn.setHeader({key: CONNECTION_CONST.BASE.USER_AGENT, value: CONNECTION_CONST.BASE.USER_AGENT_BASE_VALUE});
    const result = conn.request('GET', '/k/v1/app.json', {id: 1});
    expect(result).toHaveProperty('then');
    expect(result).toHaveProperty('catch');
  });

  it('Can send get request with isExceedLimitUri', () => {
    nock('https://my_domain')
      .post('/k/v1/app.json?_method=GET')
      .reply(200, {});

    const auth = new Auth();
    const domain = 'MY_DOMAIN';
    const guestSpaceID = -1;
    const queryParams = {};
    for (let i = 0; i <= 10000; i++) {
      queryParams[i] = i;
    }

    const conn = new Connection({domain, auth, guestSpaceID});
    const result = conn.request('GET', '/k/v1/app.json', queryParams);
    expect(result).toHaveProperty('then');
    expect(result).toHaveProperty('catch');
  });

  it('Can send post request', () => {
    nock('https://my_domain')
      .post('/k/v1/preview/app/form/fields.json')
      .reply(200, {});

    const auth = new Auth();
    const domain = 'MY_DOMAIN';
    const guestSpaceID = -1;
    const conn = new Connection({domain, auth, guestSpaceID});
    const result = conn.request('POST', '/k/v1/preview/app/form/fields.json', {id: 1});
    expect(result).toHaveProperty('then');
    expect(result).toHaveProperty('catch');
  });

  it('Can send requestFile', () => {
    const fileKey = '201809040332204A3B5797BC804153AFF1BBB78C86CAE9207';

    const auth = new Auth();
    const domain = 'MY_DOMAIN';
    const guestSpaceID = -1;

    const conn = new Connection({domain, auth, guestSpaceID});
    nock('https://my_domain')
      .get('/k/v1/file.json')
      .query({fileKey})
      .reply(200, Buffer.from('hello buffer'));

    const result = conn.requestFile('GET', '/k/v1/file.json', {fileKey});
    expect(result).toHaveProperty('then');
    expect(result).toHaveProperty('catch');

    return result;
  });

  it('Should be an error if send requestFile failed', () => {
    const fileKey = '201809040332204A3B5797BC804153AFF1BBB78C86CAE9207';

    const auth = new Auth();
    const domain = 'MY_DOMAIN';
    const guestSpaceID = -1;

    const conn = new Connection({domain, auth, guestSpaceID});
    nock('https://my_domain')
      .get('/k/v1/file.json')
      .query({fileKey})
      .reply(404, JSON.stringify(new Error()));

    const result = conn.requestFile('GET', '/k/v1/file.json', {fileKey});
    expect(result).toHaveProperty('then');
    expect(result).toHaveProperty('catch');

    return result.catch(error => {
      expect(error).toBeInstanceOf(KintoneAPIException);
    });
  });

  it('Should be calling download funciton', () => {
    const fileKey = '201809040332204A3B5797BC804153AFF1BBB78C86CAE9207';
    const auth = new Auth();
    const domain = 'MY_DOMAIN';
    const guestSpaceID = -1;

    const conn = new Connection({domain, auth, guestSpaceID});
    const result = conn.download('GET', 'FILE', {fileKey});
    expect(result).toHaveProperty('then');
    expect(result).toHaveProperty('catch');

    return result.catch(error => {
      expect(error).toBeInstanceOf(KintoneAPIException);
    });
  });

  it('can run serializeParams function', () => {
    const auth = new Auth();
    const domain = 'MY_DOMAIN';

    const conn = new Connection({domain, auth});
    const resultObj = conn.serializeParams({x: [1, 2, {y: 3}]});
    const resultArr = conn.serializeParams([1, 2, 3]);
    expect(resultObj).toEqual('x[0]=1&x[1]=2&x[2].y=3');
    expect(resultArr).toEqual('0=1&1=2&2=3');
  });

  it('can run getUri function with full url', () => {
    const auth = new Auth();
    const domain = 'MY_DOMAIN';

    const conn = new Connection({domain, auth});
    const result = conn.getUri('https://MY_DOMAIN:443/k/v1/app.json');

    expect(result).toEqual('https://MY_DOMAIN:443/k/v1/app.json');
  });

  it('can run getPathURI with an guestSpaceID', () => {
    const auth = new Auth();
    const domain = 'MY_DOMAIN';
    const guestSpaceID = 1;

    const conn = new Connection({domain, auth, guestSpaceID});
    const result = conn.getPathURI('APP');

    expect(result).toEqual('/k/guest/1/v1/app.json');
  });
});