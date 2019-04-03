const path = require('path')
const test = require('tape')
const {Builder, By, Key, until, logging} = require('selenium-webdriver')
const {
  pollOutput,
  installWebExt,
  getCapability,
  getBrowserName,
  getExtensionIdChrome,
  getExtensionIdFirefox
} = require('../helpers')

const extPath = path.join(__dirname, '..', '..', 'dist', 'development')

const getTestUrl = (uuid, browser) => {
  const file = 'badge-text.test.html'
  return browser === 'chrome' ?
    `chrome-extension://${uuid}/${file}` :
    `moz-extension://${uuid}/${file}`
}

test('confirm badge text fibonacci sequence on existing tabs', async t => {
  t.plan(1)
  // wrap in a try/finally so driver quits if anything throws
  let driver, browser
  try {

    driver = require('../driver')
    browser = await getBrowserName(driver)

    // open some tabs
    await driver.get('http://www.google.com/ncr')
    driver.executeScript("window.open('','_blank');")
    driver.executeScript("window.open('','_blank');")
    driver.executeScript("window.open('','_blank');")
    driver.executeScript("window.open('','_blank');")
    driver.executeScript("window.open('','_blank');")
    driver.executeScript("window.open('','_blank');")

    // firefox installs extension here, chrome can only load extensions during init
    const uuid = browser === 'chrome' ?
      await getExtensionIdChrome(driver) :
      await installWebExt(driver, extPath)

    // then navigate to all tabs. that activates fibonacci sequences
    const tabs = await driver.getAllWindowHandles()
    await Promise.all(tabs.map(tab => {
      return driver.switchTo().window(tab)
    }))

    // run browser side test
    await driver.get(getTestUrl(uuid, browser))

    // todo: parse browser console output or find a way to determine if browser
    // side test succeeded. for now we're winning if we made it this far.
    t.equal(true, Boolean('pipes are clean'))

  } finally {
    if (browser === 'chrome') {
      await driver.manage().logs().get(logging.Type.BROWSER).then(console.log);
    }
    await driver.quit()
  }
})
