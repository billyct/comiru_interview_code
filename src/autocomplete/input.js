var utils = require('../common/utils')
var Component = require('./component')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin
var createElement = utils.createElement

function InputFunc() {
  function Input() {
    var root = createElement('span', classes.inputContainer)
    var node = createElement('input', classes.input)

    root.appendChild(node)

    node.addEventListener('input', this.handleInput.bind(this))
    node.addEventListener('keyup', this.handleKeyUp.bind(this))

    this.root = root
    this.node = node

    this.on(events.onFocus, this.handleFocus.bind(this))
    // this.on(events.onSelected, this.handleSelected.bind(this))
  }

  mixin(Input, Component, {

    /**
     * calculate the width of the text in the input component, and set to the container
     */
    _refreshWidth: function () {
      var div = document.createElement('div')
      div.textContent = this.node.value
      div.style.display = 'inline-block'

      this.root.appendChild(div)

      var width = div.offsetWidth

      div.remove()

      // fresh the input container's width
      this.root.style.width = width + 'px'
    },

    /**
     * focus the input node
     */
    handleFocus: function () {
      this.node.focus()

      if (this.node.value !== '') {
        this.trigger(events.onShowMenu)
      }
    },

    /**
     * handle input
     */
    handleInput: function () {
      this._refreshWidth()
      // trigger onInput event
      this.trigger(events.onInput, this.node.value)
    },

    /**
     * @param {KeyboardEvent} e
     */
    handleKeyUp: function (e) {
      switch (e.key) {
        case 'Escape':
          this.trigger(events.onHideMenu)
          break
        case 'ArrowUp':
          this.trigger(events.onHoverPrev)
          break
        case 'ArrowDown':
          this.trigger(events.onHoverNext)
          break
        case 'Enter':
        // @todo if selected item then input it to the input area if not then nothing
      }
    },
  })

  return Input
}

module.exports = InputFunc()
