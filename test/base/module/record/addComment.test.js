/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');
const common = require('../..//utils/common');
const {KintoneAPIException, Connection, Auth, Record} = require(common.MAIN_PATH);

const auth = new Auth().setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const recordModule = new Record(conn);
const connGuest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const recordModuleGuest = new Record(connGuest);

const URI = 'https://' + common.DOMAIN;
const ROUTE = '/k/v1/record/comment.json';
const ROUTE_GUEST = '/k/guest/1/v1/record/comment.json';

describe('addComment function', () => {
  describe('common case', () => {
    it('should return a promise', () => {
      nock(URI)
        .post(ROUTE)
        .reply(200, {id: '1'});
      const addCommentResult = recordModule.addComment();
      expect(addCommentResult).toHaveProperty('then');
      expect(addCommentResult).toHaveProperty('catch');
    });
  });

  describe('success cases', () => {
    it('[Record-236] should add comment to record successfully', () => {
      const data = {
        app: 1,
        record: 1,
        comment: {
          text: 'hello'
        }
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toMatchObject(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, {id: '1'});

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(rsp => {
        expect(rsp).toHaveProperty('id');
      });
    });

    it('[Record-237] should add a comment with the content containing special characters', () => {
      const data = {
        app: 1,
        record: 2,
        comment: {text: 'new comment containing 日本'}
      };
      const expectedResult = {id: '5'};
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('comment');
          return true;
        })
        .reply(200, expectedResult);

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-238] should add a comment with the @ + name will be displayed in the comment', () => {
      const data = {
        'app': 7,
        'record': 1,
        'comment': {
          'text': 'This comment is from the Administrator. \nPlease check!',
          'mentions': [
            {
              'code': 'cybozu',
              'type': 'USER'
            }
          ]
        }
      };
      const expectedResult = {id: '5'};
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('comment');
          return true;
        })
        .reply(200, expectedResult);

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-239] should add a comment with mention', () => {
      const data = {
        app: 1,
        record: 2,
        comment: {
          text: 'new comment containing 日本',
          mentions: [
            {
              code: 'user16',
              type: 'USER'
            },
            {
              code: 'Global Sales_1BNZeQ',
              type: 'ORGANIZATION'
            },
            {
              code: 'APAC Taskforce_DJrvzu',
              type: 'GROUP'
            }
          ]
        }
      };
      const expectedResult = {id: '5'};
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('comment');
          expect(reqBody.comment).toHaveProperty('mentions');
          return true;
        })
        .reply(200, expectedResult);

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-240] should add the comment without mention any users (blank mention)', () => {
      const data = {
        'app': 7,
        'record': 1,
        'comment': {
          'text': 'This comment is from the Administrator. \nPlease check!',
          'mentions': [
            {
            }
          ]
        }
      };
      const expectedResult = {id: '5'};
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('comment');
          return true;
        })
        .reply(200, expectedResult);

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-252] should add a comment successfully when inputting string for appId', () => {
      const data = {
        app: 1,
        record: 2,
        comment: {text: 'something goes here'}
      };
      const expectedResult = {id: '8'};
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('app');
          expect(reqBody).toHaveProperty('record');
          expect(reqBody).toHaveProperty('comment');
          return true;
        })
        .reply(200, expectedResult);

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-245] should add a comment when user does not have View permission for a field', () => {
      const data = {
        'app': 7,
        'record': 1,
        'comment': {
          'text': 'This comment is from the Administrator. \nPlease check!',
          'mentions': [
            {
              'code': 'cybozu',
              'type': 'USER'
            }
          ]
        }
      };
      const expectedResult = {id: '5'};
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('comment');
          return true;
        })
        .reply(200, expectedResult);

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-251] should add a comment successfully for app in guest space', () => {
      const data = {
        'app': 7,
        'record': 1,
        'comment': {
          'text': 'This comment is from the Administrator. \nPlease check!',
          'mentions': [
            {
              'code': 'cybozu',
              'type': 'USER'
            }
          ]
        }
      };
      const expectedResult = {id: '5'};
      nock(URI)
        .post(ROUTE_GUEST, reqBody => {
          expect(reqBody).toHaveProperty('comment');
          return true;
        })
        .reply(200, expectedResult);

      const actualResult = recordModuleGuest.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-254] should add comment to record successfully by the "Administrator" user if using API token', () => {
      const data = {
        app: 1,
        record: 1,
        comment: {
          text: 'hello'
        }
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toMatchObject(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, {id: '1'});

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(rsp => {
        expect(rsp).toHaveProperty('id');
      });
    });

    it('[Record-255] should add comment to record successfully and inactive/deleted users, departments, and groups are still mentioned.', () => {
      const data = {
        app: 1,
        record: 1,
        'comment': {
          'text': 'This comment is from the Administrator. \nPlease check!',
          'mentions': [
            {
              'code': 'disabled_user16',
              'type': 'USER'
            },
            {
              'code': 'disabled_Global Sales_1BNZeQ',
              'type': 'ORGANIZATION'
            },
            {
              'code': 'disabled_APAC Taskforce_DJrvzu',
              'type': 'GROUP'
            }
          ]
        }
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toMatchObject(data);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, {id: '1'});

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(rsp => {
        expect(rsp).toHaveProperty('id');
      });
    });
  });

  describe('error case', () => {
    it('[Record-241] should return error when the comment text is blank (invalid comment content)', () => {
      const data = {
        app: 1,
        record: 1,
        comment: {
          text: ''
        }
      };
      const expectResult = {
        code: 'CB_VA01',
        id: '7oiYHOZd11fTpyvY00kG',
        message: 'Missing or invalid input.',
        errors: {
          'comment.text': {
            messages: [
              'Enter between 1 and 65,535 characters.',
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toEqual(data);
          return true;
        })
        .reply(400, expectResult);

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-242] should return an error when specifying an unexisted user in mention', () => {
      const data = {
        app: 1,
        record: 2,
        comment: {
          text: 'something goes here',
          mention: [
            {
              code: 'un-existed',
              type: 'USER'
            }
          ]
        }
      };
      const expectedResult = {
        code: 'CB_VA01',
        id: '7oiYHOZd11fTpyvY00kG',
        message: 'Missing or invalid input.',
        errors: {
          'comment.text': {
            messages: [
              'Enter between 1 and 65,535 characters.',
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('comment');
          expect(reqBody.comment).toHaveProperty('mention');
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-243] should return an error when user does not have View permission for app', () => {
      const data = {
        app: 1,
        record: 2,
        comment: {
          text: 'something goes here',
          mention: [
            {
              code: 'cybozu',
              type: 'USER'
            }
          ]
        }
      };
      const expectedResult = {
        'code': 'CB_NO02',
        'id': 've4ykwTPpTfFViUIBgqZ',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('comment');
          expect(reqBody.comment).toHaveProperty('mention');
          return true;
        })
        .reply(403, expectedResult);
      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-244] should return an error when user does not have View permission for record', () => {
      const data = {
        app: 1,
        record: 2,
        comment: {
          text: 'something goes here',
          mention: [
            {
              code: 'cybozu',
              type: 'USER'
            }
          ]
        }
      };
      const expectedResult = {
        'code': 'CB_NO02',
        'id': 've4ykwTPpTfFViUIBgqZ',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('comment');
          expect(reqBody.comment).toHaveProperty('mention');
          return true;
        })
        .reply(403, expectedResult);
      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-246] should return an error when using invalid appId', () => {
      const data = {
        app: -1,
        record: 2,
        comment: {text: 'something goes here'}
      };
      const expectedResult = {
        code: 'CB_VA01',
        id: 'R4E6puJFh6nDPXypT796',
        message: '入力内容が正しくありません。',
        errors: {
          app: {
            messages: ['最小でも1以上です。']
          }
        }
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody.app).toBeLessThan(0);
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-247] should return an error when using invalid recordId', () => {
      const data = {
        app: 1,
        record: -2,
        comment: {text: 'something goes here'}
      };
      const expectedResult = {
        code: 'CB_VA01',
        id: 'MDx5kAIOfK4AbeJssEYW',
        message: '入力内容が正しくありません。',
        errors: {
          record: {
            messages: ['最小でも1以上です。']
          }
        }
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody.record).toBeLessThan(0);
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-248] should return an error when missing appId', () => {
      const data = {
        app: undefined,
        record: 2,
        comment: {text: 'something goes here'}
      };
      const expectedResult = {
        code: 'CB_VA01',
        id: '9JAS954ZZpOZk7PcZ3JS',
        message: '入力内容が正しくありません。',
        errors: {
          app: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).not.toHaveProperty('app');
          return true;
        })
        .reply(400, expectedResult);

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-249] should return an error when missing recordId', () => {
      const data = {
        app: 1,
        record: undefined,
        comment: {text: 'something goes here'}
      };
      const expectedResult = {
        code: 'CB_VA01',
        id: 'jxdkEErN6fBh5Uip6qik',
        message: '入力内容が正しくありません。',
        errors: {
          record: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).not.toHaveProperty('record');
          return true;
        })
        .reply(400, expectedResult);

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-250] should return an error when missing comment', () => {
      const data = {
        app: 1,
        record: undefined,
        comment: undefined
      };
      const expectedResult = {
        code: 'CB_VA01',
        id: 'GCUZnHDYCC6bvKjOSgoB',
        message: '入力内容が正しくありません。',
        errors: {
          comment: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).not.toHaveProperty('comment');
          return true;
        })
        .reply(400, expectedResult);

      const actualResult = recordModule.addComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-253] should return an error when the comment featured is disabled', () => {
      const data = {
        app: 1,
        record: undefined,
        comment: undefined
      };
      const expectedResult = {
        'code': 'GAIA_RE12',
        'id': 'Q7SZZmx4HJdwC03zGs6O',
        'message': 'Comment feature is disabled.'
      };
      nock(URI)
        .post(ROUTE, reqBody => {
          expect(reqBody).not.toHaveProperty('comment');
          return true;
        })
        .reply(520, expectedResult);

      const actualResult = recordModule.addComment(
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
