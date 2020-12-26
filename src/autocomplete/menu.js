var utils = require('../common/utils')
var Component = require('./component')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin
var createElement = utils.createElement
var queryWithClassnameAndText = utils.queryWithClassnameAndText

function MenuFunc() {

  function Menu() {
    var root = createElement('div', classes.menu)
    root.addEventListener('click', this.handleClick.bind(this))

    this.root = root

    this.on(events.onRefreshMenu, this.handleRefreshMenu.bind(this))
    this.on(events.onInput, this.handleInput.bind(this))
    this.on(events.onHideMenu, this.handleHide.bind(this))
    this.on(events.onShowMenu, this.handleShow.bind(this))
    this.on(events.onUnselected, this.handleUnselected.bind(this))
  }

  mixin(Menu, Component, {
    /**
     *
     * @param {ComponentEvent} e
     */
    handleUnselected: function (e) {
      var node = queryWithClassnameAndText(this.root, classes.menuItemSelected, e.detail.value)

      if (node) {
        node.classList.remove(classes.menuItemSelected)
      }
    },

    /**
     *
     * @param {MouseEvent} e
     */
    handleClick: function (e) {
      var target = e.target
      var text = target.textContent
      // is menu item
      if (target.classList.contains(classes.menuItem)) {
        // if the menu item is selected,then unselect it
        if (target.classList.contains(classes.menuItemSelected)) {
          target.classList.remove(classes.menuItemSelected)
          this.trigger(events.onUnselected, text)
        } else {
          // select the item
          target.classList.add(classes.menuItemSelected)
          this.trigger(events.onSelected, text)
        }
      }
    },

    /**
     * @param {ComponentEvent} e
     */
    handleRefreshMenu: function (e) {
      // empty items
      this.root.innerHTML = ''

      var data = e.detail.value

      var opts = data.opts
      var selected = data.selected

      for (var i = 0; i < opts.length; i++) {
        var node = createElement('div', classes.menuItem)
        node.textContent = opts[i]
        if (selected.indexOf(opts[i]) >= 0) {
          // @warning
          node.classList.add(classes.menuItemSelected)
        }

        this.root.appendChild(node)
      }
    },

    /**
     * show the menu
     */
    handleShow: function () {
      this.root.style.display = 'block'
    },

    /**
     * hide the menu
     */
    handleHide: function () {
      this.root.style.display = 'none'
    },

    /**
     * @param {ComponentEvent} e
     */
    handleInput: function (e) {
      if (e.detail && e.detail.value !== '') {
        this.trigger(events.onShowMenu)
        return
      }

      this.trigger(events.onHideMenu)
    },
  })


  return Menu
}

module.exports = MenuFunc()
