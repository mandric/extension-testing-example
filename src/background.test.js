import chai from './chai.js'
import browser from './browser.js'

const expect = chai.expect

console.log('testing background worker');

/*
 * Nothing is exported from background.js atm, so here just test similar calls
 * it makes to browser.
 */
describe('background worker', function () {
  it('sets badge value when tab is activate', () => {
    //chrome.tabs.onUpdated(); const tabUpdated = (id, props = {}, tab = {}) => {
    browser.tabs.onUpdated.dispatch(10, {status: 'loading'});
    //chrome.tabs.create({url: '', active: true});
    /*browser.tabs.query({currentWindow: true}, allTabs => {
      console.log('allTabs');
      console.log(allTabs);
    });
    */
    //chrome.tabs.update({url: 'http://example.com'}, (tab) => {
    //  console.log(arguments);
    //});
  });
  it('can determine truth', () => {
    expect(Boolean('truth')).to.be.true;
  });
});
