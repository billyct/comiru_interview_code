/**
 * simple highlight the text with the strong tag
 *
 * @param {string} a
 * @param {string} b
 */
function highlight(a, b) {
  if (!b) {
    return a
  }

  return a.replace(b, '<strong>' + b + '</strong>')
}

module.exports = highlight
