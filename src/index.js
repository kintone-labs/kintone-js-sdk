const adapter = require('./adapter');

const env = adapter.detectEnvironment();
let jsSDK;

if (env === 'Node') {
  jsSDK = require('./node/main');
} else if (env === 'Browser') {
  jsSDK = require('./browser/main');
} else {
  jsSDK = require('./base/main');
}

module.exports = jsSDK;