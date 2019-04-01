const createStore = require('redux').createStore;

/*
 * data store
 */

const initial = {
    current_tab: null,
    fibSeq: [],
    tabs: {}
};

const store = createStore((state = initial, action) => {
    switch (action.type) {
    case 'TAB_ACTIVATED':
        state.current_tab = action.id;
        return state;
    case 'TAB_UPDATED':
        const val = calcNextVal(state.fibSeq);
        state.tabs[action.id] = val;
        state.fibSeq.push(val);
        return state;
    case 'TAB_REMOVED':
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

const reset = () => {
    store.dispatch({type: 'RESET'});
};

const getState = () => store.getState();
const dispatch = (action) => store.dispatch(action);
const subscribe = (handler) => {
    store.subscribe(() => handler(store.getState()));
};

module.exports = {
    reset: reset,
    subscribe: subscribe,
    dispatch: dispatch,
    getState: getState
};
