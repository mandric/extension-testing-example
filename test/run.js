const Command = require("selenium-webdriver/lib/command").Command;
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

async function installWebExt(driver, extension) {
    const cmd = new Command('moz-install-web-ext')
              .setParameter('path', path.resolve(extension))
              .setParameter('temporary', true);

    const executor = driver.getExecutor();
    executor.defineCommand(
        cmd.getName(),
        'POST',
        '/session/:sessionId/moz/addon/install'
    );

    const id = await driver.execute(cmd, 'installWebExt(' + extension + ')');
    const caps = await driver.getCapabilities();
    const prefs_file = path.resolve(caps.get('moz:profile'), 'prefs.js');

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


//const options = new firefox.Options().headless(true);
//const options = new firefox.Options()
//const driver = new webdriver.Builder()
//         .forBrowser('firefox')
//        .setFirefoxOptions(options)
//       .build();

function pollOutput(resolve, reject) {
    driver.executeScript(
        'let el = document.getElementById("tap"); \
         let txt = el.textContent; \
         el.textContent = ""; \
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

installWebExt(driver, path.join(__dirname, '..', 'dist', 'development'))
    .then(async (uuid) => {
        // console.error(uuid);
        // console.error('Running test suite\n');
        const url = `moz-extension://${uuid}/test.html`;
        await driver.get(url);
        await new Promise(pollOutput);
        driver.quit()
    }).catch(err => {
        console.error(err);
        driver.quit()
    });
