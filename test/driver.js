// 
// A Selenium driver that logs browser console logs.
//
// Default to using Firefox. This can be overridden at runtime by
// setting the SELENIUM_BROWSER environment variable.
// 

const { Builder, logging } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');
 

// provide access to console logs in Chrome
const prefs = new logging.Preferences()
prefs.setLevel(logging.Type.BROWSER, logging.Level.ALL);

const driver = module.exports = new Builder()
  .forBrowser('firefox')
  .setLoggingPrefs(prefs)
  .setFirefoxOptions(
    // provide access to console logs in Firefox
    new firefox.Options()
      .headless()
      .setPreference('devtools.console.stdout.content', true)
  )
  .setChromeOptions(new chrome.Options().headless())
  .setChromeService(
    new chrome.ServiceBuilder()
      //.enableVerboseLogging()
      .setStdio('inherit')
  )
  .setEdgeService(
    process.platform === 'win32'
      ? new edge.ServiceBuilder()
          //.enableVerboseLogging()
          .setStdio('inherit')
      : null
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
        console.log('HI WEB CONSOLE')
        console.log('HI WEB CONSOLE')
        console.log('HI WEB CONSOLE')
        console.log('HI WEB CONSOLE')
        console.log('HI WEB CONSOLE')
        console.log('HI WEB CONSOLE')
        console.log('HI WEB CONSOLE')
      `);
      // Get Chrome logs in a non-standard way, Firefox throws here, will not implement.
      // https://github.com/mozilla/geckodriver/issues/284
      await driver.manage().logs().get(logging.Type.BROWSER).then(console.log);
    } catch(err) {
      console.error(err)
    } finally {
      if (driver) {
        await driver.quit()
      }
    }
  })();
}
