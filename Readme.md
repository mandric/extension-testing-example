[![CircleCI](https://circleci.com/gh/mandric/extension-testing-example.svg?style=svg)](https://circleci.com/gh/mandric/extension-testing-example)

# extension-testing-example

Browser extension example using Parcel, Mocha, Sinon-Chrome and Chrome API.

Hoping to make it work with Firefox then Safari next.

# Build

```
git clone [this repo]
cd extension-testing-example
npm install
npm run build # runs parcel build src/manifest.json
```

Then you should be able to load the `dist/` directory into your Chrome browser
as an extension and see Fibonacci greatness.

If you need unminified builds you can pass a flag to Parcel.

```
npx parcel build --no-minify --no-source-maps src/manifest.json
```

# Unit Tests

```
npm test # runs mocha
```

# Integration Tests

Planning to use Puppeteer here (Chrome only) to start out with.

