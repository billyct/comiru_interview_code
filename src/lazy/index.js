var LazyFunc = require('./lazy')

var Lazy = function (el, opts) {
  var L = LazyFunc(opts)
  var l =  new L()
  // observe the elements here
  l.observe(el)

  return l
}

window.Lazy = Lazy

module.exports = Lazy
