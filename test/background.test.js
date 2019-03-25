import { expect } from 'chai'
import browser from '../src/browser.js'

// Messing with browser calls
describe('background worker', function () {

    it('sets badge value when tab is activated', () => {
      // can't decide if I should do this test with mocks or in an actual browser
    });

    it('chrome has a tabs.onUpdated.dispatch method', () => {
      try {
        browser.tabs.onUpdated.dispatch(10, {status: 'loading'});
      } catch (e) {
        console.warn('dispatch() failed on event listener');
      }
    });

    it('browser has tabs has a query method', () => {
        //browser.tabs.create({url: 'http://mozilla.org', active: true});
        browser.tabs.query({currentWindow: true}).then(tabs => {
            console.log('tabs', tabs);
        });
        //browser.tabs.update({url: 'http://example.com'}, (tab) => {
        //  console.log(arguments);
        //});
    });

});
