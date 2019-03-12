console.log('testing state lib')
import chai from './chai.js'
import state from '../state.js'

const expect = chai.expect

const populate = (length) => {
  for (let i = 0; i <= length; i++) {
    state.nextVal(i)
  }
}

describe('state lib', () => {

  beforeEach(() => {
    return state.reset()
  })

  it('add values to the fibonacci sequence and return them', () => {
    state.nextVal(0) // 0
    expect(state.getVal(0)).to.equal(0)
    state.nextVal(0) // 1
    expect(state.getVal(0)).to.equal(1)
    state.nextVal(0) // 1
    expect(state.getVal(0)).to.equal(1)
    state.nextVal(0) // 2
    expect(state.getVal(0)).to.equal(2)
    state.nextVal(0) // 3
    expect(state.getVal(0)).to.equal(3)
    state.nextVal(0) // 5
    expect(state.getVal(0)).to.equal(5)
    state.nextVal(0) // 8
    expect(state.getVal(0)).to.equal(8)
  })

  it('return saved value given an id', () => {
    state.nextVal(1) // 0
    state.nextVal(2) // 1
    state.nextVal(3) // 1
    state.nextVal(4) // 2
    state.nextVal(5) // 3
    state.nextVal(6) // 5
    state.nextVal(7) // 8
    expect(state.getVal(1)).to.equal(0)
    expect(state.getVal(2)).to.equal(1)
    expect(state.getVal(3)).to.equal(1)
    expect(state.getVal(4)).to.equal(2)
    expect(state.getVal(5)).to.equal(3)
    expect(state.getVal(6)).to.equal(5)
    expect(state.getVal(7)).to.equal(8)
  })

  it('can unset a given id', () => {
    populate(10)
    expect(state.getVal(10)).to.equal(55)
    state.unset(10)
    expect(typeof state.getVal(10)).to.equal('undefined')
  })

})
