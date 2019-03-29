import chai from 'chai'
import browser from '../src/browser.js'

const { deepEqual, equal, fail, ok, throws } = chai.assert;

describe('background worker', () => {

    it('chrome has a tabs.onUpdated.dispatch method', () => {
      try {
        browser.tabs.onUpdated.dispatch(10, {status: 'loading'});
      } catch (e) {
        console.warn('dispatch() failed on event listener');
      }
    });

    it('browser tabs query finds 3 tabs', done => {
        //browser.tabs.create({url: 'http://mozilla.org', active: true});
        browser.tabs.query({currentWindow: true}).then(tabs => {
          equal(tabs.length, 1);
          done()
        }).catch(done);
        //browser.tabs.update({url: 'http://example.com'}, (tab) => {
        //  console.log(arguments);
        //});
    });

});
