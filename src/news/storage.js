/**
 * @param {string} k
 * @param {any} v
 */
function set(k, v) {
  localStorage.setItem(k, JSON.stringify(v))
}

/**
 * @param {string} k
 * @returns {any}
 */
function get(k) {
  try {
    return JSON.parse(localStorage.getItem(k))
  } catch (e) {
    return null
  }
}

exports.set = set
exports.get = get
