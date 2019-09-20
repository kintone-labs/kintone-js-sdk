/* eslint-disable node/no-unpublished-require */

/**
 * kintone api - nodejs client
 * test record module
 */

const nock = require('nock');
const common = require('../../../utils/common');

const {Auth, File, Connection} = require(common.MAIN_PATH_NODE);

const auth = new Auth();
auth.setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});
const conn = new Connection({domain: common.DOMAIN, auth: auth});

const fileModule = new File({connection: conn});
const filePath = './test/node/module/file/mock/test.png';

describe('upload function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock('https://' + common.DOMAIN)
        .post('/k/v1/file.json')
        .reply(200, undefined);
      const fileupload = fileModule.upload({filePath: filePath});
      expect(fileupload).toHaveProperty('then');
      expect(fileupload).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    describe('valid params are specificed', () => {
      it('[File-1] should upload successfully file', () => {
        const expectResult = {fileKey: 'dddde73js'};
        nock('https://' + common.DOMAIN)
          .post('/k/v1/file.json')
          .matchHeader('Content-Type', (type) => {
            expect(type).toEqual(expect.stringContaining('multipart/form-data; boundary='));
            return true;
          })
          .matchHeader('User-Agent', (agent) => {
            expect(agent).toEqual(common.USER_AGENT);
            return true;
          })
          .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
            expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
            return true;
          })
          .reply(200, expectResult);
        return fileModule.upload({filePath: filePath})
          .then((rsp) => {
            expect(rsp).toMatchObject(expectResult);
          });
      });
    });
  });

  describe('error case', () => {
    describe('Required filepath', () => {
      it('[File-4] should throw an error when file path is invalid', () => {
        const errors = `File path is not valid`;
        nock('https://' + common.DOMAIN)
          .post('/k/v1/file.json')
          .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
            expect(authHeader).toBe(Buffer.from(common.USERNAME + ':' + common.PASSWORD).toString('base64'));
            return true;
          })
          .reply(500, undefined);
        const uploadFile = () => {
          fileModule.upload();
        };
        return expect(uploadFile).toThrow(errors);
      });
    });
  });
});
