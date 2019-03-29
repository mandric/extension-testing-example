const test = require('tape')
const browser from '../../src/browser.js'

test('confirm badge text fibonacci sequence on 8 existing tabs', async t => {
  t.plan(1)
  try {
    const expected = [0,1,1,2,3,5,8,13]
    const tabs = await browser.tabs.query({ currentWindow: true })
    const results = await Promise.all(tabs.map(tab => {
      return browser.browserAction.getBadgeText({ tabId: tab.id })
    }))
    t.deepEqual(results, expected)
  } catch(e) {
    t.end(e)
  }
})
