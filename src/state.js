import { createStore } from 'redux';

/*
 * data store
 */

const initial = {
  fibSeq: [],
  tabs: {}
};

const store = createStore((state = initial, action) => {
    switch (action.type) {
    case 'CALC_NEXT':
        const val = calcNextVal(state.fibSeq);
        return setVal(state, val, action.id);
    case 'UNSET':
        delete state.tabs[action.id];
        return state;
    case 'RESET':
        state.fibSeq = [];
        state.tabs = {};
        return state;
    default:
        return state;
    }
});

/*
 * Save fib sequence value to the tabs map and fibSeq array.
 */
const setVal = (state, val, id) => {
    state.tabs[id] = val;
    state.fibSeq.push(val);
    return state;
};

/*
 * Initialize fib sequence on first two values, then calculate after that.
 */
const calcNextVal = (fibSeq) => {
    let next = 0;
    if (fibSeq.length === 0) {
      return 0;
    } else if (fibSeq.length === 1) {
        return 1;
    }
    fibSeq.slice(-2).map(val => next += val);
    return next;
};

const getVal = (id) => {
    return store.getState().tabs[id];
};

const nextVal = (id) => {
    store.dispatch({
        type: 'CALC_NEXT',
        id: id
    });
};

const unset = (id) => {
    store.dispatch({
        type: 'UNSET',
        id: id
    });
};

const reset = () => {
    store.dispatch({type: 'RESET'});
};

export default {
    getVal,
    nextVal,
    unset,
    reset
};
