/* eslint-disable node/no-unpublished-require */
/**
 * kintone api - nodejs client
 * test record module
 */

const nock = require('nock');
const common = require('../../../utils/common');

const fs = require('fs');

const {Auth, File, Connection, KintoneAPIException} = require(common.MAIN_PATH_NODE);

const auth = new Auth();
auth.setPasswordAuth({username: common.USERNAME, password: common.PASSWORD});

const conn = new Connection({domain: common.DOMAIN, auth: auth});

const fileModule = new File({connection: conn});

describe('dowload function', () => {
  describe('success case', () => {
    describe('valid params are specificed', () => {
      it('[File-5]should download successfully file', () => {
        const fileKey = '201809040332204A3B5797BC804153AFF1BBB78C86CAE9207';
        const filePath = './test/node/module/file/mock/test.png';
        nock('https://' + common.DOMAIN)
          .get(`/k/v1/file.json?fileKey=${fileKey}`)
          .reply(200, Buffer.from('hello buffer'));
        return fileModule.download({fileKey: fileKey, outPutFilePath: filePath})
          .then(() => {
            // eslint-disable-next-line max-nested-callbacks
            fs.readdir('./test/node/module/file/mock/', (err, list) => {
              const existFile = list.includes('test.png');
              expect(existFile).toBe(true);
            });
            // remove file
            fs.unlinkSync(filePath);
          });
      });
    });
  });

  describe('error case', () => {
    describe('invalid file key', () => {
      const expectErr = {id: 'lzkAhxh7TWkr6X21BeJa',
        code: 'GAIA_BL01',
        message: 'The specified file (id: 201809040332204B5797BC804153AFF1BBB78C86CAE9207) not found.',
        errors: '{}'};

      it('[File-6]should return an error', () => {
        const fileKey = '201809040332204A3B5797BC804153AFF1BBB78C86CAE9207';
        const filePath = './test/module/file/mock/download/test.png';
        nock('https://' + common.DOMAIN)
          .get(`/k/v1/file.json?fileKey=${fileKey}`)
          .reply(404, expectErr);

        fileModule.download({fileKey: fileKey, outPutFilePath: filePath})
          .catch(err => {
            expect(err.get()).toMatchObject(expectErr);
          });
      });
    });
    describe('invalid file path', () => {
      it('[File-7]should return error', () => {
        const fileKey = '201809040332204A3B5797BC804153AFF1BBB78C86CAE9207';
        const filePath = './test/module/file/mock/testInvalidFilePath/test.png';
        nock('https://' + common.DOMAIN)
          .get(`/k/v1/file.json?fileKey=${fileKey}`)
          .reply(403, undefined);
        const downloadFile = fileModule.download({fileKey: fileKey, outPutFilePath: filePath});
        downloadFile.catch((err)=>{
          expect(err).toBeInstanceOf(KintoneAPIException);
        });
      });
    });
  });
});
