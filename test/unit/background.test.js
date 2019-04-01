import {test} from 'tape-catch';

test('background worker - chrome has a tabs.onUpdated.dispatch method', (t) => {
    browser.tabs.onUpdated.dispatch(10, {status: 'loading'});
    t.end();
});

test('background worker - browser tabs query finds 1 tab', (t) => {
    return browser.tabs.query({currentWindow: true}).then(tabs => {
        t.equal(tabs.length, 1);
        t.end();
    });
});
