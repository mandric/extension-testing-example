import browser from './browser.js'

const createTab = opts => {
  return browser.tabs.create(opts) 
}

const getTab = id => {
  return browser.tabs.get(id)
}

const getTabBadgeText = tabId => {
  return browser.browserAction.getBadgeText({ tabId })
}

export {
  getTab,
  createTab,
  getTabBadgeText
}


