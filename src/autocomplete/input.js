var utils = require('../common/utils')
var Component = require('./component')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin

function Input() {
  this._init()
  this.on(events.onFocus, this.focus.bind(this))
  // this.on(events.onSelected, this.handleSelected.bind(this))
}

mixin(Input, Component, {
  // input container node
  container: null,
  // the input node
  node: null,
  /**
   * init input component
   */
  _init: function () {
    var container = document.createElement('span')
    container.className = classes.inputContainer

    var node = document.createElement('input')
    node.className = classes.input

    container.appendChild(node)

    node.addEventListener('input', this.input.bind(this))
    node.addEventListener('keyup', this.handleKeyUp.bind(this))

    this.container = container
    this.node = node
  },

  /**
   * calculate the width of the text in the input component, and set to the container
   */
  _refreshWidth: function () {
    var div = document.createElement('div')
    div.textContent = this.node.value
    div.style.display = 'inline-block'

    this.container.appendChild(div)

    var width = div.offsetWidth

    div.remove()

    // fresh the input container's width
    this.container.style.width = width + 'px'
  },

  /**
   * empty the input
   */
  empty: function () {
    this.node.value = ''

    this.trigger(events.onInput, '')
  },

  /**
   * focus the input node
   */
  focus: function () {
    this.node.focus()

    if (this.node.value !== '') {
      this.trigger(events.onShowMenu)
    }
  },

  /**
   * handle input
   */
  input: function () {
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
        this.trigger(events.onSelectPrev)
        break
      case 'ArrowDown':
        this.trigger(events.onSelectNext)
        break
      case 'Enter':
        // @todo if selected item then input it to the input area if not then nothing
    }
  },
})

module.exports = Input
