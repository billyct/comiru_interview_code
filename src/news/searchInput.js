var utils = require('../common/utils')
var acEvents = require('../autocomplete/events')
var AutoCompleteFunc = require('../autocomplete/autocomplete')
var events = require('./events')
var classes = require('./classes')
var storage = require('./storage')

require('../autocomplete/autocomplete.css')

var mixin = utils.mixin

function SearchInputFunc(Component) {

  var key = 'news.ac.options'

  // use the same Component so that all the Components can listen to the same EventTarget
  var AutoComplete = AutoCompleteFunc(Component, {
    options: storage.get(key) || [],
    single: true,
    onRemoveMenuItem: function () {
      // Silence is gold
    }
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
    this.on(acEvents.onRemoveMenuItem, this.handleRemoveMenuItem.bind(this))
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
      var inputValue = node.value
      this.trigger(events.onSearch, inputValue)

      // add node.inputValue to localstorage, and reset the ac.opts.options
      if (this.ac.opts.options.indexOf(inputValue) < 0) {
        this.ac.opts.options.push(inputValue)
      }

      storage.set(key, this.ac.opts.options.filter(function (v) {
        return v
      }))
    },

    /**
     * handle onRemoveMenuItem event
     *
     * @param {CustomEvent} e
     */
    handleRemoveMenuItem: function (e) {
      var value = e.detail.value
      // filter options
      this.ac.opts.options = this.ac.opts.options.filter(function (v) {
        return v !== value
      })

      // refresh the options in the localstorage
      storage.set(key, this.ac.opts.options)
    },
  })

  return SearchInput
}

module.exports = SearchInputFunc
