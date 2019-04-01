import test from 'tape-catch';
import state from '../../src/state';

const populate = (length) => {
  for (let i = 0; i <= length; i++) {
      state.nextVal(i);
  }
};

test('add values to the fibonacci sequence and return them', (t) => {
    state.reset();
    state.nextVal(0); // 0
    t.equal(state.getVal(0), 0);
    state.nextVal(0); // 1
    t.equal(state.getVal(0), 1);
    state.nextVal(0); // 1
    t.equal(state.getVal(0), 1);
    state.nextVal(0); // 2
    t.equal(state.getVal(0), 2);
    state.nextVal(0); // 3
    t.equal(state.getVal(0), 3);
    state.nextVal(0); // 5
    t.equal(state.getVal(0), 5);
    state.nextVal(0); // 8
    t.equal(state.getVal(0), 8);
    t.end();
});

test('return saved value given an id', (t) => {
    state.reset();
    state.nextVal(1); // 0
    state.nextVal(2); // 1
    state.nextVal(3); // 1
    state.nextVal(4); // 2
    state.nextVal(5); // 3
    state.nextVal(6); // 5
    state.nextVal(7); // 8
    t.equal(state.getVal(1), 0);
    t.equal(state.getVal(2), 1);
    t.equal(state.getVal(3), 1);
    t.equal(state.getVal(4), 2);
    t.equal(state.getVal(5), 3);
    t.equal(state.getVal(6), 5);
    t.equal(state.getVal(7), 8);
    t.end();
});

test('can unset a given id', (t) => {
    state.reset();
    populate(10);
    t.equal(state.getVal(10), 55);
    state.unset(10);
    t.equal(typeof state.getVal(10), 'undefined');
    t.end();
});
