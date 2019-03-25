import browser from './browser.js';

document.getElementById('reset').onclick = function(el) {
    browser.runtime.reload();
};

if (DEVELOPMENT) {
    document.getElementById('test').onclick = function(el) {
        window.open(browser.extension.getURL("test.html"), '_blank');
    };
} else {
    document.body.removeChild(document.getElementById('test'));
}
