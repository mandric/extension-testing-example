const {Builder, By, Key, until} = require('selenium-webdriver');

// todo open 8 tabs to setup the badge text extension test
(async function example() {
  //let driver = await new Builder().forBrowser('firefox').build()
  let driver = require('../driver')
  try {
    await driver.get('http://www.google.com/ncr')
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
  } finally {
    await driver.quit()
  }
})()
