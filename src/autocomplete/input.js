var utils = require('../common/utils')
var html = require('../common/html')
var Component = require('./component')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin
var createElement = html.createElement

function InputFunc() {
  function Input(opts) {
    this.opts = opts || {}

    var root = createElement('span', classes.inputContainer)
    var node = createElement('input', classes.input)
    // inspired by https://github.com/react-component/select/blob/master/src/Selector/MultipleSelector.tsx#L214
    var mirror = createElement('span', classes.inputMirror)

    root.appendChild(node)
    root.appendChild(mirror)

    node.addEventListener('input', this.handleInput.bind(this))
    node.addEventListener('keydown', this.handleKeyDown.bind(this))

    this.root = root
    this.node = node
    this.mirror = mirror

    this.on(events.onFocus, this.handleFocus.bind(this))
    this.on(events.onSelected, this.handleSelected.bind(this))
  }

  mixin(Input, Component, {

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
      // calculate the width of the text in the input component, and set to the container
      this.mirror.innerHTML = this.node.value + "&nbsp;"
      this.root.style.width = this.mirror.scrollWidth + 'px'
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

    /**
     * @param {ComponentEvent} e
     */
    handleSelected: function (e) {
      if (this.opts.single) {
        this.node.value = e.detail.value
        this.handleInput()
      }
    }
  })

  return Input
}

module.exports = InputFunc()
