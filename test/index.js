import 'mocha/mocha.js';
import 'mocha/mocha.css';

window.mocha.setup('bdd');

// need to require these dynamically because they rely on globals from
// window.mocha being present
require('./state.test.js');
require('./background.test.js');

window.mocha.run();
