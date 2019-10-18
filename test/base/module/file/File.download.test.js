import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import File from '../../../../src/base/module/file/File';
import {DOMAIN, USERNAME, PASSWORD} from './common';
import nock from 'nock';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const conn = new Connection({domain: DOMAIN, auth: auth});

const fileModule = new File({connection: conn});

describe('Check File.download', () => {
  it('should be called successfully', ()=>{
    const fileKey = '201809040332204A3B5797BC804153AFF1BBB78C86CAE9207';
    nock('https://' + DOMAIN)
      .get('/k/v1/file.json')
      .query({fileKey: fileKey})
      .reply(200, Buffer.from('hello buffer'));
    return fileModule.download({fileKey: fileKey})
      .then((resp) => {
        expect(resp).toEqual(Buffer.from('hello buffer'));
      });
  });
});