import Auth from '../../../../src/base/authentication/Auth';
import Connection from '../../../../src/base/connection/Connection';
import App from '../../../../src/base/module/app/App';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

describe('Checking App.constructor', () => {
  it('can creating App module', () => {
    const auth = new Auth();
    const connection = new Connection({auth});
    const app = new App({connection});
    expect(app).toBeInstanceOf(App);
  });

  it('should throw error if there is no params', () => {
    try {
      const app = new App();
      expect(app).toBeInstanceOf(App);
    } catch (error) {
      expect(error).toBeInstanceOf(KintoneAPIException);
    }
  });

  it('should throw error if there is wrong connection', () => {
    const conn = null;
    try {
      const app = new App({connection: conn});
      expect(app).toBeInstanceOf(App);
    } catch (error) {
      expect(error.message).toEqual(`${conn} is not an instance of Connection`);
    }
  });
});
