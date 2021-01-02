/**
 * get a random element for an array
 *
 * @param {any[]} arr
 * @returns {any}
 */
global.randomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
