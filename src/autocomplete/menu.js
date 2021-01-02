var utils = require('../common/utils')
var html = require('../common/html')
var events = require('./events')
var classes = require('./classes')
var highlight = require('./highlight')

var mixin = utils.mixin
var createElement = html.createElement
var querySelector = html.querySelector

function MenuFunc(Component) {

  var opts = {}
  if (arguments.length > 1) {
    opts = arguments[1]
  }

  function Menu() {
    this.opts = opts

    var root = createElement('div', classes.menu)
    root.addEventListener('click', this.handleClick.bind(this))

    this.root = root

    this.on(events.onRefreshMenu, this.handleRefreshMenu.bind(this))
    this.on(events.onHideMenu, this.handleHide.bind(this))
    this.on(events.onShowMenu, this.handleShow.bind(this))
    this.on(events.onUnselected, this.handleUnselected.bind(this))
    this.on(events.onSelected, this.handleSelected.bind(this))
    this.on(events.onHoverNext, this.handleHoverNext.bind(this))
    this.on(events.onHoverPrev, this.handleHoverPrev.bind(this))
    this.on(events.onPressEnter, this.handlePressEnter.bind(this))
  }

  mixin(Menu, Component, {

    /**
     * ensure the node's position and make it visible with the scroll
     *
     * @param node
     * @private
     */
    _ensureVisible: function (node) {
      var nodeTop = node.offsetTop
      var nodeBottom = nodeTop + node.offsetHeight

      var rootScrollTop = this.root.scrollTop
      var rootHeight = this.root.clientHeight

      if (nodeTop < rootScrollTop) {
        this.root.scrollTop = nodeTop
      } else if (nodeBottom > rootScrollTop + rootHeight) {
        this.root.scrollTop = nodeBottom - rootHeight
      }
    },

    /**
     * remove the menuItemHover classname
     *
     * @private
     */
    _removeMenuItemHoverClassname: function () {
      var node = querySelector(this.root, {
        className: classes.menuItemHover,
      })

      if (node) {
        node.classList.remove(classes.menuItemHover)
      }
    },

    /**
     * handle press enter
     */
    handlePressEnter: function () {
      var node = querySelector(this.root, {
        className: classes.menuItemHover,
      })

      if (node) {
        // trigger handleClick function
        node.click()
      }
    },

    /**
     * handle onHoverPrev
     */
    handleHoverPrev: function () {

      var node = querySelector(this.root, {
        className: classes.menuItemHover,
      })

      if (node && this.root.firstElementChild !== node) {
        node.classList.remove(classes.menuItemHover)

        var nodePrev = node.previousElementSibling
        nodePrev.classList.add(classes.menuItemHover)
        this._ensureVisible(nodePrev)
      }
    },

    /**
     * handle onHoverNext
     */
    handleHoverNext: function () {
      var nodeNext

      var node = querySelector(this.root, {
        className: classes.menuItemHover,
      })

      if (node) {
        if (this.root.lastElementChild !== node) {
          node.classList.remove(classes.menuItemHover)
          nodeNext = node.nextElementSibling
        }
      } else {
        nodeNext = this.root.firstElementChild
      }

      if (nodeNext) {
        nodeNext.classList.add(classes.menuItemHover)
        this._ensureVisible(nodeNext)
      }
    },

    /**
     * unselect the menu item
     *
     * @param {ComponentEvent} e
     */
    handleUnselected: function (e) {
      var node = querySelector(this.root, {
        className: classes.menuItemSelected,
        textContent: e.detail.value,
      })

      if (node) {
        node.classList.remove(classes.menuItemSelected)
      }
    },

    /**
     * select the menu item
     *
     * @param {ComponentEvent} e
     */
    handleSelected: function (e) {
      if (this.opts.single) {
        this.trigger(events.onHideMenu)
        return
      }

      var node = querySelector(this.root, {
        className: classes.menuItem,
        textContent: e.detail.value,
      })

      if (node) {
        node.classList.add(classes.menuItemSelected)
      }
    },

    /**
     *
     * @param {MouseEvent} e
     */
    handleClick: function (e) {
      // prevent trigger onFocus event
      e.stopPropagation()

      var target = e.target
      var text = target.textContent
      // is menu item
      if (target.classList.contains(classes.menuItem)) {
        // if the menu item is selected,then unselect it
        if (target.classList.contains(classes.menuItemSelected)) {
          this.trigger(events.onUnselected, text)
        } else {
          // select the item
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
      var selectedOpts = data.selectedOpts || []
      var inputValue = data.inputValue || ''

      for (var i = 0; i < opts.length; i++) {
        var node = createElement('div', classes.menuItem)

        node.innerHTML = highlight(opts[i], inputValue)
        if (selectedOpts.indexOf(opts[i]) >= 0) {
          // @warning
          node.classList.add(classes.menuItemSelected)
        }

        this.root.appendChild(node)
      }

      if (this.root.innerHTML === '' || inputValue === '') {
        this.trigger(events.onHideMenu)
        return
      }

      this.trigger(events.onShowMenu)
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
      this._removeMenuItemHoverClassname()
    },
  })

  return Menu
}

module.exports = MenuFunc
