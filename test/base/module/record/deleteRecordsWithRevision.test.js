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

describe('deleteRecordsWithRevision function', () => {
  describe('common case', () => {
    it('should return the promise', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          1: 1,
          2: 1
        }
      };
      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE')
        .reply(200, {});
      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      expect(deleteRecordsWithRevisionResult).toHaveProperty('then');
      expect(deleteRecordsWithRevisionResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[Record-140] Record is deleted when specifying only 1 id+revision', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          '1': 1
        }
      };

      const expectBody = {
        'app': 1,
        'ids': ['1'],
        'revisions': [1]
      };


      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json;charset=utf-8'));
          return true;
        })
        .reply(200, {});

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.then((rsp) => {
        expect(rsp).toEqual({});
      });
    });

    it('[Record-151] Records are deleted successfully for app in guest space', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          '1': 1,
          '2': 4
        }
      };

      const expectBody = {
        'app': 1,
        'ids': ['1', '2'],
        'revisions': [1, 4]
      };

      const connGuestSpace = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
      const recordInGuestSpace = new Record(connGuestSpace);
      nock(URI)
        .intercept(API_ROUTE.GUEST_RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json;charset=utf-8'));
          return true;
        })
        .reply(200, {});

      const deleteRecordsWithRevisionResult = recordInGuestSpace.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.then((rsp) => {
        expect(rsp).toEqual({});
      });
    });

    it('[Record-152] Records are deleted successfully when use with interger as string type (input string for interger and vice versa) ', () => {
      const data = {
        appID: '1',
        idsWithRevision: {
          '1': 1,
          '2': 4
        }
      };

      const expectBody = {
        'app': '1',
        'ids': ['1', '2'],
        'revisions': [1, 4]
      };

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json;charset=utf-8'));
          return true;
        })
        .reply(200, {});

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.then((rsp) => {
        expect(rsp).toEqual({});
      });
    });

    it('[Record-141] Records are deleted when specifying array of ids+revisions', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          '1': 1,
          '2': 4
        }
      };

      const expectBody = {
        'app': 1,
        'ids': ['1', '2'],
        'revisions': [1, 4]
      };


      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json;charset=utf-8'));
          return true;
        })
        .reply(200, {});

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.then((rsp) => {
        expect(rsp).toEqual({});
      });
    });

    it('[Record-153] The number of records that can be deleted at once is 100', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          '1': '1', '2': '1', '3': '1', '4': '1', '5': '1', '6': '1', '7': '1', '8': '1', '9': '1', '10': '1', '11': '1', '12': '1', '13': '1',
          '14': '1', '15': '1', '16': '1', '17': '1', '18': '1', '19': '1', '20': '1', '21': '1', '22': '1', '23': '1', '24': '1', '25': '1',
          '26': '1', '27': '1', '28': '1', '29': '1', '30': '1', '31': '1', '32': '1', '33': '1', '34': '1', '35': '1', '36': '1', '37': '1',
          '38': '1', '39': '1', '40': '1', '41': '1', '42': '1', '43': '1', '44': '1', '45': '1', '46': '1', '47': '1', '48': '1', '49': '1',
          '50': '1', '51': '1', '52': '1', '53': '1', '54': '1', '55': '1', '56': '1', '57': '1', '58': '1', '59': '1', '60': '1', '61': '1',
          '62': '1', '63': '1', '64': '1', '65': '1', '66': '1', '67': '1', '68': '1', '69': '1', '70': '1', '71': '1', '72': '1', '73': '1',
          '74': '1', '75': '1', '76': '1', '77': '1', '78': '1', '79': '1', '80': '1', '81': '1', '82': '1', '83': '1', '84': '1', '85': '1',
          '86': '1', '87': '1', '88': '1', '89': '1', '90': '1', '91': '1', '92': '1', '93': '1', '94': '1', '95': '1', '96': '1', '97': '1',
          '98': '1', '99': '1', '100': '1'
        }
      };

      const expectBody = {
        'app': 1,
        'ids': [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
          '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46',
          '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68',
          '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
          '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'
        ],
        'revisions': [
          '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
          '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
          '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
          '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'
        ]
      };

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json;charset=utf-8'));
          return true;
        })
        .reply(200, {});

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.then((rsp) => {
        expect(rsp).toEqual({});
      });
    });
  });

  describe('error case', () => {
    it('[Record-142] Error is displayed when the id is not existed in the app', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          2: 4,
          4444: 1
        }
      };

      const expectBody = {
        'app': 1,
        'ids': ['2', '4444'],
        'revisions': [4, 1]
      };
      const expectResult = {'code': 'GAIA_RE01', 'id': 'IBcz0R6tmn0b06i88cdt', 'message': 'The specified record (ID: 4444) is not found.'};

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(404, expectResult);

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-143] Error is displayed when the revision is not correct', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          2: 11
        }
      };

      const expectBody = {
        'app': 1,
        'ids': ['2'],
        'revisions': [11]
      };
      const expectResult = {
        'code': 'GAIA_CO02',
        'id': 'oFadhvfaE1j88wNHmhn2',
        'message': 'The revision is not the latest. Someone may update a record.'
      };

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(409, expectResult);

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-144] Error is displayed when the revision is not correct', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          2: -1
        }
      };

      const expectBody = {
        'app': 1,
        'ids': ['2'],
        'revisions': [-1]
      };
      const expectResult = {
        'code': 'GAIA_CO02',
        'id': 'oFadhvfaE1j88wNHmhn2',
        'message': 'The revision is not the latest. Someone may update a record.'
      };

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(200, {});

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-145] Error happens when user does not have Delete permission for app', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          2: 11
        }
      };

      const expectBody = {
        'app': 1,
        'ids': ['2'],
        'revisions': [11]
      };
      const expectResult = {'code': 'CB_NO02', 'id': 'oKRIYVazSkB4H2CC7txn', 'message': 'No privilege to proceed.'};

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(403, expectResult);

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-146] Error happens when user does not have Delete permission for record', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          2: 11
        }
      };

      const expectBody = {
        'app': 1,
        'ids': ['2'],
        'revisions': [11]
      };
      const expectResult = {'code': 'CB_NO02', 'id': 'WBOTx9jU4RpBh5RKYfyv', 'message': 'No privilege to proceed.'};

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(403, expectResult);

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-148] Error will be displayed when using invalid app ID (unexisted, negative number, 0)', () => {
      const data = {
        appID: 99999,
        idsWithRevision: {
          2: 11
        }
      };

      const expectBody = {
        'app': 99999,
        'ids': ['2'],
        'revisions': [11]
      };
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'WBOTx9jU4RpBh5RKYfyv',
        'message': 'The app (ID: 99999) not found. The app may have been deleted.'
      };

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(403, expectResult);

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-149] Error will be displayed when using method without app ID', () => {
      const data = {
        appID: undefined,
        idsWithRevision: {
          2: 11
        }
      };

      const expectBody = {
        'ids': ['2'],
        'revisions': [11]
      };
      const expectResult = {'code': 'CB_IJ01', 'id': 'WBOTx9jU4RpBh5RKYfyv', 'message': 'Missing or invalid input.'};

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(undefined, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-150] Error will be displayed when using method without ids/revisions', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
        }
      };

      const expectBody = {
        'app': 1,
        'ids': [],
        'revisions': []
      };
      const expectResult = {'code': 'CB_IJ01', 'id': 'mcK2gEgAgS7HdEOLQSXj', 'message': 'Invalid JSON string.'};

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .reply(400, expectResult);

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, undefined);
      return deleteRecordsWithRevisionResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

    it('[Record-154] Error displays when number of records is > 100', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          '1': '1', '2': '1', '3': '1', '4': '1', '5': '1', '6': '1', '7': '1', '8': '1', '9': '1', '10': '1', '11': '1', '12': '1', '13': '1',
          '14': '1', '15': '1', '16': '1', '17': '1', '18': '1', '19': '1', '20': '1', '21': '1', '22': '1', '23': '1', '24': '1', '25': '1',
          '26': '1', '27': '1', '28': '1', '29': '1', '30': '1', '31': '1', '32': '1', '33': '1', '34': '1', '35': '1', '36': '1', '37': '1',
          '38': '1', '39': '1', '40': '1', '41': '1', '42': '1', '43': '1', '44': '1', '45': '1', '46': '1', '47': '1', '48': '1', '49': '1',
          '50': '1', '51': '1', '52': '1', '53': '1', '54': '1', '55': '1', '56': '1', '57': '1', '58': '1', '59': '1', '60': '1', '61': '1',
          '62': '1', '63': '1', '64': '1', '65': '1', '66': '1', '67': '1', '68': '1', '69': '1', '70': '1', '71': '1', '72': '1', '73': '1',
          '74': '1', '75': '1', '76': '1', '77': '1', '78': '1', '79': '1', '80': '1', '81': '1', '82': '1', '83': '1', '84': '1', '85': '1',
          '86': '1', '87': '1', '88': '1', '89': '1', '90': '1', '91': '1', '92': '1', '93': '1', '94': '1', '95': '1', '96': '1', '97': '1',
          '98': '1', '99': '1', '100': '1', '101': '1'
        }
      };

      const expectBody = {
        'app': 1,
        'ids': [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
          '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47',
          '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
          '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93',
          '94', '95', '96', '97', '98', '99', '100', '101'
        ],
        'revisions': [
          '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
          '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
          '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
          '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'
        ]
      };
      const expectResult = {'code': 'CB_VA01', 'id': 'fI40R4N5Kg6XFzDppGIf', 'message': '入力内容が正しくありません。'};

      nock(URI)
        .intercept(API_ROUTE.RECORDS, 'DELETE', (rqBody) => {
          expect(rqBody).toEqual(expectBody);
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .matchHeader('Content-Type', (type) => {
          expect(type).toEqual(expect.stringContaining('application/json;charset=utf-8'));
          return true;
        })
        .reply(400, expectResult);

      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      return deleteRecordsWithRevisionResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });

  });
});
