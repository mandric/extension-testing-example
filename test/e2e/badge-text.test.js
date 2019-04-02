const path = require('path')
const test = require('tape')
const {Builder, By, Key, until} = require('selenium-webdriver')

const { pollOutput, installWebExt } = require('../helpers')

const extPath = path.join(__dirname, '..', '..', 'dist', 'development')

test('confirm badge text fibonacci sequence on existing tabs', async t => {
  t.plan(1)
  let driver = require('../driver')
  try {
    await driver.get('http://www.google.com/ncr')
    driver.executeScript("window.open('','_blank');")
    driver.executeScript("window.open('','_blank');")
    driver.executeScript("window.open('','_blank');")
    driver.executeScript("window.open('','_blank');")
    driver.executeScript("window.open('','_blank');")
    driver.executeScript("window.open('','_blank');")

    const uuid = await installWebExt(driver, extPath)
    const expected = [0,1,1,2,3,5,8,13]
    const tabs = await driver.getAllWindowHandles()
    await Promise.all(tabs.map(tab => {
      return driver.switchTo().window(tab)
    }))
    const url = `moz-extension://${uuid}/test.html`
    await driver.get(url)
    const _tabs = await driver.executeScript(`
      return browser.tabs.query({ currentWindow: true })
    `)
    //console.log('tabs',tabs)
    const results = await Promise.all(_tabs.map(async tab => {
      return Number(await driver.executeScript(`
        return browser.browserAction.getBadgeText({ tabId: ${tab.id} })
      `))
    }))
    t.deepEqual(results, expected)
  } finally {
    await driver.quit()
  }
})

const _trash = `
const test = require('tape')
const browser from '../../src/browser.js'

test('confirm badge text fibonacci sequence on 8 existing tabs', async t => {
  t.plan(1)
  try {
    const expected = [0,1,1,2,3,5,8,13]
    const tabs = await browser.tabs.query({ currentWindow: true })
    const results = await Promise.all(tabs.map(tab => {
      return Number(browser.browserAction.getBadgeText({ tabId: tab.id }))
    }))
    t.deepEqual(results, expected)
  } catch(e) {
    t.end(e)
  }
})
`
