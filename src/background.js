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
 */

'use strict';

const state = require('./state');

module.exports = (browser) => {

function setBadge(str, id) {
  browser.browserAction.setBadgeText({
    text: String(str),
    tabId: id
  });
}

function tabActivated(props) {
  const id = props.tabId;
  setBadge(state.getVal(id), id);
}

/*
 * Not sure whether to use 'loading' or 'complete' event.  If you use loading
 * then the request might never complete, if you use complete then UI update is
 * delayed.
 */
function tabUpdated(id, props = {}, tab = {}) {
  let val = state.getVal(id);
  if (props.status === 'loading') {
    val = state.nextVal(id);
  }
  setBadge(val, id);
}

function tabRemoved(id, props) {
  state.unset(id);
}

browser.tabs.onActivated.addListener(tabActivated);
browser.tabs.onUpdated.addListener(tabUpdated);
browser.tabs.onRemoved.addListener(tabRemoved);

// ignoring `onCreated` because a new tab also immediately calls a
// updated/loaded event so then you need to avoid updating the same tab twice.
// browser.tabs.onCreated.addListener(tabCreated);

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
