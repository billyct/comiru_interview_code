var utils = require('../common/utils')
var html = require('../common/html')
var Component = require('./component')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin
var createElement = html.createElement

function InputFunc() {
  function Input() {
    var root = createElement('span', classes.inputContainer)
    var node = createElement('input', classes.input)

    root.appendChild(node)

    node.addEventListener('input', this.handleInput.bind(this))
    node.addEventListener('keydown', this.handleKeyDown.bind(this))

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
    handleKeyDown: function (e) {
      switch (e.key) {
        case 'Backspace':
          if (this.node.value === '') {
            this.trigger(events.onPressBackspace)
          }
          break
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
          this.trigger(events.onPressEnter)
      }
    },
  })

  return Input
}

module.exports = InputFunc()
