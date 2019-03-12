
/*
 * data store
 */
const data = {
  fibSeq: [],
  tabs: {}
}

/*
 * Save fib sequence value to the tabs map and fibSeq array.
 */
const setVal = (val, id) => {
  data.tabs[id] = val
  data.fibSeq.push(val)
}

/*
 * Initialize fib sequence on first two values, then calculate after that.
 */
const calcNextVal = () => {
  let next = 0
  if (data.fibSeq.length === 0) {
    return 0
  } else if (data.fibSeq.length === 1) {
    return 1
  }
  data.fibSeq.slice(-2).map(val => next += val);
  return next
}

const getVal = (id) => {
  return data.tabs[id]
}

const nextVal = (id) => {
  const val = calcNextVal()
  setVal(val, id)
  return val
}

const unset = (id) => {
  delete data.tabs[id]
}

const reset = () => {
  data.fibSeq = []
  data.tabs = {}
}

export default {
  getVal,
  nextVal,
  unset,
  reset
}
