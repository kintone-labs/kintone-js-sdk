/**
 * test connection and setProxy function
 */
const nock = require('nock');
const common = require('../../utils/common');
const {Connection, Auth} = require(common.MAIN_PATH);
const {API_ROUTE, URI} = require('../../utils/constant');

const auth = new Auth().setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);

describe('Connection module', () => {
  describe('common function', () => {
    it('Should return a connection when "addRequestOption" function is called', () => {
      expect(conn.addRequestOption()).toBeInstanceOf(Connection);
    });

    it('Should return a connection when "setProxy" function is called', () => {
      expect(conn.setProxy(common.PROXY_HOST, common.PROXY_PORT)).toBeInstanceOf(Connection);
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
    const connWithSpace = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
    it(`Return "${uri}" when using "getUri('record')" from guest space`, () => {
      expect(connWithSpace.getUri('record')).toEqual(uri);
    });

    it('Return a promisse when "request" function is called', () => {
      expect(conn.request('GET', '/page-not-found')).toHaveProperty('then');
      expect(conn.request('GET', '/page-not-found')).toHaveProperty('catch');
    });

    it(`Should have valid user-agent`, () => {
      nock(URI)
        .get(`API_ROUTE.RECORD_GET?app=1`)
        .reply(400, {});

      conn.setProxy(common.PROXY_HOST, common.PROXY_PORT);
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

      conn.setProxy(common.PROXY_HOST, common.PROXY_PORT);
      const response = conn.request('GET', 'API_ROUTE.RECORD_GET_TEST', {app: 1});
      const expectProxy = {
        host: common.PROXY_HOST,
        port: common.PROXY_PORT
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
      conn.setProxy(INVALID_PROXY_HOST, common.PROXY_PORT);
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
      conn.setProxy(INVALID_PROXY_HOST, common.PROXY_PORT);
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
      conn.setProxy(common.PROXY_HOST, INVALID_PROXY_PORT);
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
      conn.setProxy(common.PROXY_HOST, INVALID_PROXY_PORT);
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

      conn.setProxy(undefined, common.PROXY_PORT);
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

      conn.setProxy(common.PROXY_HOST, undefined);
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

    const connn = new Connection(common.DOMAIN, auth);
    connn.setHeader('test', 'test');
    const request = connn.request('GET', 'RECORDS', body);
    request.then((rsp) => {
      expect(rsp).toHaveProperty('records');
    });
  });
});
