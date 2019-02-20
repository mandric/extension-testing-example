const chrome = require('sinon-chrome/extensions');
global.chrome = chrome;

const winbo = require('../src/background')(chrome),
      {describe, it} = require('mocha'),
      assert = require('assert');

describe('background worker', function () {
  it('can determine truth', () => {
    assert.equal(true, Boolean('truth'));
  });
});
