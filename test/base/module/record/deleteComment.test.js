/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');
const common = require('../../utils/common');
const {
  Connection,
  Auth,
  Record
} = require(common.MAIN_PATH);
const auth = new Auth().setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const connGuest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
if (common.hasOwnProperty('proxy') && common.proxy) {
  conn.addRequestOption('proxy', common.proxy);
}

const URI = 'https://' + common.DOMAIN;
const ROUTE = '/k/v1/record/comment.json';
const ROUTE_GUEST = '/k/guest/1/v1/record/comment.json';
const recordModule = new Record(conn);
const recordModuleGuest = new Record(connGuest);

describe('deleteComment function', () => {
  describe('common cases', () => {
    it('should return a promise', () => {
      nock(URI)
        .intercept(ROUTE, 'DELETE')
        .reply(200, {});

      const actualResult = recordModule.deleteComment();
      expect(actualResult).toHaveProperty('then');
      expect(actualResult).toHaveProperty('catch');
    });
  });

  describe('success cases', () => {
    it('[Record-256] should delete comment with valid appId, recordId, commentId', () => {
      const data = {
        app: 1,
        record: 1,
        comment: 1
      };

      nock(URI)
        .intercept(ROUTE, 'DELETE', reqBody => {
          expect(reqBody).toHaveProperty('app');
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, {});

      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject({});
      });
    });

    it('[Record-260] should delete comment when user does not have View permission for a field', () => {
      const data = {
        app: 1,
        record: 1,
        comment: 1
      };

      nock(URI)
        .intercept(ROUTE, 'DELETE', reqBody => {
          expect(reqBody).toHaveProperty('app');
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, {});

      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject({});
      });
    });

    it('[Record-266] should delete comment for app in guest space', () => {
      const data = {
        app: 1,
        record: 1,
        comment: 1
      };

      nock(URI)
        .intercept(ROUTE_GUEST, 'DELETE', reqBody => {
          expect(reqBody).toHaveProperty('app');
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, {});

      const actualResult = recordModuleGuest.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject({});
      });
    });

    it('[Record-267] should delete comment when executing with interger as string type (input string for interger and vice versa)', () => {
      const data = {
        app: '1',
        record: '1',
        comment: '1'
      };

      nock(URI)
        .intercept(ROUTE_GUEST, 'DELETE', reqBody => {
          expect(reqBody).toHaveProperty('app');
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, {});

      const actualResult = recordModuleGuest.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject({});
      });
    });
  });

  describe('error cases', () => {
    it('[Record-257] should return error when the comment id is invalid', () => {
      const data = {
        app: 1,
        record: 1,
        comment: 444
      };
      const expectedResult = {
        code: 'GAIA_RE02',
        id: '3wYeQRwubqOzNISfmYSZ',
        message:
          '指定したコメントが存在しません。削除された可能性があります。'
      };
      nock(URI)
        .intercept(ROUTE, 'DELETE', reqBody => {
          expect(reqBody).toMatchObject(data);
          return true;
        })
        .reply(520, expectedResult);

      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-261] should return an error when using invalid appId', () => {
      const data = {app: -1, record: 2, comment: 3};
      const expectedResult = {};
      nock(URI)
        .delete(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('app');
          expect(reqBody.app).toBeLessThan(0);
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-262] should return an error when using invalid recordId', () => {
      const data = {app: 1, record: -2, comment: 3};
      const expectedResult = {};
      nock(URI)
        .delete(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('app');
          expect(reqBody.record).toBeLessThan(0);
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-263] should return an error when missing appId', () => {
      const data = {app: undefined, record: 2, comment: 3};
      const expectedResult = {
        code: 'CB_VA01',
        id: 'C0eMANZsPODsEVCLteRZ',
        message: '入力内容が正しくありません。',
        errors: {
          app: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .delete(ROUTE, reqBody => {
          expect(reqBody).not.toHaveProperty('app');
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-264] should return an error when missing recordId', () => {
      const data = {app: 1, record: undefined, comment: 3};
      const expectedResult = {
        code: 'CB_VA01',
        id: 'HLJWkVzILtZtArvWrTxk',
        message: '入力内容が正しくありません。',
        errors: {
          record: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .delete(ROUTE, reqBody => {
          expect(reqBody).not.toHaveProperty('record');
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-265] should return an error when missing commentId', () => {
      const data = {app: 1, record: 2, comment: undefined};
      const expectedResult = {
        code: 'CB_VA01',
        id: '59WMdpRoaC9Z6N5Hy1xe',
        message: '入力内容が正しくありません。',
        errors: {
          comment: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .delete(ROUTE, reqBody => {
          expect(reqBody).not.toHaveProperty('comment');
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-258] should return an error when user does not have View permission for app', () => {
      const data = {app: 1, record: 2, comment: 3};
      const expectedResult = {
        'code': 'CB_NO02',
        'id': 'f8HbJ4gFiEhhOLm7wR9Q',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .delete(ROUTE, reqBody => {
          return true;
        })
        .reply(403, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-259] should return an error when user does not have View permission for record', () => {
      const data = {app: 1, record: 2, comment: 3};
      const expectedResult = {
        'code': 'CB_NO02',
        'id': 'f8HbJ4gFiEhhOLm7wR9Q',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .delete(ROUTE, reqBody => {
          return true;
        })
        .reply(403, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-268] should return an error when the comment featured is disabled', () => {
      const data = {app: 1, record: 2, comment: 3};
      const expectedResult = {
        'code': 'GAIA_RE12',
        'id': 'Q7SZZmx4HJdwC03zGs6O',
        'message': 'Comment feature is disabled.'
      };
      nock(URI)
        .delete(ROUTE, reqBody => {
          return true;
        })
        .reply(403, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-269] should return an error when deleting comment of other users', () => {
      const data = {app: 1, record: 2, comment: 3};
      const expectedResult = {
        'code': 'GAIA_RE03',
        'id': '7T0m9UkLKcQkevRrni0H',
        'message': 'Cannot delete the comment (ID: 10). The comment was posted by someone other than you.'
      };
      nock(URI)
        .delete(ROUTE, reqBody => {
          return true;
        })
        .reply(403, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

  });
});
