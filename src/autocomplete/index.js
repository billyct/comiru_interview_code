var ComponentFunc = require('../common/component')
var html = require('../common/html')
var AutoCompleteFunc = require('./autocomplete')

require('./autocomplete.css')

var getElement = html.getElement

/**
 * @param {Element|string} el
 * @param {Object} opts
 * @constructor
 */
window.AutoComplete = function (el, opts) {
  var AC = AutoCompleteFunc(ComponentFunc())
  var ac =  new AC(opts)

  getElement(el).appendChild(ac.root)

  return ac
}
