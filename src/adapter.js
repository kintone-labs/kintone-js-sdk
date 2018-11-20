const adapter = {};
const isBrowser = function() {
  try {
    return (this === window);
  } catch (e) {
    return false;
  }
};
const isNode = function() {
  try {
    return this === global;
  } catch (e) {
    return false;
  }
};

adapter.detectEnvironment = () => {
  if (isBrowser()) {
    return 'Browser';
  }
  if (isNode()) {
    return 'Node';
  }
  return 'Base';
};

module.exports = adapter;