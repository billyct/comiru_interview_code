var utils = require('../common/utils')
var Component = require('./component')
var Item = require('./item')
var MenuItem = require('./menuItem')
var Input = require('./input')
var Menu = require('./menu')
var events = require('./events')
var classes = require('./classes')

require('./autocomplete.css')

var mixin = utils.mixin

// 优化选择之后的处理
// 增加 input 的特殊按键选择
// 增加单选的处理

function AutoComplete(opts) {
  this.opts = opts

  // bind event onChange
  this.on(events.onChange, this.opts.onChange.bind(this))
  this.on(events.onSelected, this.handleSelected.bind(this))
  this.on(events.onUnselected, this.handleUnselected.bind(this))
  this.on(events.onInput, this.handleInput.bind(this))

  this._init()

  document.querySelector(this.opts.element).appendChild(this.node)

  if (this.opts.valueDefault) {
    this.value = this.opts.valueDefault

    for (var i = 0; i < this.value.length; i++) {
      this._createItem(this.value[i])
    }
  }
}

mixin(
  AutoComplete,
  Component,
  {
    // the value return
    value: [],
    node: null,
    input: null,
    menu: null,

    _init: function () {
      var node = document.createElement('div')
      node.className = classes.container

      var input = new Input()
      var menu = new Menu()

      node.appendChild(input.container)
      node.appendChild(menu.node)

      // click the AutoComplete component then focus the input
      node.addEventListener('click', this.triggerFocus.bind(this))
      // click the area out of AutoComplete component
      document.addEventListener('click', this.handleDocumentClick.bind(this))

      this.node = node
      this.input = input
      this.menu = menu
    },

    _createItem: function (text) {
      var item = new Item(text)
      this.node.insertBefore(
        item.node,
        this.input.container
      )
    },

    /**
     * @param {MouseEvent} e
     */
    handleDocumentClick: function(e) {
      // if the area out of AutoComplete component
      if (e.target.contains(this.node)) {
        this.trigger(events.onHideMenu)
      }
    },

    /**
     * trigger [onFocus] event
     *
     * @param {MouseEvent} e
     */
    triggerFocus: function (e) {
      e.stopPropagation()
      this.trigger(events.onFocus)
    },

    /**
     *
     * @param {ComponentEvent} e
     */
    handleInput: function (e) {
      var v = e.detail.value

      if (v === '') {
        return
      }

      this.trigger(events.onRefreshMenu)

      var opts = this.opts.options.filter(function (value) {
        return value.indexOf(v) >= 0
      })

      for (var i = 0; i < opts.length; i++) {
        var text = opts[i]
        var item = new MenuItem(text, this.value.indexOf(text) >= 0)
        this.menu.appendItem(item)
      }
    },

    /**
     * handle selected
     *
     * @param {ComponentEvent} e
     */
    handleSelected: function (e) {
      var text = e.detail.value

      this._createItem(text)
      // refresh value
      this.value.push(text)
      this.trigger(events.onChange, this.value)
    },

    /**
     * handle unselected
     *
     * @param {ComponentEvent} e
     */
    handleUnselected: function (e) {
      this.value = this.value.filter(function (value) {
        return value !== e.detail.value
      })

      this.trigger(events.onChange, this.value)
    },
  })

window.AutoComplete = AutoComplete

module.exports = AutoComplete
