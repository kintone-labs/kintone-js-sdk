/* eslint-disable node/no-unpublished-require */
/**
 * test connection and setProxy function
 */
const nock = require('nock');
const common = require('../../../utils/common');
const {Connection, Auth} = require(common.MAIN_PATH_NODE);
const {API_ROUTE, URI} = require('../../../utils/constant');

const auth = new Auth().setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});
const conn = new Connection({domain: common.DOMAIN, auth: auth});
const paramSetProxy = {proxyHost: common.PROXY_HOST,
  proxyPort: common.PROXY_PORT,
  proxyUsername: common.PROXY_AUTH_USER,
  proxyPassword: common.PROXY_AUTH_PASS};

describe('Connection module', () => {
  describe('common function', () => {
    it(`Should overide method when exeed uri lenght`, () => {
      let query = 'Check_box not in (';
      for (let i = 0; i < 5000; i++) {
        query += '"sample1",';
      }
      query += '"sample1") and Created_by in (LOGINUSER()) order by $id asc limit 100 offset 0';

      const expectBody = {
        app: 1,
        query
      };
      nock(URI)
        .post(`${API_ROUTE.RECORD_GET}?_method=GET`, (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(200, {});

      conn.setProxy(paramSetProxy);
      const response = conn.request('GET', API_ROUTE.RECORD_GET, expectBody);
      return response.then((rsp) => {
        expect(rsp).toEqual({});
      });
    });
    it('Should return a connection when "addRequestOption" function is called', () => {
      expect(conn.addRequestOption({key: 'proxy', value: false})).toBeInstanceOf(Connection);
    });

    it('Should return a connection when "setProxy" function is called', () => {
      expect(conn.setProxy({proxyHost: common.PROXY_HOST, proxyPort: common.PROXY_PORT})).toBeInstanceOf(Connection);
    });

    it('Should return a connection when "setProxy" function is called with proxy auth', () => {
      expect(conn.setProxy(paramSetProxy)).toBeInstanceOf(Connection);
    });

    it('Should return a connection when "setHeader" function is called', () => {
      expect(conn.setHeader('json', true)).toBeInstanceOf(Connection);
    });

    it('Should return a connection when "setAuth" function is called', () => {
      expect(conn.setAuth(auth)).toBeInstanceOf(Connection);
    });

    it('Should throw a Error when "setAuth" function with input param that is\'nt Auth is called', () => {
      expect(() => {
        conn.setAuth();
      }).toThrow();
    });

    const expectURI = `https://${common.DOMAIN}:443${API_ROUTE.RECORD}`;
    it(`Return "${expectURI}" when using "getUri('record')" from nomal space`, () => {
      expect(conn.getUri('record')).toEqual(expectURI);
    });

    const uri = `https://${common.DOMAIN}:443${API_ROUTE.GUEST_RECORD}`;
    const connWithSpace = new Connection({domain: common.DOMAIN, auth: auth, guestSpaceID: common.GUEST_SPACEID});
    it(`Return "${uri}" when using "getUri('record')" from guest space`, () => {
      expect(connWithSpace.getUri('record')).toEqual(uri);
    });

    it('Return a promisse when "request" function is called', () => {
      nock(URI)
        .get('/page-not-found')
        .reply(400, {});
      const rsp = conn.request('GET', '/page-not-found').catch(()=>{
        expect(rsp).toHaveProperty('then');
        expect(rsp).toHaveProperty('catch');
      });
      return rsp;
    });

    it(`Should have valid user-agent`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      conn.setProxy({proxyHost: common.PROXY_HOST, proxyPort: common.PROXY_PORT});
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = API_ROUTE.USER_AGENT;
      return response.catch((err) => {
        expect(err.config.headers['User-Agent']).toEqual(expectProxy);
      });
    });

    it(`Should have valid user-agent when using proxy auth`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      conn.setProxy(paramSetProxy);
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET', {app: 1});
      const expectProxy = API_ROUTE.USER_AGENT;
      return response.catch((err) => {
        expect(err.config.headers['User-Agent']).toEqual(expectProxy);
      });
    });

    it(`Should have valid user-agent for https proxy`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      conn.setHttpsProxy({proxyHost: common.PROXY_HOST, proxyPort: common.PROXY_PORT});
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = API_ROUTE.USER_AGENT;
      return response.catch((err) => {
        expect(err.config.headers['User-Agent']).toEqual(expectProxy);
      });
    });

    it(`Should have valid user-agent for https proxy with auth`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      conn.setHttpsProxy(paramSetProxy);
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = API_ROUTE.USER_AGENT;
      return response.catch((err) => {
        expect(err.config.headers['User-Agent']).toEqual(expectProxy);
      });
    });
  });

  describe('setProxy function - Valid request', () => {
    it(`[setProxy-1] Set proxy to request when using setProxy function`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      conn.setProxy({proxyHost: common.PROXY_HOST, proxyPort: common.PROXY_PORT});
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = {
        host: common.PROXY_HOST,
        port: common.PROXY_PORT
      };
      return response.catch((err) => {
        expect(err.config.httpsAgent.options.proxy).toMatchObject(expectProxy);
      });
    });
    it(`[setProxy-1.1] Set proxy to request when using setProxy function with proxy auth`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      conn.setProxy(paramSetProxy);
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = {
        host: common.PROXY_HOST,
        port: common.PROXY_PORT,
        proxyAuth: `${common.PROXY_AUTH_USER}:${common.PROXY_AUTH_PASS}`
      };
      return response.catch((err) => {
        expect(err.config.httpsAgent.options.proxy).toMatchObject(expectProxy);
      });
    });
  });

  describe('setProxy function - Error case', () => {
    it(`[setProxy-2] Should return error when inputting invalid proxyHost (unexisted)`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      const INVALID_PROXY_HOST = 'unknown';
      conn.setProxy({proxyHost: INVALID_PROXY_HOST, proxyPort: common.PROXY_PORT});
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET', {app: 1});
      const expectProxy = {
        host: INVALID_PROXY_HOST,
        port: common.PROXY_PORT
      };
      response.catch((err) => {
        expect(err.config.httpsAgent.options.proxy).toMatchObject(expectProxy);
      });
    });

    it(`[setProxy-3] Should return error when inputting invalid proxyHost (negative value)`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      const INVALID_PROXY_HOST = -2;
      conn.setProxy({proxyHost: INVALID_PROXY_HOST, proxyPort: common.PROXY_PORT});
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = {
        host: INVALID_PROXY_HOST,
        port: common.PROXY_PORT
      };
      return response.catch((err) => {
        expect(err.config.httpsAgent.options.proxy).toMatchObject(expectProxy);
      });
    });

    it(`[setProxy-4] Should return error when inputting invalid proxyHost (unexisted)`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      const INVALID_PROXY_PORT = 'unknown';
      conn.setProxy({proxyHost: common.PROXY_HOST, proxyPort: INVALID_PROXY_PORT});
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = {
        host: common.PROXY_HOST,
        port: INVALID_PROXY_PORT
      };
      return response.catch((err) => {
        expect(err.config.httpsAgent.options.proxy).toMatchObject(expectProxy);
      });
    });

    it(`[setProxy-5] Should return error when inputting invalid proxyHost (negative value)`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      const INVALID_PROXY_PORT = -1;
      conn.setProxy({proxyHost: common.PROXY_HOST, proxyPort: INVALID_PROXY_PORT});
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = {
        host: common.PROXY_HOST,
        port: INVALID_PROXY_PORT
      };
      return response.catch((err) => {
        expect(err.config.httpsAgent.options.proxy).toMatchObject(expectProxy);
      });
    });

    it(`[setProxy-6] Should return error when inputting method without proxyHost`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      conn.setProxy({proxyHost: undefined, proxyPort: common.PROXY_PORT});
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = {
        host: undefined,
        port: common.PROXY_PORT
      };
      return response.catch((err) => {
        expect(err.config.httpsAgent.options.proxy).toMatchObject(expectProxy);
      });
    });

    it(`[setProxy-7] Should return error when inputting method without proxyPort`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      conn.setProxy({proxyHost: common.PROXY_HOST, proxyPort: undefined});
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = {
        host: common.PROXY_HOST,
        port: undefined
      };
      return response.catch((err) => {
        expect(err.config.httpsAgent.options.proxy).toMatchObject(expectProxy);
      });
    });
  });
});

describe('request function of connection', () => {
  it('Send successfully the request', () => {
    const body = {
      app: 1
    };
    nock('https://' + common.DOMAIN)
      .get(`/k/v1/records.json?app=${body.app}`)
      .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
        return true;
      })
      .matchHeader('test', (authHeader) => {
        expect(authHeader).toBe('test');
        return true;
      })
      .reply(200, {
        'records': [{}]
      });

    const connn = new Connection({domain: common.DOMAIN, auth: auth});
    connn.setHeader({key: 'test', value: 'test'});
    const request = connn.request('GET', 'RECORDS', body);
    request.then((rsp) => {
      expect(rsp).toHaveProperty('records');
    });
  });
});
