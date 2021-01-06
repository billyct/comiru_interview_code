/**
 * simple truncate the string with length provided
 *
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
function truncate(text, length) {
  if (text.length <= length) {
    return text
  }

  return text.slice(0, length) + '...'
}

module.exports = truncate
