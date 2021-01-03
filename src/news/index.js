var ComponentFunc = require('../common/component')
var NewsFunc = require('./news')

require('./news.css')

window.News = function (opts) {
  var N = NewsFunc(ComponentFunc(), opts)
  return new N()
}
