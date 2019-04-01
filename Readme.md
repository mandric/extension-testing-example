# extension-testing-example

Browser extension example using ES Modules and browser testing with Mocha,
Chai, Sinon and Webpack for bundling.  Specifically testing in the browser to
exercise the browser APIs available to extensions where possible.
[webextension-polyfill](https://github.com/mozilla/webextension-polyfill) is
used to standardize the `browser` API on Chrome.

Testing in Chrome and Firefox for now.

# Getting Started

```
git clone [this repo]
cd extension-testing-example
npm install
npm run build
```

This will generate an extension in `dist/development` which can be
loaded as a temporary extension. You must turn on extensions developer
mode in Chrome or use about:debugging and "Load Temporary Add-on" in
Firefox.

To generate a production build (without tests) run `npm run
build:prod`, the extension will be generated in `dist/production`.

See also [Chrome: Getting Started
Tutorial](https://developers.chrome.com/extensions/getstarted) and
[Mozilla: Your First Extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension) for information about developing and debugging extensions.

# Builds

Production/minimized build:

```
npm run build
```

There is currently only one build target but in the future only the debug/dev
build would include the tests so anyone can run them after installation.

# Tests

Click the tests button in the extension popup to run the tests in separate html
page (currently just shows TAP output, but can be updated to show HTML output).

To run the tests in headless Firefox via selenium (useful for CI):

```
npm run build
npm test
```

Unit tests can be run directly in Node:

```
npm run test:unit
```

## Integration

Integration tests or e2e is yet to really be introduced, plan is to use
webdriverio.  I'm open to suggestions.

Build artifacts (zip file of dist/) are being saved on CirlceCI but you might
have to be logged into see them.  I will add them to the release page.

[![CircleCI](https://circleci.com/gh/mandric/extension-testing-example.svg?style=svg)](https://circleci.com/gh/mandric/extension-testing-example)

## Related Projects

- https://github.com/Standard8/example-webextension
- https://github.com/pureooze/extension-testing-example
- https://github.com/lusakasa/saka-extension-boilerplate
- https://github.com/tinfoil/testable-chrome-extension-example
- https://alxgbsn.co.uk/2019/02/22/testing-native-es-modules-mocha-esm/
- https://github.com/vitalets/mocha-es6-modules
- https://github.com/vitalets/awesome-browser-extensions-and-apps
