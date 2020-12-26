var utils = require('../common/utils')
var Component = require('./component')
var events = require('./events')
var classes = require('./classes')

var mixin = utils.mixin
var createElement = utils.createElement
var queryWithClassnameAndText = utils.queryWithClassnameAndText

function ItemFunc() {

  function Item() {
    var root = createElement('span', classes.itemContainer)
    root.addEventListener('click', this.handleClick.bind(this))

    this.root = root

    this.on(events.onUnselected, this.handleUnselected.bind(this))
    this.on(events.onSelected, this.handleSelected.bind(this))
  }

  mixin(Item, Component, {
    /**
     *
     * @param {ComponentEvent} e
     */
    handleSelected: function (e) {
      var item = createElement('span', classes.item)

      var content = createElement('span', classes.itemContent)
      content.textContent = e.detail.value

      var remove = createElement('span', classes.itemRemove)
      remove.textContent = '×'

      item.appendChild(content)
      item.appendChild(remove)

      this.root.appendChild(item)
    },

    /**
     *
     * @param {MouseEvent} e
     */
    handleClick: function (e) {
      var target = e.target
      // if it's the item remove button
      if (target.classList.contains(classes.itemRemove)) {
        this.trigger(events.onUnselected, target.textContent)
        target.parentNode.remove()
      }
    },

    /**
     * @param {ComponentEvent} e
     */
    handleUnselected: function (e) {
      var node = queryWithClassnameAndText(this.root, classes.itemContent, e.detail.value)

      if (node) {
        node.parentNode.remove()
      }
    }
  })

  return Item
}

module.exports = ItemFunc()
