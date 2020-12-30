var ComponentFunc = require('../common/component')
var AutoCompleteFunc = require('./autocomplete')

require('./autocomplete.css')

/**
 * @param {Element|string} el
 * @param {Object} opts
 * @constructor
 */
window.AutoComplete = function (el, opts) {
  var AC = AutoCompleteFunc(ComponentFunc())
  var ac =  new AC(opts)

  if (el instanceof Element) {
    el.appendChild(ac.root)
  } else if (typeof el === 'string') {
    document.querySelector(el).appendChild(ac.root)
  }

  return ac
}
