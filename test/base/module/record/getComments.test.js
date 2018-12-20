/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');
const common = require('../..//utils/common');
const {
  Connection,
  Auth,
  Record
} = require(common.MAIN_PATH);

const auth = new Auth().setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const conn_guest = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);

if (common.hasOwnProperty('proxy') && common.proxy) {
  conn.addRequestOption('proxy', common.proxy);
}
const recordModule = new Record(conn);
const recordModule_guest = new Record(conn_guest);
const URI = 'https://' + common.DOMAIN;
const ROUTE = '/k/v1/record/comments.json';
const ROUTE_GUEST = '/k/guest/1/v1/record/comments.json';

describe('getComments function', () => {
  describe('common cases', () => {
    it('should return a promise', () => {
      const data = {
        app: 1,
        record: 2
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}`)
        .reply(200, {
          comments: [
            {
              id: '2',
              text:
                'user13 Global Sales APAC Taskforce \nHere is today\'s report.',
              createdAt: '2016-05-09T18:27:54Z',
              creator: {
                code: 'user14',
                name: 'user14'
              }
            }
          ],
          older: false,
          newer: false
        });
      const actualResult = recordModule.getComments(data.app, data.record);
      expect(actualResult).toHaveProperty('then');
      expect(actualResult).toHaveProperty('catch');
    });
  });

  describe('success cases', () => {
    it('[Record-215] should return correctly the comments of record once valid data, app + record only', () => {
      const data = {
        app: 1,
        record: 2
      };

      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}`)
        .matchHeader('X-Cybozu-Authorization', authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, {
          comments: [
            {
              id: '2',
              text:
                  'user13 Global Sales APAC Taskforce \nHere is today\'s report.',
              createdAt: '2016-05-09T18:27:54Z',
              creator: {
                code: 'user14',
                name: 'user14'
              }
            }
          ],
          older: false,
          newer: false
        });
      const actualResult = recordModule.getComments(data.app, data.record);
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
      });
    });

    it('[Record-216] should return the comments of record by the order of `asc`', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        comments: [
          {
            id: '1',
            text: 'asd',
            createdAt: '2018-09-07T07:47:07Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '2',
            text: 'bnm',
            createdAt: '2018-09-07T07:47:14Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '3',
            text: 'qwe',
            createdAt: '2018-09-07T07:49:27Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '4',
            text: 'cvb',
            createdAt: '2018-09-07T07:49:37Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          }
        ],
        older: false,
        newer: false
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}&order=asc`)
        .reply(200, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        'asc',
        undefined,
        undefined
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-217] should return the comments of record by the order of `desc`', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        comments: [
          {
            id: '4',
            text: 'cvb',
            createdAt: '2018-09-07T07:49:37Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '3',
            text: 'qwe',
            createdAt: '2018-09-07T07:49:27Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '2',
            text: 'bnm',
            createdAt: '2018-09-07T07:47:14Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '1',
            text: 'asd',
            createdAt: '2018-09-07T07:47:07Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          }
        ],
        older: false,
        newer: false
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}&order=desc`)
        .reply(200, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        'desc',
        undefined,
        undefined
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-219] should return the comments of record according to the offset value', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        comments: [
          {
            id: '3',
            text: 'qwe',
            createdAt: '2018-09-07T07:49:27Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '4',
            text: 'cvb',
            createdAt: '2018-09-07T07:49:37Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          }
        ],
        older: true,
        newer: false
      };
      const OFFSET = 2;

      nock(URI)
        .get(
          ROUTE +
              `?app=${data.app}&record=${
                data.record
              }&order=asc&offset=${OFFSET}`
        )
        .reply(200, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        'asc',
        OFFSET,
        undefined
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-220] should return the comments of record without skipping when the offset value is 0', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        comments: [
          {
            id: '4',
            text: 'cvb',
            createdAt: '2018-09-07T07:49:37Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '3',
            text: 'qwe',
            createdAt: '2018-09-07T07:49:27Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '2',
            text: 'bnm',
            createdAt: '2018-09-07T07:47:14Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '1',
            text: 'asd',
            createdAt: '2018-09-07T07:47:07Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          }
        ],
        older: false,
        newer: false
      };
      const OFFSET = 0;

      nock(URI)
        .get(
          ROUTE +
              `?app=${data.app}&record=${
                data.record
              }&order=desc&offset=${OFFSET}`
        )
        .reply(200, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        'desc',
        OFFSET,
        undefined
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-222] should return the comments of record according to the limit value', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        comments: [
          {
            id: '4',
            text: 'cvb',
            createdAt: '2018-09-07T07:49:37Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '3',
            text: 'qwe',
            createdAt: '2018-09-07T07:49:27Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          }
        ],
        older: true,
        newer: false
      };
      const LIMIT = 2;

      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}&limit=${LIMIT}`)
        .reply(200, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        LIMIT
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-223] should NOT return the comments of record when the limit value is 0', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        comments: [],
        older: true,
        newer: false
      };
      const LIMIT = 0;
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}&limit=${LIMIT}`)
        .reply(200, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        LIMIT
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-225] should return the comments of record when combining the three param {order, offset, limit}', () => {
      const data = {app: 1, record: 2, order: 'desc', offset: 3, limit: 3};
      const expectedResult = {
        comments: [
          {
            id: '1',
            text: 'asd',
            createdAt: '2018-09-07T07:47:07Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          }
        ],
        older: false,
        newer: true
      };

      nock(URI)
        .get(
          ROUTE +
              `?app=${data.app}&record=${data.record}&order=${
                data.order
              }&offset=${data.offset}&limit=${data.limit}`
        )
        .reply(200, expectedResult);
      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        data.order,
        data.offset,
        data.limit
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-229] should return the comments when user does not have View permission for a field', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        comments: [
          {
            id: '1',
            text: 'asd',
            createdAt: '2018-09-07T07:47:07Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '2',
            text: 'bnm',
            createdAt: '2018-09-07T07:47:14Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '3',
            text: 'qwe',
            createdAt: '2018-09-07T07:49:27Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '4',
            text: 'cvb',
            createdAt: '2018-09-07T07:49:37Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          }
        ],
        older: false,
        newer: false
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}`)
        .reply(200, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        undefined
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-225] should return the comments of record when combining the three param {order, offset, limit}', () => {
      const data = {app: 1, record: 2, order: 'desc', offset: 3, limit: 3};
      const expectedResult = {
        comments: [
          {
            id: '1',
            text: 'asd',
            createdAt: '2018-09-07T07:47:07Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          }
        ],
        older: false,
        newer: true
      };

      nock(URI)
        .get(
          ROUTE +
              `?app=${data.app}&record=${data.record}&order=${
                data.order
              }&offset=${data.offset}&limit=${data.limit}`
        )
        .reply(200, expectedResult);
      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        data.order,
        data.offset,
        data.limit
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-234] should added successfully for app in guest space', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        comments: [
          {
            id: '1',
            text: 'asd',
            createdAt: '2018-09-07T07:47:07Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '2',
            text: 'bnm',
            createdAt: '2018-09-07T07:47:14Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '3',
            text: 'qwe',
            createdAt: '2018-09-07T07:49:27Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '4',
            text: 'cvb',
            createdAt: '2018-09-07T07:49:37Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          }
        ],
        older: false,
        newer: false
      };
      nock(URI)
        .get(ROUTE_GUEST + `?app=${data.app}&record=${data.record}`)
        .reply(200, expectedResult);

      const actualResult = recordModule_guest.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        undefined
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

    it('[Record-235] should working when executing with interger as string type (input string for interger and vice versa) ', () => {
      const data = {app: '1', record: '2'};
      const expectedResult = {
        comments: [
          {
            id: '1',
            text: 'asd',
            createdAt: '2018-09-07T07:47:07Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '2',
            text: 'bnm',
            createdAt: '2018-09-07T07:47:14Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '3',
            text: 'qwe',
            createdAt: '2018-09-07T07:49:27Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          },
          {
            id: '4',
            text: 'cvb',
            createdAt: '2018-09-07T07:49:37Z',
            creator: {
              code: 'cybozu',
              name: 'cybozu'
            },
            mentions: []
          }
        ],
        older: false,
        newer: false
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}`)
        .reply(200, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        undefined
      );
      return actualResult.then(response => {
        expect(response).toHaveProperty('comments');
        expect(response).toMatchObject(expectedResult);
      });
    });

  });

  describe('error case', () => {
    it('[Record-218] should return an error when the value of order is invalid', () => {
      const data = {
        app: 2,
        record: 1,
        order: 'dd'
      };
      const expectedResult = {
        code: 'CB_VA01',
        id: 'Z8rWaqS8S8x8zfqoVLyt',
        message: '入力内容が正しくありません。',
        errors: {
          order: {messages: ['Enum値のいずれかでなければなりません。']}
        }
      };
      nock(URI)
        .get(
          ROUTE + `?app=${data.app}&record=${data.record}&order=${data.order}`
        )
        .reply(400, expectedResult);
      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        data.order
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-221] should return an error when the value of offset is invalid', () => {
      const data = {app: 1, record: 2};
      const OFFSET = -1;
      const expectedResult = {
        code: 'CB_VA01',
        id: 'N0t3WAWaUpYycmdwqdDK',
        message: '入力内容が正しくありません。',
        errors: {
          offset: {
            messages: ['最小でも0以上です。']
          }
        }
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}&offset=${OFFSET}`)
        .reply(400, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        OFFSET,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-224] should return an error when the value of limit is greater than 10', () => {
      const data = {app: 1, record: 2};
      const LIMIT = 11;
      const expectedResult = {
        code: 'CB_VA01',
        id: 'GK7azPfLL3wV1Jq2GvUH',
        message: '入力内容が正しくありません。',
        errors: {
          limit: {
            messages: ['最大でも10以下です。']
          }
        }
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}&limit=${LIMIT}`)
        .reply(400, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        LIMIT
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-230] should return an error when using invalid appId', () => {
      const data = {app: -1, record: 2};
      const expectedResult = {
        code: 'CB_VA01',
        id: '7IAqt2O3hm4Fw1oui0bn',
        message: '入力内容が正しくありません。',
        errors: {
          app: {
            messages: ['最小でも1以上です。']
          }
        }
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}`)
        .reply(400, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-231] should return an error when using invalid recordId', () => {
      const data = {app: 1, record: -2};
      const expectedResult = {
        code: 'CB_VA01',
        id: '4KCVyFaCn4JTEEhw6ozb',
        message: '入力内容が正しくありません。',
        errors: {
          record: {
            messages: ['最小でも1以上です。']
          }
        }
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}`)
        .reply(400, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-232] should return an error when missing appId', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        code: 'CB_VA01',
        id: 'fPvGX7iqoF0DxeCI04Pk',
        message: '入力内容が正しくありません。',
        errors: {
          app: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .get(ROUTE + `?record=${data.record}`)
        .reply(400, expectedResult);

      const actualResult = recordModule.getComments(
        undefined,
        data.record,
        undefined,
        undefined,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-233] should return an error when missing recordId', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        code: 'CB_VA01',
        id: 'DUB0DXXSrnORvhKeC4mz',
        message: '入力内容が正しくありません。',
        errors: {
          record: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}`)
        .reply(400, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        undefined,
        undefined,
        undefined,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-226] should return an error when comment feature is disabled', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        'code': 'GAIA_RE12',
        'id': 'Q7SZZmx4HJdwC03zGs6O',
        'message': 'Comment feature is disabled.'
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}`)
        .reply(520, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-227] should return an error when user does not have View permission for app', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        'code': 'CB_NO02',
        'id': '2f7SaUZmazhZPZzdkSI1',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}`)
        .reply(403, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-228] should return an error when user does not have View permission for record', () => {
      const data = {app: 1, record: 2};
      const expectedResult = {
        'code': 'CB_NO02',
        'id': '2f7SaUZmazhZPZzdkSI1',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(ROUTE + `?app=${data.app}&record=${data.record}`)
        .reply(403, expectedResult);

      const actualResult = recordModule.getComments(
        data.app,
        data.record,
        undefined,
        undefined,
        undefined
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

  });
});
