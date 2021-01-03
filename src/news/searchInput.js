var utils = require('../common/utils')
var acEvents = require('../autocomplete/events')
var AutoCompleteFunc = require('../autocomplete/autocomplete')
var events = require('./events')
var classes = require('./classes')

require('../autocomplete/autocomplete.css')

var mixin = utils.mixin

function SearchInputFunc(Component) {

  var opts = {}
  if (arguments.length > 1) {
    opts = arguments[1]
  }

  // use the same Component so that all the Components can listen to the same EventTarget
  var AutoComplete = AutoCompleteFunc(Component, {
    options: opts.options,
    single: true,
  })

  function SearchInput() {
    this.root = document.querySelector('#search-ipt')
    this.ac = new AutoComplete()
    this.root.appendChild(this.ac.root)

    this.on(acEvents.onShowMenu, this.handleShowMenu.bind(this))
    this.on(acEvents.onHideMenu, this.handleHideMenu.bind(this))
    this.on(acEvents.onChange, this.handleChange.bind(this))
    // @warning onPressEnter event may be will trigger onChange
    this.on(acEvents.onPressEnter, this.handleSearchInput.bind(this))
    this.on(events.onSearchInput, this.handleSearchInput.bind(this))
  }

  mixin(SearchInput, Component, {
    /**
     * handle the ac.onShowMenu event
     * fix the style of AutoComplete component
     */
    handleShowMenu: function () {
      this.ac.root.classList.add(classes.acContainerShowMenu)
    },

    /**
     * handle the ac.onHideMenu event
     * fix the style of AutoComplete component
     */
    handleHideMenu: function () {
      this.ac.root.classList.remove(classes.acContainerShowMenu)
    },

    /**
     * handle the ac.onChange event
     *
     * @param {CustomEvent} e
     */
    handleChange: function (e) {
      this.trigger(events.onSearch, e.detail.value)
    },

    /**
     * handle the search input event
     */
    handleSearchInput: function () {
      var node = this.ac.root.querySelector('input')
      this.trigger(events.onSearch, node.value)
    },
  })

  return SearchInput
}

module.exports = SearchInputFunc
