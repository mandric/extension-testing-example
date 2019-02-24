const state = require('../src/state');

const {describe, it} = require('mocha'),
      assert = require('assert');

const populate = (length) => {
  for (let i = 0; i <= length; i++) {
    state.nextVal(i);
  }
};

describe('state lib', () => {

  beforeEach(() => {
    return state.reset();
  });

  it('add values to the fibonacci sequence and return them', () => {
    state.nextVal(0); // 0
    assert.equal(state.getVal(0), 0);
    state.nextVal(0); // 1
    assert.equal(state.getVal(0), 1);
    state.nextVal(0); // 1
    assert.equal(state.getVal(0), 1);
    state.nextVal(0); // 2
    assert.equal(state.getVal(0), 2);
    state.nextVal(0); // 3
    assert.equal(state.getVal(0), 3);
    state.nextVal(0); // 5
    assert.equal(state.getVal(0), 5);
    state.nextVal(0); // 8
    assert.equal(state.getVal(0), 8);
  });

  it('return saved value given an id', () => {
    state.nextVal(1); // 0
    state.nextVal(2); // 1
    state.nextVal(3); // 1
    state.nextVal(4); // 2
    state.nextVal(5); // 3
    state.nextVal(6); // 5
    state.nextVal(7); // 8
    assert.equal(state.getVal(1), 0);
    assert.equal(state.getVal(2), 1);
    assert.equal(state.getVal(3), 1);
    assert.equal(state.getVal(4), 2);
    assert.equal(state.getVal(5), 3);
    assert.equal(state.getVal(6), 5);
    assert.equal(state.getVal(7), 8);
  });

  it('can unset a given id', () => {
    populate(10);
    assert.equal(state.getVal(10), 55);
    state.unset(10);
    assert(typeof state.getVal(10) === 'undefined');
  });

});
