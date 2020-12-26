var utils = require('../common/utils')
var Component = require('./component')
var Item = require('./Item')
var Input = require('./input')
var Menu = require('./menu')
var events = require('./events')
var classes = require('./classes')

require('./autocomplete.css')

var mixin = utils.mixin
var createElement = utils.createElement

// 优化选择之后的处理
// 增加 input 的特殊按键选择
// 增加单选的处理

function AutoCompleteFunc() {
  function AutoComplete(opts) {
    this.opts = opts

    var root = createElement('div', classes.container)

    var input = new Input()
    var menu = new Menu()
    var item = new Item()

    root.appendChild(item.root)
    root.appendChild(input.root)
    root.appendChild(menu.root)

    // click the AutoComplete component then focus the input
    root.addEventListener('click', this.handleClick.bind(this))
    // click the area out of AutoComplete component
    document.addEventListener('click', this.handleDocumentClick.bind(this))

    this.root = root

    document.querySelector(this.opts.element).appendChild(this.root)

    // bind events
    this.on(events.onChange, this.opts.onChange.bind(this))
    this.on(events.onSelected, this.handleSelected.bind(this))
    this.on(events.onUnselected, this.handleUnselected.bind(this))
    this.on(events.onInput, this.handleInput.bind(this))
  }

  mixin(
    AutoComplete,
    Component,
    {
      // the value return
      value: [],

      /**
       * @param {MouseEvent} e
       */
      handleDocumentClick: function (e) {
        // if the area out of AutoComplete component
        if (e.target.contains(this.root)) {
          this.trigger(events.onHideMenu)
        }
      },

      /**
       * trigger [onFocus] event
       *
       * @param {MouseEvent} e
       */
      handleClick: function (e) {
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

        var opts = this.opts.options.filter(function (value) {
          return value.indexOf(v) >= 0
        })

        this.trigger(events.onRefreshMenu, {
          opts: opts,
          selected: this.value,
        })
      },

      /**
       * handle selected
       *
       * @param {ComponentEvent} e
       */
      handleSelected: function (e) {
        // refresh value
        this.value.push(e.detail.value)
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

  return AutoComplete
}

window.AutoComplete = AutoCompleteFunc()
