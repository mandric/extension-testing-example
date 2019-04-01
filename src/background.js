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

import state from './state.js';
import browser from './browser.js';

state.subscribe((state) => {
    browser.browserAction.setBadgeText({
        text: String(state.tabs[state.current_tab]),
        tabId: state.current_tab
    });
});

browser.tabs.onActivated.addListener((props) => {
    state.dispatch({
        type: 'TAB_ACTIVATED',
        id: props.tabId
    });
});

browser.tabs.onUpdated.addListener((id, props = {}, tab = {}) => {
    state.dispatch({
        type: 'TAB_UPDATED',
        id: id
    });
});

browser.tabs.onRemoved.addListener((id, props) => {
    state.dispatch({
        type: 'TAB_REMOVED',
        id: id
    });
});

browser.tabs.query({currentWindow: true}).then(allTabs => {
    allTabs.map(tab => {
        state.dispatch({
            type: 'TAB_UPDATED',
            id: tab.id
        });
        if (tab.active) {
            state.dispatch({
                type: 'TAB_ACTIVATED',
                id: tab.id
            });
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
