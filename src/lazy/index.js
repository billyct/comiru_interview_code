var LazyFunc = require('./lazy')

var Lazy = function () {
  var L = LazyFunc.apply(this, arguments)
  return new L()
}

window.Lazy = Lazy

module.exports = Lazy
