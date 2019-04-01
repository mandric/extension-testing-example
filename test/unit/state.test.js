import test from 'tape-catch';
import state from '../../src/state';

const populate = (length) => {
  for (let i = 0; i <= length; i++) {
      state.nextVal(i);
  }
};

test('activating a tab updates current_tab id', (t) => {
    state.reset();
    t.equal(state.getState().current_tab, null);
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    state.dispatch({type: 'TAB_UPDATED', id: 2});
    state.dispatch({type: 'TAB_ACTIVATED', id: 2});
    t.equal(state.getState().current_tab, 2);
    state.dispatch({type: 'TAB_ACTIVATED', id: 1});
    t.equal(state.getState().current_tab, 1);
    t.end();
});

test('updating a tab increments Fibonacci sequence', (t) => {
    state.reset();
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    t.equal(state.getState().tabs[1], 0);
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    t.equal(state.getState().tabs[1], 1);
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    t.equal(state.getState().tabs[1], 1);
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    t.equal(state.getState().tabs[1], 2);
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    t.equal(state.getState().tabs[1], 3);
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    t.equal(state.getState().tabs[1], 5);
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    t.equal(state.getState().tabs[1], 8);
    t.end();
});

test('Fibonacci sequence is continued across tabs', (t) => {
    state.reset();
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    state.dispatch({type: 'TAB_UPDATED', id: 1});
    t.equal(state.getState().tabs[1], 2);
    t.equal(state.getState().tabs[2], undefined);
    state.dispatch({type: 'TAB_UPDATED', id: 2});
    t.equal(state.getState().tabs[1], 2);
    t.equal(state.getState().tabs[2], 3);
    state.dispatch({type: 'TAB_UPDATED', id: 2});
    t.equal(state.getState().tabs[1], 2);
    t.equal(state.getState().tabs[2], 5);
    t.end();
});
