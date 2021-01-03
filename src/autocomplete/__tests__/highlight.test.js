/* jshint ignore:start */
const highlight = require('../highlight')

describe('test highlight function', () => {
  it('should return the text matched with <strong>', () => {
    const a = 'abcdefg'
    const b = 'cde'

    expect(highlight(a, b)).toBe('ab<strong>cde</strong>fg')
  })

  it('should return the origin text when mismatched', () => {
    const a = 'abcdefg'
    const b = 'ce'

    expect(highlight(a, b)).toBe('abcdefg')
  })

  it('should return the origin text when b is empty', () => {
    const a = 'abcdefg'
    const b = ''

    expect(highlight(a, b)).toBe('abcdefg')
  })
})
/* jshint ignore:end */
