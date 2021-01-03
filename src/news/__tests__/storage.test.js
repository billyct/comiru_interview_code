/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')

const storage = require('../storage')

describe.each([
  [`[]`, []],
  [`["a"]`, ['a']],
  [``, null],
  ['null', null],
])('storage.get(%s)', (v, expected) => {
  it(`should return correct`, () => {
    const key = 'k'
    localStorage.setItem(key, v)

    expect(storage.get(key)).toEqual(expected)
    expect(localStorage.getItem).toBeCalled()
    expect(localStorage.getItem).toBeCalledWith(key)
  })
})

describe.each([
  [[], '[]'],
  [['a', 'b', 'c'], '["a","b","c"]'],
  [null, 'null'],
])('storage.set(k, %o)', (v, expected) => {
  it(`should set correct`, () => {
    const key = 'k'

    storage.set(key, v)

    expect(localStorage.setItem).toBeCalled()
    expect(localStorage.setItem).toBeCalledWith(key, expected)
    expect(localStorage.__STORE__[key]).toBe(expected)
  })
})

