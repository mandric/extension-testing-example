// 
// A Selenium driver that logs browser console logs.
//
// Defaults to using Firefox.  This can be overridden at runtime by setting the
// `SELENIUM_BROWSER` environment variable.
//
// In Firefox, the trick to get log output was to use version >= 65 and set the
// `devtools.console.stdout.content` preference plus `setStdio('inherit')`
// call.
//
// For Chrome, you need to extract them. See
// https://github.com/mozilla/geckodriver/issues/284 await
// driver.manage().logs().get(logging.Type.BROWSER).then(console.log);
//

const HEADLESS = process.env.SELENIUM_HEADLESS == 'false' ? false: true

const { Builder, logging } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const chrome = require('selenium-webdriver/chrome')

// provide access to console logs in Chrome
const prefs = new logging.Preferences()
prefs.setLevel(logging.Type.BROWSER, logging.Level.ALL)

const options = browser => {
  let opts
  if (browser === 'chrome') {
    opts = new chrome.Options()
  } else {
    opts = new firefox.Options()
      // provide access to console logs in Firefox
      .setPreference('devtools.console.stdout.content', true)
  }
  if (HEADLESS) {
    opts.headless()
  }
  return opts
}

const driver = module.exports = new Builder()
  .forBrowser('firefox')
  .setLoggingPrefs(prefs)
  .setFirefoxOptions(options())
  .setChromeOptions(options('chrome'))
  .setChromeService(
    new chrome.ServiceBuilder()
      //.enableVerboseLogging()
      .setStdio('inherit')
  )
  .setFirefoxService(
    new firefox.ServiceBuilder()
      //.enableVerboseLogging()
      .setStdio('inherit')
  )
  .build()

if (require.main === module) {
  // run test if not called via require
  (async function() {
    try {
      await driver.executeScript(`
        console.log('AHOY WEB CONSOLE!')
      `);
      try {
        // Needed for Chrome. Firefox throws here, will not implement.
        // https://github.com/mozilla/geckodriver/issues/284
        await driver.manage().logs().get(logging.Type.BROWSER).then(console.log);
      } catch(err) {
        console.warn(err)
      }
    } catch(err) {
      console.error(err)
    } finally {
      if (driver) {
        await driver.quit()
      }
    }
  })();
}
