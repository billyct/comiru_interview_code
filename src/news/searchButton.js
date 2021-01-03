var utils = require('../common/utils')
var acEvents = require('../autocomplete/events')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin

function SearchButtonFunc(Component) {

  function SearchButton() {
    this.root = document.querySelector('#search-btn')

    this.root.addEventListener('click', this.handleClick.bind(this))

    this.on(acEvents.onShowMenu, this.handleShowMenu.bind(this))
    this.on(acEvents.onHideMenu, this.handleHideMenu.bind(this))
  }

  mixin(SearchButton, Component, {

    /**
     * handle the search btn clicked
     */
    handleClick: function () {
      this.trigger(events.onSearchInput)
    },

    /**
     * handle the ac.onShowMenu event
     * fix the style of search button component
     */
    handleShowMenu: function () {
      this.root.classList.add(classes.newsSearchButtonShowMenu)
    },

    /**
     * handle the ac.onHideMenu event
     * fix the style of search button component
     */
    handleHideMenu: function () {
      this.root.classList.remove(classes.newsSearchButtonShowMenu)
    },
  })

  return SearchButton
}

module.exports = SearchButtonFunc
