import 'mocha/mocha.js';
import 'mocha/mocha.css';

let tap = document.getElementById('tap');

function log(msg) {
    let txt = document.createTextNode(msg + '\n');
    tap.appendChild(txt);
}

// Return a TAP-safe title of `test`
function title(test) {
    return test.fullTitle().replace(/#/g, '');
}

function tapReporter(runner) {
    let n = 1;
    let passes = 0;
    let failures = 0;
    let skips = 0;
    runner.on('start', function(){
        log('TAP version 13');
    });
    runner.on('test end', function(){
        ++n;
    });
    runner.on('pending', function(test){
        skips++;
        log('ok ' + n + ' ' + title(test) + ' # SKIP -');
    });
    runner.on('pass', function(test){
        passes++;
        log('ok ' + n + ' ' + title(test));
    });
    runner.on('fail', function(test, err){
        failures++;
        log('not ok ' + n + ' ' + title(test));
        log('  ---');
        log(('' + err).replace(/^/gm, '    '));
        log('  ...');
    });
    runner.on('end', function(){
        var total = runner.grepTotal(runner.suite);
        log('\n1..' + total);
        log('# tests ' + (passes + failures + skips));
        log('# pass ' + passes);
        log('# fail ' + failures);
        log('# skip ' + skips);
    });
}

window.mocha.setup({
    ui: 'bdd',
    reporter: tapReporter
});
