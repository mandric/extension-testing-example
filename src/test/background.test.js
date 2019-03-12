import chai from './chai.js'
const expect = chai.expect

import browser from '../browser.js'

// Messing with browser calls
describe('background worker', function () {
  //it('sets badge value when tab is activate', () => {
  it('tabs.onUpdated has a dispatch method', () => {
    browser.tabs.onUpdated.dispatch(10, {status: 'loading'})
  })
  it('tabs has a query method', () => {
    //browser.tabs.create({url: 'http://mozilla.org', active: true});
    browser.tabs.query({currentWindow: true}).then((tabs) => {
      console.log('tabs', tabs)
    })
    //browser.tabs.update({url: 'http://example.com'}, (tab) => {
    //  console.log(arguments);
    //});
  })
});
