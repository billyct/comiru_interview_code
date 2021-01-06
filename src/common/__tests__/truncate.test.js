/* jshint ignore:start */
const truncate = require('../truncate')

describe.each([
  ['abcdefg', 2, 'ab...'],
  ['abcdefg', 3, 'abc...'],
  ['abcdefg', 10, 'abcdefg'],
  ['abcdefg', 7, 'abcdefg'],
])(`truncate(%s, %i)`,(a, b, expected) =>{
  it(`should return ${expected}`, () => {
    expect(truncate(a, b)).toBe(expected)
  })
})


