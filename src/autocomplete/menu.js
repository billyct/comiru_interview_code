var utils = require('../common/utils')
var Component = require('./component')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin

function Menu() {
  this._init()
  this.on(events.onRefreshMenu, this.empty.bind(this))
  this.on(events.onInput, this.handleInput.bind(this))
  this.on(events.onHideMenu, this.hide.bind(this))
  this.on(events.onShowMenu, this.show.bind(this))
}

mixin(Menu, Component, {
  node: null,

  /**
   * init the menu component
   */
  _init: function () {
    var node = document.createElement('div')
    node.className = classes.menu

    this.node = node
  },

  /**
   * empty the menu component inner
   */
  empty: function () {
    this.node.innerHTML = ''
  },

  /**
   * show the menu
   */
  show: function(){
    this.node.style.display = 'block'
  },

  /**
   * hide the menu
   */
  hide: function () {
    this.node.style.display = 'none'
  },

  /**
   * @param {ComponentEvent} e
   */
  handleInput: function (e) {
    if (e.detail && e.detail.value !== '') {
      this.show()
      return
    }

    this.hide()
  },

  /**
   * append menu item
   *
   * @param {Item} item
   */
  appendItem: function (item) {
    this.node.appendChild(item.node)
  },
})

module.exports = Menu
