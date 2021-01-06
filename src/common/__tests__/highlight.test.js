/* jshint ignore:start */
const highlight = require('../highlight')


describe.each([
  ['abcdefg', 'cde', 'ab<strong>cde</strong>fg'],
  ['abcdefg', 'ce', 'abcdefg'],
  ['abcdefg', '', 'abcdefg'],
])(`highlight(%s, %s)`, (a, b, expected) => {
  it(`should return ${expected}`, () => {
    expect(highlight(a, b)).toBe(expected)
  })
})
/* jshint ignore:end */
