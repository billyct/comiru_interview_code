var utils = require('../common/utils')
var html = require('../common/html')
var ComponentFunc = require('../common/component')
var ItemFunc = require('./Item')
var InputFunc = require('./input')
var MenuFunc = require('./menu')
var events = require('./events')
var classes = require('./classes')

require('./autocomplete.css')

var mixin = utils.mixin
var createElement = html.createElement

function AutoCompleteFunc(Component) {

  var Input = InputFunc(Component)
  var Menu = MenuFunc(Component)
  var Item = ItemFunc(Component)

  function AutoComplete(opts) {

    this.opts = opts

    var root = createElement('div', classes.container)

    var input = new Input(opts)
    var menu = new Menu(opts)

    root.appendChild(input.root)
    root.appendChild(menu.root)

    // click the AutoComplete component then focus the input
    root.addEventListener('click', this.handleClick.bind(this))
    // click the area out of AutoComplete component
    document.addEventListener('click', this.handleDocumentClick.bind(this))

    this.root = root

    if (this.opts.single) {
      this.value = ''
    } else {
      this.value = []
      root.prepend(new Item().root)
    }

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
      /**
       * @param {MouseEvent} e
       */
      handleDocumentClick: function (e) {
        // if the area out of AutoComplete component
        if (e.target.closest(classes.container) === null) {
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

        if (this.opts.single) {
          this.trigger(events.onRefreshMenu, {
            opts: opts,
            inputValue: e.detail.value,
          })

          return
        }

        this.trigger(events.onRefreshMenu, {
          opts: opts,
          selectedOpts: this.value,
          inputValue: e.detail.value,
        })
      },

      /**
       * handle selected
       *
       * @param {ComponentEvent} e
       */
      handleSelected: function (e) {
        // refresh value
        if (this.opts.single) {
          this.value = e.detail.value
        } else {
          this.value.push(e.detail.value)
        }

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

window.AutoComplete = function (opts) {
  var AC = AutoCompleteFunc(ComponentFunc())
  return new AC(opts)
}
