import Auth from '../../../../src/node/authentication/Auth';
import Connection from '../../../../src/node/connection/Connection';
import Record from '../../../../src/base/module/record/Record';
import {URI, API_ROUTE, UPDATE_RECORDS_LIMIT, USERNAME, PASSWORD, DOMAIN} from './common';
import nock from 'nock';
import KintoneAPIException from '../../../../src/base/exception/KintoneAPIException';

const auth = new Auth();
auth.setPasswordAuth({username: USERNAME, password: PASSWORD});
const connection = new Connection({auth, domain: DOMAIN});
const recordModule = new Record({connection});

describe('Checking Record.addAllRecords', () => {
  it('should be called successfully', () => {
    const appID = 1;
    const recordsData = [];
    const NUMBER_RECORDS = 2;
    const expectBodys = {'requests': []};
    const expectResults = {'results': []};
    const resultsIds = [];
    const resultsRevisons = [];
    for (let index = 0; index < NUMBER_RECORDS; index++) {
      recordsData.push({
        Text: {
          value: 'test'
        }
      });

      resultsIds.push(index);
      resultsRevisons.push(index);
    }
    const loopTimes = Math.ceil(NUMBER_RECORDS / UPDATE_RECORDS_LIMIT);

    for (let index = 0; index < loopTimes; index++) {
      const start = index * UPDATE_RECORDS_LIMIT;
      const end = start + UPDATE_RECORDS_LIMIT;
      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'POST',
        'payload': {
          'app': appID,
          'records': recordsData.slice(start, end)
        }
      });
      expectResults.results.push({
        'ids': resultsIds.slice(start, end),
        'revisions': resultsRevisons.slice(start, end)
      });
    }

    nock(URI)
      .post(API_ROUTE.BULK, (rqBody) => {
        expect(rqBody).toHaveProperty('requests');
        expect(rqBody).toEqual(expectBodys);
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, expectResults);
    const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
    return addRecordsResult.then((rsp) => {
      expect(rsp).toHaveProperty('results');
      expect(rsp).toMatchObject(expectResults);
      expect(rsp.results[0].ids.length).toEqual(expectResults.results[0].ids.length);
      expect(rsp.results[0].revisions.length).toEqual(expectResults.results[0].revisions.length);
    });
  });

  it('should be called successfully with 200 record', () => {
    const appID = 1;
    const recordsData = [];
    const NUMBER_RECORDS = 200;
    const expectBodys = {'requests': []};
    const expectResults = {'results': []};
    const resultsIds = [];
    const resultsRevisons = [];
    for (let index = 0; index < NUMBER_RECORDS; index++) {
      recordsData.push({
        Text: {
          value: 'test'
        }
      });

      resultsIds.push(index);
      resultsRevisons.push(index);
    }
    const loopTimes = Math.ceil(NUMBER_RECORDS / UPDATE_RECORDS_LIMIT);

    for (let index = 0; index < loopTimes; index++) {
      const start = index * UPDATE_RECORDS_LIMIT;
      const end = start + UPDATE_RECORDS_LIMIT;
      expectBodys.requests.push({
        'api': API_ROUTE.RECORDS,
        'method': 'POST',
        'payload': {
          'app': appID,
          'records': recordsData.slice(start, end)
        }
      });
      expectResults.results.push({
        'ids': resultsIds.slice(start, end),
        'revisions': resultsRevisons.slice(start, end)
      });
    }

    nock(URI)
      .post(API_ROUTE.BULK, (rqBody) => {
        expect(rqBody).toHaveProperty('requests');
        expect(rqBody).toEqual(expectBodys);
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, expectResults);
    const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
    return addRecordsResult.then((rsp) => {
      expect(rsp).toHaveProperty('results');
      expect(rsp).toMatchObject(expectResults);
      expect(rsp.results[0].ids.length).toEqual(expectResults.results[0].ids.length);
      expect(rsp.results[0].revisions.length).toEqual(expectResults.results[0].revisions.length);
    });
  });

  it('should be called successfully with 2100 record', () => {
    const appID = 1;
    const recordsData = [];
    const NUMBER_RECORDS = 2100;
    const numBulk = 2;
    const limitRequest = 20;
    const expectBodys = [];
    const expectResults = [];
    const finalResults = {'results': []};
    const resultsIds = [];
    const resultsRevisons = [];
    for (let index = 0; index < NUMBER_RECORDS; index++) {
      recordsData.push({
        Text: {
          value: 'test'
        }
      });

      resultsIds.push(index);
      resultsRevisons.push(index);
    }
    const loopTimes = Math.ceil(NUMBER_RECORDS / UPDATE_RECORDS_LIMIT);

    for (let i = 0; i < numBulk; i++) {
      expectBodys.push({'requests': []});
      expectResults.push({'results': []});
      for (let index = 0; index < loopTimes; index++) {
        const start = index * UPDATE_RECORDS_LIMIT;
        const end = NUMBER_RECORDS - (start + UPDATE_RECORDS_LIMIT) < UPDATE_RECORDS_LIMIT ? NUMBER_RECORDS : start + UPDATE_RECORDS_LIMIT;
        if (i < (numBulk - 1) && expectBodys[i].requests.length < limitRequest || i === (numBulk - 1) && (index < (loopTimes - (i * limitRequest)))) {
          expectBodys[i].requests.push({
            'api': API_ROUTE.RECORDS,
            'method': 'POST',
            'payload': {
              'app': appID,
              'records': recordsData.slice(start, end)
            }
          });
          expectResults[i].results.push({
            'ids': resultsIds.slice(start, end),
            'revisions': resultsRevisons.slice(start, end)
          });
        }
      }
      finalResults.results = finalResults.results.concat(expectResults[i].results);
    }

    nock(URI)
      .post(API_ROUTE.BULK, (rqBody) => {
        expect(rqBody).toHaveProperty('requests');
        expect(rqBody).toEqual(expectBodys[0]);
        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, expectResults[0])
      .post(API_ROUTE.BULK, (rqBody) => {
        expect(rqBody).toHaveProperty('requests');
        expect(rqBody).toEqual(expectBodys[1]);

        return true;
      })
      .matchHeader('Content-Type', (type) => {
        expect(type).toEqual(expect.stringContaining('application/json'));
        return true;
      })
      .reply(200, expectResults[1]);
    const addRecordsResult = recordModule.addAllRecords({app: appID, records: recordsData});
    return addRecordsResult.then((rsp) => {
      expect(rsp).toHaveProperty('results');
      expect(rsp.results).toMatchObject(finalResults.results);
      expect(rsp.results[0].ids.length).toEqual(finalResults.results[0].ids.length);
      expect(rsp.results[0].revisions.length).toEqual(finalResults.results[0].revisions.length);
    });
  });

  it('should throw error when fail to add records', () => {
    const appID = 99999;
    const recordsData = [];
    recordsData.push({
      Text: {
        value: 'test'
      }
    });
    const expectResult = {
      'results': [
        {
          'message': 'Record(id:appID)NotFound.',
          'id': '1505999166-1721668264',
          'code': 'GAIA_RE01'
        }
      ]
    };
    nock(URI)
      .post(API_ROUTE.BULK, (rqBody) => {
        expect(rqBody).toHaveProperty('requests');
        return true;
      })
      .reply(400, expectResult);

    const addRecordResult = recordModule.addAllRecords({app: appID, records: recordsData});
    return addRecordResult.catch((err) => {
      expect(err.results[0]).toBeInstanceOf(KintoneAPIException);
      expect(err.results[0].errorResponse).toMatchObject(expectResult.results[0]);
    });
  });
});