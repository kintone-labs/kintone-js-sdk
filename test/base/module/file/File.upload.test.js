import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import File from '../../../../src/base/module/file/File';
import {DOMAIN, PASSWORD_AUTH_HEADER, USERNAME, PASSWORD, USER_AGENT} from './common';
import nock from 'nock';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const conn = new Connection({domain: DOMAIN, auth: auth});

const fileModule = new File({connection: conn});

describe('Check File.upload', () => {
  it('should be called successfully', ()=>{
    const expectResult = {fileKey: 'dddde73js'};
    nock('https://' + DOMAIN)
      .post('/k/v1/file.json')
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('multipart/form-data; boundary='));
        return true;
      })
      .matchHeader('User-Agent', (agent) => {
        expect(agent).toEqual(USER_AGENT);
        return true;
      })
      .matchHeader(PASSWORD_AUTH_HEADER, (authHeader) => {
        expect(authHeader).toBe(Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'));
        return true;
      })
      .reply(200, expectResult);
    return fileModule.upload({fileName: 'FILE_NAME', fileContent: '123'})
      .then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
  });
});