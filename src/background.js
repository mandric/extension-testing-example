/*
 * Winbonacci
 *
 * Maintain Fibonacci sequence and tab id mappings. Then when tab events
 * (activated, loaded new content) are fired set the badge text to the existing
 * value or calculate the next one.
 *
 * When browser extension is refreshed then everything gets reinitialized, a
 * reset button on the bookmark does that.  Feels like a hack but works for
 * now.
 *
 * Initially using brute force methods, no optimization.  Also there is likely
 * some race conditions under certain loads.
 *
 * Takes a `browser` parameter because we can pass in different APIs (browsers)
 * include a mock API for testing. Only chrome is supported atm.
 *
 * ignoring `onCreated` events because a new tab also immediately emits an
 * updated/loading event so then you need to avoid updating the same tab twice
 * when they are created.
 */

'use strict';

const state = require('./state');

module.exports = (browser) => {

const setBadge = (str, id) => {
  browser.browserAction.setBadgeText({
    text: String(str),
    tabId: id
  });
}

const tabActivated = (props) => {
  const id = props.tabId;
  setBadge(state.getVal(id), id);
}

/*
 * Used 'loading' rather than 'complete' event since a request might never
 * complete.
 */
const tabUpdated = (id, props = {}, tab = {}) => {
  let val = state.getVal(id);
  if (props.status === 'loading') {
    val = state.nextVal(id);
  }
  setBadge(val, id);
}

const tabRemoved = (id, props) => {
  state.unset(id);
}

browser.tabs.onActivated.addListener(tabActivated);
browser.tabs.onUpdated.addListener(tabUpdated);
browser.tabs.onRemoved.addListener(tabRemoved);

/*
 * Initialize tab values and set badge on active tab.
 */
browser.tabs.query({currentWindow: true}, allTabs => {
  allTabs.map(tab => {
    let val = state.nextVal(tab.id);
    if (tab.active) {
      setBadge(val, tab.id);
    }
  });
});

/*
 * We could do specific things when running with puppeteer here by setting and
 * checking userAgent.
 */
browser.runtime.onInstalled.addListener(details => {
  //console.log(navigator.userAgent);
});

}

if (chrome) {
  module.exports(chrome);
}
