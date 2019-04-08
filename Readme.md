
# extension-testing-example

Browser extension example attempting to provide a decent boilerplate for
building web extensions with latest web development tools and practices.
Including: ES Modules, testing with Mocha, Sinon and Selenium for e2e, and
Webpack for bundling.  Also testing in the browser to exercise the browser APIs
available to extensions where possible.

`webextension-polyfill` is also used to standardize the `browser` API.

Goal is to have a decent code base that can target Chrome, Firefox and Safari.

# Getting Started

```
git clone [this repo]
cd extension-testing-example
npm install
npm start
```

This should get you started developing, it will create a `dist/development`
directory that you can load into your browser as an extension if you turn on
extensions developer mode.

Webpack will also watch the source files and rebuild automatically.

Then you should be able to load the `dist` directory into your browser and see
Fibonacci greatness.

See also [Chrome: Getting Started
Tutorial](https://developers.chrome.com/extensions/getstarted) and 
[Mozilla: Your First Extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension) for information about developing extensions.

# Builds

Development builds include sourcemaps and tests:

```
npm run build # dist/development
```

Production/minimized build:

```
npm run build:prod # dist/production
```

# Tests

```
npm test
```

You can also click the tests button in the extension popup to run the tests in
a separate html page.

E2E tests:

```
npm run test:e2e
```

See `package.json` scripts property for more options.

# Continuous Integration

Build artifacts (zip file of dist/) are being saved on CirlceCI but you might
have to be logged in to see them.

[![CircleCI](https://circleci.com/gh/mandric/extension-testing-example.svg?style=svg)](https://circleci.com/gh/mandric/extension-testing-example)

## Related Projects

- https://github.com/Standard8/example-webextension
- https://github.com/pureooze/extension-testing-example
- https://github.com/lusakasa/saka-extension-boilerplate
- https://github.com/tinfoil/testable-chrome-extension-example
- https://alxgbsn.co.uk/2019/02/22/testing-native-es-modules-mocha-esm/
- https://github.com/vitalets/mocha-es6-modules
- https://github.com/vitalets/awesome-browser-extensions-and-apps
