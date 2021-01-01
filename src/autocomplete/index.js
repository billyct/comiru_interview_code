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
var AutoComplete = function (el, opts) {
  var AC = AutoCompleteFunc(ComponentFunc(), opts)
  var ac =  new AC()

  getElement(el).appendChild(ac.root)

  return ac
}

window.AutoComplete = AutoComplete

module.exports = AutoComplete
