var utils = require('../common/utils')
var html = require('../common/html')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin
var createElement = html.createElement

function InputClearFunc(Component) {

  function InputClear() {
    this.root = createElement('button', classes.inputClear)

    this.root.addEventListener('click', this.handleClick.bind(this))
  }

  mixin(InputClear, Component, {
    /**
     *
     * @param {MouseEvent} e
     */
    handleClick: function (e) {
      e.stopPropagation()
      this.trigger(events.onInputClear)
    }
  })

  return InputClear
}

module.exports = InputClearFunc
