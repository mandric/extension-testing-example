import './runner.js'

// need to require these dynamically because they rely on globals from
// window.mocha being present
require('./state.test.js');
require('./background.test.js');

window.mocha.run();
