var utils = require('../common/utils')
var Component = require('./component')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin

function Item(text) {
  this.text = text
  this._init()
  this.on(events.onUnselected, this.remove.bind(this))
}

mixin(Item, Component, {
  node: null,
  /**
   * init the component
   */
  _init: function () {
    var itemNode = document.createElement('span')
    itemNode.className = classes.item

    var contentNode = document.createElement('span')
    contentNode.className = classes.itemContent
    contentNode.textContent = this.text

    var removeNode = document.createElement('span')
    removeNode.className = classes.itemRemove
    removeNode.textContent = '×'

    itemNode.appendChild(contentNode)
    itemNode.appendChild(removeNode)

    removeNode.addEventListener('click', this.triggerUnselected.bind(this))

    this.node = itemNode
  },

  /**
   * trigger unselected
   */
  triggerUnselected: function () {
    this.trigger(events.onUnselected, this.text)
  },

  /**
   * unselected
   */
  remove: function (e) {
    if (e.detail.value === this.text) {
      this.node.remove()
      this.off(events.onUnselected)
      this.node = null
    }
  },
})

module.exports = Item
