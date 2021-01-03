var utils = require('../common/utils')
var LazyFunc = require('../lazy/lazy')
var render = require('./render')
var events = require('./events')

var mixin = utils.mixin

function ListFunc(Component) {

  var Lazy = LazyFunc()

  function List() {
    this.root = document.querySelector('#news-list')
    this.template = document.querySelector('#template-news-item').innerHTML
    this.lazy = new Lazy()

    this.on(events.onRefreshList, this.handleRefreshList.bind(this))
    this.on(events.onAppendList, this.handleAppendList.bind(this))
  }

  mixin(List, Component, {

    /**
     * append data array to list
     *
     * @param {Object[]} data
     * @private
     */
    _appendList: function (data) {
      data.forEach(this._appendItem.bind(this))
    },

    /**
     * append data item to list
     *
     * @param {Object} data
     * @private
     */
    _appendItem: function (data) {
      var node = document.createElement('div')
      node.innerHTML = render(this.template, data)
      node = node.firstElementChild
      this.root.appendChild(node)
      // observe the images
      this.lazy.observe(node.querySelectorAll('img'))
    },

    /**
     * @param {CustomEvent} e
     */
    handleRefreshList: function (e) {
      // unobserve all the images
      if (this.lazy.observer) {
        this.lazy.observer.disconnect()
      }

      // delete the list content
      this.root.innerHTML = ''
      // append the data
      this._appendList(e.detail.value)
    },

    /**
     * @param {CustomEvent} e
     */
    handleAppendList: function (e) {
      this._appendList(e.detail.value)
    },
  })

  return List
}

module.exports = ListFunc
