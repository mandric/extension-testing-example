/*
 * Webonacci
 *
 * Maintain Fibonacci sequence and tab id mappings. Then when tab events
 * (activated, loaded new content) are fired set the badge text to the existing
 * value or calculate the next one.
 *
 * When browser extension is refreshed then everything gets reinitialized, a
 * reset button on the popup does that.  Feels like a hack but works for
 * now.
 *
 */

import state from './state.js'
import browser from './browser.js'

const setBadge = (str, id) => {
  console.info('setBadge', str, id);
  browser.browserAction.setBadgeText({
    text: String(str),
    tabId: id
  });
}

const tabActivated = props => {
  console.info('tabActivated', props.tabId);
  const id = props.tabId;
  setBadge(state.getVal(id), id);
}

const tabUpdated = (id, props = {}, tab = {}) => {
  console.info('tab update', id, props.status);
  let val = state.getVal(id);
  // Maybe use 'loading' rather than 'complete' event since a request might
  // never complete.
  if (props.status === 'complete') {
    val = state.nextVal(id);
  }
  setBadge(val, id);
}

const tabRemoved = (id, props) => {
  console.info('tabRemoved', id);
  state.unset(id);
}

browser.tabs.onActivated.addListener(tabActivated);
browser.tabs.onUpdated.addListener(tabUpdated);
browser.tabs.onRemoved.addListener(tabRemoved);

/*
 * Initialize tab values and set badge on active tab.
 */
browser.tabs.query({currentWindow: true}).then(allTabs => {
  allTabs.map(tab => {
    let val = state.nextVal(tab.id);
    if (tab.active) {
      setBadge(val, tab.id);
    }
  });
});

/*
 * We could do specific things here during install per userAgent or browser
 * features (preferred).
 */
browser.runtime.onInstalled.addListener(details => {
  console.log('navigator.userAgent', navigator.userAgent);
});
