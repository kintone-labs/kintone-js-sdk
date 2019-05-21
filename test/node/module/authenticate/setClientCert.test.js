/* eslint-disable node/no-unpublished-require */
/**
 * test connection and setProxy function
 */
const nock = require('nock');
const fs = require('fs');

const common = require('../../../utils/common');
const {Connection, Auth, App, KintoneAPIException, File} = require(common.MAIN_PATH_NODE);
const {API_ROUTE, URI} = require('../../../utils/constant');

const filePath = './test/node/module/authenticate/mock/test.pfx';
const pfxFile = fs.readFileSync(filePath);
const certPass = 'your_cert_pass';

describe('Connection module', () => {
  describe('success case', () => {
    it(`[setClientCert-1] Verify that connect succesfully by certificate data`, () => {
      const auth = new Auth()
        .setPasswordAuth(common.USERNAME, common.PASSWORD)
        .setClientCert(pfxFile, certPass);
      const conn = new Connection(common.DOMAIN, auth);
      const appModule = new App(conn);

      const appID = 1;
      const expectResult = {
        'appId': '1',
        'code': '',
        'name': 'ToDo App',
        'description': 'This is a great app!',
        'spaceId': '2',
        'threadId': '3',
        'createdAt': '2015-03-06T02:24:03.000Z',
        'creator': {
          'code': 'user1',
          'name': 'User1'
        },
        'modifiedAt': '2015-03-06T03:06:57.000Z',
        'modifier': {
          'code': 'login-name',
          'name': 'Display Name'
        }
      };
      nock(URI)
        .get(API_ROUTE.APP + `?id=${appID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult)
        .get(API_ROUTE.APP + `?id=${appID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, {});
      const getAppResult = appModule.getApp(appID);
      return getAppResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
        return appModule.getApp(appID);
      }).catch(err => {
        const expectCertFile = {passphrase: 'your_cert_pass', pfx: pfxFile};
        expect(err.errorRaw.response.config.httpsAgent.options).toMatchObject(expectCertFile);
      });
    });
    it(`[setClientCert-2] Verify that connect succesfully by certificate data with proxy http`, () => {
      const auth = new Auth()
        .setPasswordAuth(common.USERNAME, common.PASSWORD)
        .setClientCert(pfxFile, certPass);
      const conn = new Connection(common.DOMAIN, auth);
      conn.setProxy(common.PROXY_HOST, common.PROXY_PORT);
      const appModule = new App(conn);

      const appID = 1;
      const expectResult = {
        'appId': '1',
        'code': '',
        'name': 'ToDo App',
        'description': 'This is a great app!',
        'spaceId': '2',
        'threadId': '3',
        'createdAt': '2015-03-06T02:24:03.000Z',
        'creator': {
          'code': 'user1',
          'name': 'User1'
        },
        'modifiedAt': '2015-03-06T03:06:57.000Z',
        'modifier': {
          'code': 'login-name',
          'name': 'Display Name'
        }
      };
      nock(URI)
        .get(API_ROUTE.APP + `?id=${appID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult)
        .get(API_ROUTE.APP + `?id=${appID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, {});
      const getAppResult = appModule.getApp(appID);
      return getAppResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
        return appModule.getApp(appID);
      }).catch(err => {
        const expectCertFile = {passphrase: 'your_cert_pass', pfx: pfxFile};
        expect(err.errorRaw.response.config.httpsAgent.options).toMatchObject(expectCertFile);
      });
    });
  });

  describe('error case', () => {
    it(`[setClientCert-4] Verify that the error will be displayed when use certificate data for wrong user`, () => {
      const auth = new Auth()
        .setPasswordAuth('wrong_user', common.PASSWORD)
        .setClientCert(pfxFile, certPass);
      const conn = new Connection(common.DOMAIN, auth);
      const appModule = new App(conn);

      const appID = 1;
      nock(URI)
        .get(API_ROUTE.APP + `?id=${appID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth('wrong_user', common.PASSWORD));
          return true;
        })
        .reply(400, {});
      const getAppResult = appModule.getApp(appID);
      return getAppResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
    });

    it(`[setClientCert-5] Verify that the error will be displayed when use wrong password`, () => {
      const auth = new Auth()
        .setPasswordAuth('wrong_user', common.PASSWORD)
        .setClientCert(pfxFile, 'wrong_password');
      const conn = new Connection(common.DOMAIN, auth);
      const appModule = new App(conn);

      const appID = 1;
      nock(URI)
        .get(API_ROUTE.APP + `?id=${appID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth('wrong_user', common.PASSWORD));
          return true;
        })
        .reply(400, {});
      return appModule.getApp(appID).catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
    });

    it(`[setClientCert-6] Verify that the error will be displayed when use invalid certificate data`, () => {
      const auth = new Auth()
        .setPasswordAuth(common.USERNAME, common.PASSWORD)
        .setClientCert(pfxFile, certPass);
      const conn = new Connection(common.DOMAIN, auth);
      const appModule = new App(conn);

      const appID = 1;
      nock(URI)
        .get(API_ROUTE.APP + `?id=${appID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, {});
      return appModule.getApp(appID).catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
    });

    it(`[setClientCert-7] Verify that the error will be displayed when using method without cert`, () => {
      const auth = new Auth()
        .setPasswordAuth(common.USERNAME, common.PASSWORD)
        .setClientCert(undefined, certPass);
      const conn = new Connection(common.DOMAIN, auth);
      const appModule = new App(conn);

      const appID = 1;
      nock(URI)
        .get(API_ROUTE.APP + `?id=${appID}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, {});
      return appModule.getApp(appID).catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
    });

    it(`[setClientCert-8] Verify that the error will be displayed when using method without cert`, () => {
      const auth = new Auth()
        .setPasswordAuth(common.USERNAME, common.PASSWORD)
        .setClientCert(pfxFile);
      const conn = new Connection(common.DOMAIN, auth);
      const file = new File(conn);


      nock(URI)
        .get(API_ROUTE.FILE + `?fileKey=file_key`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(400, {});
      return file.download('file_key').catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
    });
  });
});
