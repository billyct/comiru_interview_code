var utils = require('../common/utils')
var Component = require('./component')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin

function MenuItem(text) {
  this.text = text

  if (arguments.length > 0 && typeof arguments[1] === 'boolean') {
    this.isSelected = arguments[1]
  }

  this._init()

  this.on(events.onUnselected, this.handleUnselected.bind(this))
  this.on(events.onSelected, this.handleSelected.bind(this))
}

mixin(MenuItem, Component, {
  node: null,

  // is selected
  isSelected: false,

  /**
   * init the component
   */
  _init: function () {
    var node = document.createElement('div')
    node.className = classes.menuItem
    node.textContent = this.text
    if (this.isSelected) {
      // @warning
      node.classList.add(classes.menuItemSelected)
    }

    node.addEventListener('click', this.toggle.bind(this))

    this.node = node
  },

  /**
   * toggle selected
   *
   * @param {MouseEvent} e
   */
  toggle: function (e) {
    e.stopPropagation()

    if (this.isSelected) {
      this.trigger(events.onUnselected, this.text)
      return
    }
    this.trigger(events.onSelected, this.text)
  },

  /**
   * as selected item
   */
  handleSelected: function (e) {
    if (e.detail.value === this.text) {
      this.isSelected = true
      this.node.classList.add(classes.menuItemSelected)
    }
  },

  /**
   * as unselected item
   */
  handleUnselected: function (e) {
    if (e.detail.value === this.text) {
      this.isSelected = false
      this.node.classList.remove(classes.menuItemSelected)
    }
  },
})

module.exports = MenuItem
