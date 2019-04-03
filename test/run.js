'use strict';
const path = require('path')
const driver = require('./driver')
const { pollOutput, installWebExt } = require('./helpers')

// todo: should be able to simplify with async await
installWebExt(driver, path.join(__dirname, '..', 'dist', 'development'))
  .then(async uuid => {
    // console.error(uuid);
    // console.error('Running test suite\n');
    const url = `moz-extension://${uuid}/test.html`;
    await driver.get(url);
    await new Promise(pollOutput);
    driver.quit()
  }).catch(err => {
    console.error(err);
    driver.quit()
    //process.exit(1);
  });
