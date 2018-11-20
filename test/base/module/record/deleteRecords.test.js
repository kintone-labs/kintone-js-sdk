/**
 * test record module
 */
const nock = require('nock');
const common = require('../../utils/common');
const {KintoneAPIException, Connection, Auth, Record} = require(common.MAIN_PATH);
const {API_ROUTE, URI} = require('../../utils/constant');

const auth = new Auth().setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const recordModule = new Record(conn);

describe('deleteRecords function', () => {
  describe('common case', () => {
    it('should return a promise', () => {
      const data = {
        app: 2,
        ids: [1]
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE')
        .reply(200, {});
      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      expect(deleteRecordsResult).toHaveProperty('then');
      expect(deleteRecordsResult).toHaveProperty('catch');
    });
  });

  describe('Successful case', () => {
    it('[Record-127] Delete successfully the record when specifying only 1 id', () => {
      const data = {
        app: 2,
        ids: [1]
      };
      nock(URI + ':443')
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, {});

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.then((rsp) => {
        expect(rsp).toEqual({});
      });
    });

    it('[Record-128] Delete successfully when specifying array of multiple ids', () => {
      const data = {
        app: 2,
        ids: [1, 3, 2, 4, 5]
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json'));
          return true;
        })
        .reply(200, {});

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.then((rsp) => {
        expect(rsp).toEqual({});
      });
    });

    it('[Record-131] Able to delete when user have View/Delete permission for app but does not have Edit permission ', () => {
      const data = {
        app: 2,
        ids: [1]
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .reply(200, {});

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
    });

    it('[Record-132] Able to delete when user have View/Delete permission for record but does not have Edit permission ', () => {
      const data = {
        app: 2,
        ids: [1]
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .reply(200, {});

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
    });

    it('[Record-136] Deleted Record successfully for app in guest space ', () => {
      const data = {
        app: 1,
        ids: [2]
      };

      const connGuestSpace = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
      const recordInGuestSpace = new Record(connGuestSpace);
      nock(URI)
        .intercept(API_ROUTE.GUEST_RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .reply(200, {});

      const deleteRecordsResult =recordInGuestSpace.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
    });

    it('[Record-138] Can be deleted at once is 100', () => {
      const data = {
        app: 1,
        ids: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
          30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
          57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
          84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100
        ]
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .reply(200, {});

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
      });
    });

  });

  describe('Error case', () => {
    it('[Record-129] Error when the record id is not exsist', () => {
      const data = {
        app: 2,
        ids: [1000000]
      };
      const expectedResult = {
        'code': 'GAIA_RE01',
        'id': 'rmUof2dMm9kuEQeP96cO',
        'message': 'The specified record (ID: 1000000) is not found.'
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .reply(404, expectedResult);

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-130] Error happens when user does not have Delete permission for app ', () => {
      const data = {
        app: 2,
        ids: [1]
      };
      const expectedResult = {'code': 'CB_NO02', 'id': 'DbTLTAJWHM70iV7jmpaW', 'message': 'No privilege to proceed.'};
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .reply(403, expectedResult);

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-133] Error will be displayed when using invalid app ID ', () => {
      const data = {
        app: -2,
        ids: [1]
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': '7LyZ4i7o38BgRN3zEbvZ',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .reply(404, expectedResult);

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-134] Error will be displayed when using method without app ID ', () => {
      const data = {
        ids: [1]
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'D8tKa1WdkHqW7MU7oMdV',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .reply(404, expectedResult);

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-135] Error will be displayed when using method without ids ', () => {
      const data = {
        app: 1
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'O5XWZ5nbtZm2alHp8IRT',
        'message': 'Missing or invalid input.',
        'errors': {
          'ids': {
            'messages': [
              'Between 1 and 100 records can be deleted at one time.',
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          return true;
        })
        .reply(404, expectedResult);

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-137] Error returns when executing with wrong type of parameter for app', () => {
      const data = {
        app: -1,
        ids: [2]
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'aDykOjQtI48loGMo8hDC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1']
          }
        }
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .reply(400, expectedResult);

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[Record-139] Error displays when number of records is > 100', () => {
      const data = {
        app: 1,
        ids: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
          30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
          57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
          84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103
        ]
      };
      const expectedResult = {
        'code': 'CB_VA01',
        'id': 'RWt7OV6Pa40r1E3a2hgb',
        'message': 'Missing or invalid input.',
        'errors': {
          'ids': {
            'messages': [
              'Between 1 and 100 records can be deleted at one time.'
            ]
          }
        }
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody.app).toEqual(data.app);
          expect(rqBody.ids).toEqual(data.ids);
          return true;
        })
        .reply(400, expectedResult);

      const deleteRecordsResult = recordModule.deleteRecords(data.app, data.ids);
      return deleteRecordsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

  });
});
