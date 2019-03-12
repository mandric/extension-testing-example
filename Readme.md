
# extension-testing-example

Browser extension example using ES Modules and browser testing with Mocha,
Chai, Sinon and Parcel for bundling.  Specifically testing in the browser to
exercise the browser APIs available to extensions where possible.
webextension-polyfill is used to standardize the `browser` API.

Aiming for this to work in Chrome, Firefox and Safari.

# Getting Started

```
git clone [this repo]
cd extension-testing-example
npm install
npm start
```

This should get you started developing, it will create a `dist/` directory that
you can load into your browser as an extension if you turn on extensions
developer mode.

Parcel will also watch the source file and rebuild automatically.

Then you should be able to load the `dist/` directory into your browser and see
Fibonacci greatness.

See the this [Getting Started
Tutorial](https://developers.chrome.com/extensions/getstarted) for more
information about developing extensions.

# Builds

Production/minimized build:

```
npm run build # runs parcel build
```

There is currently only one build target but in the future only the debug/dev
build would include the tests so anyone can run them after installation.

# Tests

Click the tests button in the extension popup to run the tests in separate html
page.

You can also load the test runner using a web server rather than extension
protocol with `npm run server` and `http://127.0.0.1:8080/test/index.html`.

But you can't make any calls to `browser` unless you mock it because it's not
defined, so some tests will fail.

## Integration

Integration tests or e2e is yet to really be introduced, plan is to use
webdriverio.  I'm open to suggestions.

Build artifacts (zip file of dist/) are being saved on CirlceCI but you might
have to be logged into see them.  I will add them to the release page.

[![CircleCI](https://circleci.com/gh/mandric/extension-testing-example.svg?style=svg)](https://circleci.com/gh/mandric/extension-testing-example)
