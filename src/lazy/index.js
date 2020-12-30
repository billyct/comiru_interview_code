var LazyFunc = require('./lazy')

window.Lazy = function (el) {
  var Lazy = LazyFunc()
  return new Lazy(el)
}
