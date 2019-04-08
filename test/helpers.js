'use strict';
const Command = require("selenium-webdriver/lib/command").Command
const { By } = require('selenium-webdriver')
const promiseRetry = require("promise-retry");
const path = require("path");
const fs = require("fs");
const vm = require("vm");

const driver = require('./driver');

// converts mozilla addon id to uuid by reading prefs.js
async function getUUID(path, id) {
    const src = fs.readFileSync(path, 'utf8');
    // load uuid for extension from prefs.js
    let uuid = null;
    const user_pref = (key, val) => {
        if (key === 'extensions.webextensions.uuids') {
            const uuids = JSON.parse(val);
            uuid = uuids[id];
        }
    };
    const context = vm.createContext({ user_pref });
    await vm.runInContext(src, context);
    if (!uuid) {
        throw new Error('UUID not defined');
    }
    return uuid;
}

async function getBrowserName(driver) {
  return getCapability(driver, 'browserName')
}

async function getCapability(driver, key) {
  return driver.getCapabilities().then(caps => {
    return caps.get(key)
  });
}

async function getExtensionIdChrome (driver) {
  await driver.get('chrome://extensions')
  const uuid = await driver.executeScript('return document.querySelector("extensions-manager").shadowRoot.querySelector("extensions-item-list").shadowRoot.querySelector("extensions-item:nth-child(2)").getAttribute("id")')
  return uuid 
}

async function getExtensionIdFirefox (driver) {
  await driver.get('about:debugging#addons')
  const uuid = await driver.findElement(By.css('dd.addon-target-info-content:nth-child(6) > span:nth-child(1)')).getText()
  return uuid
}

async function installWebExt(driver, extension) {
  const browser = await getBrowserName(driver)
  if (browser === 'firefox') {
    return installWebExtFirefox(driver, extension)
  } else if (browser  === 'chrome') {
    //return installWebExtChrome(driver, extension)
    throw new Error(`${browser} can only install extensions at driver construction time`)
  } else {
    throw new Error(`${browser} extension install not supported.`)
  }
}

function old() {
  const options = new chrome.Options();
  options.addArguments([
    `--load-extension=${extension}`,
    // See https://docs.travis-ci.com/user/chrome and issue #85 for a rationale.
    //"--no-sandbox",
  ]);
  if (process.env.TEST_NATIVE_CRX_BINDINGS === "1") {
    console.warn("NOTE: Running tests on a Chrome instance with NativeCrxBindings enabled.");
    options.addArguments([
      "--enable-features=NativeCrxBindings",
    ]);
  }
//ChromeOptions options = new ChromeOptions();
//options.addArguments("load-extension=/path/to/extension");
//DesiredCapabilities capabilities = new DesiredCapabilities();
//capabilities.setCapability(ChromeOptions.CAPABILITY, options);
//ChromeDriver driver = new ChromeDriver(capabilities);
}

async function newinstallWebExtFirefox(driver, extension) {
    const command = new Command("install addon")
      .setParameter("path", path.resolve(extension))
      .setParameter("temporary", true)
    return await driver.execute(command).then(uuid => {
      console.log('uuid', uuid)
      return uuid
    })
}

async function installWebExtFirefox(driver, extension) {
    const cmd = new Command('moz-install-web-ext')
              .setParameter('path', path.resolve(extension))
              .setParameter('temporary', true);

    const executor = driver.getExecutor();
    executor.defineCommand(
        cmd.getName(),
        'POST',
        '/session/:sessionId/moz/addon/install'
    );

    const id = await driver.execute(cmd, `installWebExt(${extension})`);
    const profileDir = await getCapability(driver, 'moz:profile')
    const prefs_file = path.resolve(profileDir, 'prefs.js')

    // need to wait for addon uuid to get added to prefs.js
    // process.stderr.write('Waiting for webextension UUID');
    return promiseRetry((retry, number) => {
        // process.stderr.write('.');
        return getUUID(prefs_file, id)
            .catch(retry)
            .then((uuid) => {
                // process.stderr.write('\n');
                return uuid;
            });
    }, {
        retries: 10,
        minTimeout: 10,
        maxTimeout: 200
    });
}

function pollOutput(resolve, reject) {
    driver.executeScript(
        'let txt = document.body.textContent; \
         document.body.textContent = ""; \
         return txt;'
    ).then((result) => {
        if (result) {
            process.stdout.write(result);
        }
        if (/^# tests/gm.test(result)) {
            // tests are complete
            resolve();
        } else {
            // poll again in 100ms
            setTimeout(() => pollOutput(resolve, reject), 100);
        }
    }).catch(reject);
}

module.exports = {
  pollOutput,
  installWebExt,
  getCapability,
  getBrowserName,
  getExtensionIdChrome,
  getExtensionIdFirefox 
}
