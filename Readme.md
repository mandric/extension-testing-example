[![CircleCI](https://circleci.com/gh/mandric/extension-testing-example.svg?style=svg)](https://circleci.com/gh/mandric/extension-testing-example)

# extension-testing-example

Browser extension example using ES Modules and browser testing with Mocha, Chai
and Sinon.  Specifically testing in the browser to exercise the browser APIs
available to extensions.

Test browser APIs directly where possible and mock with Sinon otherwise.
Sinon-chrome is available to mock chrome but ideally it would mock Firefox too.
webextension-polyfill is used to standardize the `browser` API but have not
tried mocking that yet.

Aiming for this to work in at least Chrome, Firefox and Safari.

# Build

```
git clone [this repo]
cd extension-testing-example
npm install
npm run build # runs parcel
```

Then you should be able to load the `dist/` directory into your browser as an
extension and see Fibonacci greatness.

# Run Tests

Click the tests button in the extension popup to run the tests in separate html
page.

You can also load the test runner using a web server rather than extension
protocol with `npm run server` and `http://127.0.0.1:8080/test.html`.

# Integration Tests

Integration tests or e2e yet to be introduced, plan is to use webdriverio.

