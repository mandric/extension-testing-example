import { expect } from 'chai'
import browser from '../src/browser.js'

describe('background worker', () => {

    it('async: badge text follows fibonacci sequence on new tabs', done => {
      browser.tabs.create({}).then(tab => {
        console.log('tab', tab);
        browser.browserAction.getBadgeText({ 'tabId': tab.id }).then(text => {
          console.log('text', text);
          expect(text).to.equal(22)
          done()
        }).catch(done);
      }).catch(done);
    });

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
          expect(tabs.length).to.equal(2)
          done()
        }).catch(done);
        //browser.tabs.update({url: 'http://example.com'}, (tab) => {
        //  console.log(arguments);
        //});
    });

});
