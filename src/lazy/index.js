var LazyFunc = require('./lazy')

window.Lazy = function () {
  var L = LazyFunc.apply(this, arguments)
  return new L()
}
