console.log = function (msg) {
    var txt = document.createTextNode(msg + '\n');
    document.body.appendChild(txt);
};

// require unit test modules dynamically so
// console.log is overridden first
require('./unit/state.test.js');
